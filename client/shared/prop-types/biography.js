import { string, shape, array } from 'prop-types';

export const Biography = {
  documentId: string.isRequired,
  modifiedTime: string,
  lastModifiedBy: string,
  permissions: shape({
    authors: array,
    reviewers: array,
  }),
};
