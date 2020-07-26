import { string, shape, number, array } from 'prop-types';

export const Biography = {
  documentId: string.isRequired,
  modifiedTime: number,
  lastModifiedBy: string,
  permissions: shape({
    authors: array,
    reviewers: array
  })
};
