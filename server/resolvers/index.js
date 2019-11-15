const  { GraphQLDateTime } = require('graphql-iso-date');
const { getPerson, createPerson, updatePerson } = require('./person/index');
const { getPersons, deletePersons } = require('./persons');
const { getProfessions, createProfession } = require('./professions');

const resolvers = {
    DateTime: GraphQLDateTime,

    Query: {
      person: getPerson,
      persons: getPersons,
      professions: getProfessions
    },

    Mutation: {
      createPerson,
      updatePerson,
      deletePersons,
      createProfession
    }
};

module.exports = (logger) => {
  return resolvers;
}