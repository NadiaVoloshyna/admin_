const { ApolloError } = require('apollo-server');

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
    limit = 10
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

const handleError = (error) => {
  console.error(error);
  const message = error.errmsg || 'Internal error happened';
  const code = error.code || 500;
  const additionalProperties = error.additionalProperties || null;

  throw new ApolloError(message, code, additionalProperties);
};

module.exports = {
  createQueryForPagination,
  handleError
};
