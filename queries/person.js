/** Queries */
export const GET_PERSON = (id) => `{
  person(_id: "${id}") {
    name,
    biography,
    portraits {
      primary,
      secondary
    }
  }
}`;

export const GET_PERSONS = () => `{
  persons {
    _id,
    name,
    created
  }
}`;

/** Mutations */
export const CREATE_PERSON = ({ name, portraits = '{}' }) => `mutation {
  createPerson(input: {
    name: "${name}",
    portraits: {
      primary: null,
      secondary: []
    }
  }) {
    _id,
    name
  }
}`

export const DELETE_PERSONS = (ids) => `mutation {
  deletePersons (ids: "${ids}")
}`