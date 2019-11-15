const { createQueryForPagination, handleError } = require('../../helpers/resolvers');

const getProfessions = async (_source, args, { dataSources }) => {
  try {
    const { query, options } = createQueryForPagination({ ...args, limit: 10});
    const professions = await dataSources.Profession.paginate(query, options);

    return {
      professions: professions.docs,
      pagination: {
        total: professions.total,
        limit: professions.limit,
        offset: professions.offset
      }
    }
  } catch (error) {
    handleError(error);
  }
}

module.exports = getProfessions;