const { ApolloError } = require('apollo-server');

const createQueryForPagination = (args) => {
  const { offset, searchTerm, sort } = args;
  const limit = 10;

  const query = searchTerm ? { name: {
    $regex: searchTerm, 
    $options: "i"
  }} : {};

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
    }
  }

  return {
    query,
    options
  }
}

const handleError = (error) => {
  console.error(error)
  const message = error.errmsg || 'Internal error happened';
  const code = error.code || 500;
  const additionalProperties = error.additionalProperties || null;
  
  throw new ApolloError(message, code, additionalProperties);
}

module.exports = {
  createQueryForPagination,
  handleError
}