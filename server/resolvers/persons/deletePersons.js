const googleApi = require('../../services/google');
const { handleError } = require('../../helpers/resolvers');

/**
 * Delete one or multiple persons
 * 1. Try to delete google docs asocciated with persons
 * 2. If above is success delete persons
 * 3. If google docs deletion fails do not delete persons
 */

const deletePersons = async (_source, args, { dataSources }) => {
  const _ids = args.ids;
  const documentIds = args.documentIds;

  try {
    googleApi.deleteDocuments(documentIds, (error) => {
      if (error) throw Error(error)
    });
  } catch (error) {
    handleError(error);
    // TODO: send back info about an error
    return 'failure';
  }

  try {
    await dataSources.Person.deleteMany({ 
      _id: _ids
    });
    return 'success';
  } catch (error) {
    handleError(error);
    return 'failure';
  }
}

module.exports = deletePersons;