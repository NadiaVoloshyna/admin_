const { createQueryForPagination, handleError } = require('../../helpers/resolvers');

const getPersons = async (_source, args, { dataSources }) => {
  try {
    const { query, options } = createQueryForPagination({ ...args, limit: 10});
    const persons = await dataSources.Person.paginate(query, options);

    return {
      persons: persons.docs,
      pagination: {
        total: persons.total,
        limit: persons.limit,
        offset: persons.offset
      }
    }
  } catch (error) {
    handleError(error);
  }
}

module.exports = getPersons;