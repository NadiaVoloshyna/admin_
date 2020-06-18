import _camelCase from 'lodash/camelCase';

/**
 * Creates actions for provided action types
 * @param {Object} actionTypes List of action types
 */
const actionCreator = (actionTypes) => { // TODO: check actionTypes validity
  return Object.keys(actionTypes).reduce((acc, type) => {
    acc[_camelCase(type)] = (payload) => ({ type, payload });
    return acc;
  }, {});
};

export default actionCreator;
