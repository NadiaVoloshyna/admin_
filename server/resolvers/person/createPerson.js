const googleApi = require('../../services/google');
const { handleError } = require('../../helpers/resolvers');

/**
 * Create person
 * 1. Find person in DB
 * 2. If person exists, exit
 * 3. If person not exists create google document for the person
 * 4. Create person
 * 5. If document creation failed continue creating person
 * 6. If document was created add document id to persons data
 */

const createPerson = async (_source, args, { dataSources }) => {
  const { input } = args;
  
  let person, documentId, newPerson;

  // Check if person exists
  try {
    person = await dataSources.Person.findOne({ name: input.name });

    if (person) {
      throw {
        code: 409,
        errmsg: `E11000 duplicate key error collection: ukrainian.person index: name_1 dup key: { : "${input.name}" }`,
        additionalProperties: {
          duplicateId: person._id,
          duplicateName: person.name
        }
      };
    }
  } catch (error) {
    handleError(error);
  }

  // Create google document for current person
  try {
    const { data } = await googleApi.createDocument(input.name);
    
    if (data.id) {
      documentId = data.id;
    };
  } catch (error) {
    handleError(error);
  }

  // Create person
  try {
    newPerson = await new dataSources.Person({
      ...input,
      biography: {
        documentId
      }
    }).save();
  } catch (error) {
    handleError(error);
  }

  return newPerson;
};

module.exports = createPerson;