import fetch from 'isomorphic-unfetch';

export const useQuery = (query) => {
  return fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
}