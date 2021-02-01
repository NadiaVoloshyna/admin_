import { string, oneOf, number } from 'prop-types';
import { ASSET_TYPES } from '../constants/index';

export const AssetType = {
  id: string,
  name: string.isRequired,
  parent: string,
  type: oneOf(Object.values(ASSET_TYPES)).isRequired,
  url: string,
  createdBy: string.isRequired,
  created: string.isRequired,
  author: string,
  year: number,
  description: string,
};
