function createQuery(searchTerm, fields) {
  if (!searchTerm) return {};

  const getFieldQuery = (field) => ({
    [field]: {
      $regex: searchTerm,
      $options: 'i'
    }
  });

  return fields.reduce((queries, field) => {
    const query = getFieldQuery(field);

    if (fields.length === 1) return query;

    if (!queries.$or) {
      queries.$or = [];
    }

    queries.$or.push(query);

    return queries;
  }, {});
}

const createQueryForPagination = (args) => {
  // No queries -> return all records
  if (!args || !Object.keys(args).length) {
    return {
      query: {},
      options: {
        pagination: false
      }
    };
  }

  const {
    offset = 0,
    searchTerm = '',
    fields = ['name'],
    sort = 'ascending',
    sortBy = 'name',
    limit = 10
  } = args;
  const query = createQuery(searchTerm, fields);

  const options = {
    sort: {
      [sortBy]: sort
    },
    offset: offset * limit,
    limit
  };

  if (sort === 'newest' || sort === 'older') {
    options.sort = {
      created: sort === 'newest' ? 1 : -1
    };
  }

  return {
    query,
    options
  };
};

module.exports = {
  createQueryForPagination
};
