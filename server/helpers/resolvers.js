const _sub = require('date-fns/sub');
const _formatISO = require('date-fns/formatISO');

const optionsGenerators = {
  limit: ({ limit }) => ({ limit: parseInt(limit) }),
  offset: ({ offset, limit }) => ({ offset: offset * limit }),
  sort: ({ sort }) => {
    const [sortBy, value] = sort.split(',');
    return {
      sort: {
        [sortBy]: value,
      },
    };
  },
};

const queryGenerators = {
  q: ({ q, searchBy }) => {
    if (!q) return {};

    const getFieldQuery = (field) => ({
      [field]: {
        $regex: q,
        $options: 'i',
      },
    });

    return searchBy.reduce((queries, field) => {
      const query = getFieldQuery(field);

      if (searchBy.length === 1) return query;

      if (!queries.$or) {
        queries.$or = [];
      }

      queries.$or.push(query);

      return queries;
    }, {});
  },
  role: ({ role }) => {
    const values = role.split(',');

    return {
      role: {
        $ne: 'super', // find all but when role is super
        $in: values,
      },
    };
  },
  type: ({ type }) => {
    const values = type.split(',');

    return {
      type: {
        $in: values,
      },
    };
  },
  files: ({ files, user }) => {
    if (files === 'my') {
      return { createdBy: user._id };
    }

    if (files === 'recent') {
      return {
        created: {
          // 24 hours / 1 day prior to today
          $gte : _formatISO(_sub(new Date(), { days: 1 })),
        },
      };
    }
  },
  active: ({ active }) => ({ active }),
  path: ({ path }) => ({ parent: path || { $exists: false } }),
  createdBy: ({ user }) => ({ createdBy: user._id }),
};

function construct(generators, query, searchBy) {
  return Object.entries(generators).reduce((acc, [key, generator]) => ({
    ...acc,
    ...(typeof query[key] !== 'undefined' && generator(query, searchBy)),
  }), {});
}

const createQueryForPagination = ({ query, user, searchBy = ['name'] }) => {
  // No queries -> return all records
  if (!query || !Object.keys(query).length) {
    return {
      query: {},
      options: {
        pagination: false,
      },
    };
  }

  const defaultQuery = {
    offset: 0,
    limit: 10,
    sort: 'created,asc',
    searchBy,
    ...query,
    user,
  };

  return {
    query: construct(queryGenerators, defaultQuery),
    options: construct(optionsGenerators, defaultQuery),
  };
};

const createSortVarints = (...fields) => {
  return fields.reduce((acc, curr) => {
    acc.push(`${curr},asc`, `${curr},desc`);
    return acc;
  }, []);
};

module.exports = {
  createQueryForPagination,
  createSortVarints,
};
