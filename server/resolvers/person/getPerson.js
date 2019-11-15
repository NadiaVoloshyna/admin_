const { handleError } = require('../../helpers/resolvers');
const cheerio = require('cheerio')
const googleApi = require('../../services/google');

const getPerson = async (_source, { _id }, { dataSources }) => {
  let person, documentBody = null;

  if (!_id) return 404;

  if (_id === 'new') return null;

  // Get person from database
  try {
    const document = await dataSources.Person.findOne({ _id });
    person = document.toJSON();
  } catch (error) {
    handleError(error);
  }

  // Get Google Doc by id
  // strip head/body from returned html
  try {
    const response = await googleApi.getDocumentContent(person.biography.documentId);

    if (response && response.data) {
      const $ = cheerio.load(response.data);
      const bodyHtml = $('body').html();

      documentBody = bodyHtml;
    }
  } catch (error) {
    handleError(error);
  }
  
  return {
    ...person,
    biography: {
      ...person.biography,
      documentBody
    }
  };
}

module.exports = getPerson;