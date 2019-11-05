const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server');
const  {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} = require('graphql-iso-date');

const resolvers = {
    GraphQLDateTime,
    Query: {
      person: async (_source, { _id }, { dataSources }) => {
        console.log(_id);
        if (!_id) return 404;

        if (_id === 'new') return null;

        return await dataSources.Person.findOne({ _id });
      },

      persons: async (_source, args, { dataSources }) => {
        return await dataSources.Person.find({});
      },
    },

    Mutation: {
      createPerson: async (_source, args, { dataSources }) => {
        try {
          const { input } = args;
          return await new dataSources.Person(input).save();
        } catch (error) {
          throw new ApolloError(error.errmsg, 409);
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

      uploadFile: async (_source, { file }) => {
        const { filename, createReadStream } = await file;

        const savedFile = await new Promise((resolve, reject) => {
          mongoose.connection.db.collection('fs.files', (err, collection) => {
            collection.findOne({ filename }, (error, file) => {
              if (error) throw error;
              if (!file) {
                const stream = createReadStream();

                stream
                  .pipe(mongoose.gridfs.createWriteStream(filename))
                  .on('error', reject)
                  .on('close', resolve);
              } else {
                resolve(file);
              }
            })
          });
        });

        return savedFile._id;
      }
    }
};

module.exports = resolvers;