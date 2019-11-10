/** Queries */
export const GET_PERSON = (id) => `{
  person(_id: "${id}") {
    name,
    biography,
    portrait
  }
}`;

export const GET_PERSONS = (offset, searchTerm, sort) => `{
  persons(offset: ${offset}, searchTerm: "${searchTerm}", sort: "${sort}") {
    persons {
      _id,
      name,
      created
    },
    pagination {
      total,
      limit,
      offset
    }
  }
}`;

/** Mutations */
export const CREATE_PERSON = ({ name, portrait }) => `mutation {
  createPerson(input: {
    name: "${name}",
    portrait: "${portrait}"
  }) {
    _id,
    name
  }
}`

export const DELETE_PERSONS = (ids) => `mutation {
  deletePersons (ids: "${ids}")
}`