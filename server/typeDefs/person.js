const { gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  scalar DateTime

  type Biography {
    documentId: String!,
    documentBody: String
  }

  type Person {
    _id: String,
    name: String!,
    biography: Biography,
    created: DateTime,
    portrait: String
  }

  type Media {
    id: String,
    personId: String,
    mediaId: String
  }

  type Profession {
    _id: String,
    name: String!
  }

  type Pagination {
    total: Int!,
    limit: Int!,
    offset: Int!
  }

  type Persons {
    persons: [Person]!,
    pagination: Pagination!
  }

  type Professions {
    professions: [Profession]!,
    pagination: Pagination!
  }

  type Query {
    persons(offset: Int!, searchTerm: String, sort: String): Persons!,
    person(_id: String): Person,
    professions(offset: Int!, searchTerm: String, sort: String): Professions!
  }

  type Status {
    status: String!
  }

  input PersonInput {
    name: String!,
    portrait: String
  }

  type Mutation {
    # Person
    createPerson(input: PersonInput): Person
    updatePerson(_id: String, name: String): Person,

    # Persons
    deletePersons(ids: [String]!, documentIds: [String]!): String!,

    # Profession
    createProfession(name: String!): Profession!

    # Users
    inviteUser(email: String!, role: String!): Status!
  }
`;

module.exports = typeDefs;