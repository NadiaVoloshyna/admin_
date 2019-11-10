const { ApolloError } = require('apollo-server');
const  { GraphQLDateTime } = require('graphql-iso-date');
const { GraphQLUpload } = require('graphql-upload');
const createQueryForPagination = require('../helpers/resolvers');

const resolvers = {
    DateTime: GraphQLDateTime,
    Upload: GraphQLUpload,

    Query: {
      person: async (_source, { _id }, { dataSources }) => {
        if (!_id) return 404;

        if (_id === 'new') return null;

        return await dataSources.Person.findOne({ _id });
      },

      persons: async (_source, args, { dataSources }) => {
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
          console.log(error);
        }
      },

      professions: async (_source, args, { dataSources }) => {
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
          console.log(error);
        }
      }
    },

    Mutation: {
      createPerson: async (_source, args, { dataSources }) => {
        try {
          const { input } = args;
          const person = await dataSources.Person.findOne({ name: input.name });
          
          if (!person) {
            return await new dataSources.Person(input).save();
          } else {
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
          const message = error.errmsg || 'Internal error happened';
          const code = error.code || 500;
          const additionalProperties = error.additionalProperties || null;
          
          throw new ApolloError(message, code, additionalProperties);
        }
      },

      updatePerson: async (_source, args, { dataSources }) => {
        const { _id, name } = args;

        return await dataSources.Person.findOneAndUpdate(
          { _id },
          { $set: { name } },
          { new: true }
        );
      },

      deletePersons: async (_source, args, { dataSources }) => {
        const _ids = args.ids.split(',');
        try {
          await dataSources.Person.deleteMany({ 
            _id: _ids
          });
          return 'success';
        } catch (error) {
          console.error(error);
          return 'failure';
        }
      },

      createProfession: async (_source, args, { dataSources }) => {
        return await new dataSources.Profession({name: args.name}).save();
      }
    }
};

module.exports = resolvers;