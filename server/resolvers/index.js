const  { GraphQLDateTime } = require('graphql-iso-date');
const { getProfessions, createProfession } = require('./professions');

const resolvers = {
    DateTime: GraphQLDateTime,

    Query: {
      professions: getProfessions
    },

    Mutation: {
      createProfession
    }
};

module.exports = (logger) => {
  return resolvers;
}