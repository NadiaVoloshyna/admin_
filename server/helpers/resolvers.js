function createQuery(searchTerm, fields) {
  if (!searchTerm) {
    return {};
  }

  const getFieldQuery = (field) => ({
    [field]: {
      $regex: searchTerm,
      $options: 'i'
    }
  });

  const queries = fields && { $or: fields.map((field) => getFieldQuery(field)) };

  return queries || getFieldQuery('name');
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
    fields,
    sort = 'ascending',
    limit = 10
  } = args;
  const query = createQuery(searchTerm, fields);

  const sortField = fields ? fields[0] : 'name';

  const options = {
    sort: {
      [sortField]: sort
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
