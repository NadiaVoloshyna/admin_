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
    sort = 'ascending',
    limit = 10,
  } = args;

  const query = searchTerm ? { name: {
    $regex: searchTerm,
    $options: 'i'
  } } : {};

  const options = {
    sort: {
      name: sort
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
