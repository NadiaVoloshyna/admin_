import { actionTypes, actionCreator } from 'pages/person/actions';

const updatePaginationMiddleware = store => next => action => {
  if(action.type === actionTypes.GET_PERSONS || action.type === actionTypes.GET_PROFESSIONS) {
    const { offset, searchTerm, sort } = action.payload || {};

    if (typeof offset !== 'undefined') {
      store.dispatch(actionCreator(actionTypes.UPDATE_PAGINATION, { offset }));
    }

    if (typeof searchTerm !== 'undefined') {
      store.dispatch(actionCreator(actionTypes.UPDATE_SEARCH_TERM, { searchTerm }));
    }

    if (typeof sort !== 'undefined') {
      store.dispatch(actionCreator(actionTypes.UPDATE_SORT, { sort }));
    }
  }
  next(action);
}

export default updatePaginationMiddleware;