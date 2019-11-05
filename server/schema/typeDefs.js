const { gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  scalar GraphQLDateTime

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Portraits {
    primary: String,
    secondary: [String]
  }

  type Person {
    _id: String,
    name: String!,
    biography: String,
    created: GraphQLDateTime,
    portraits: Portraits
  }

  type Media {
    id: String,
    personId: String,
    mediaId: String
  }

  type Query {
    persons: [Person]!,
    person(_id: String): Person,
    pageConfig: String
  }

  input PortraitsInput {
    primary: String,
    secondary: [String]
  }

  input PersonInput {
    name: String!,
    portraits: PortraitsInput
  }

  type Mutation {
    createPerson(input: PersonInput): Person
    updatePerson(_id: String, name: String): Person,
    uploadFile(file: Upload!): String!,
    deletePersons(ids: String!): String!
  }
`;

module.exports = typeDefs;