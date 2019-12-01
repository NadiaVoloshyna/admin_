import { actions } from 'shared/actions';
import { actionTypes as personTypes } from 'pages/persons/actions';
import { actionTypes as professionTypes } from 'pages/professions/actions';

const updatePaginationMiddleware = store => next => action => {
  if (action.type === personTypes.GET_PERSONS || action.type === professionTypes.GET_PROFESSIONS) {
    const { offset, searchTerm, sort } = action.payload || {};

    if (typeof offset !== 'undefined') {
      store.dispatch(actions.updatePagination({ offset }));
    }

    if (typeof searchTerm !== 'undefined') {
      store.dispatch(actions.updateSearchTerm({ searchTerm }));
    }

    if (typeof sort !== 'undefined') {
      store.dispatch(actions.updateSort({ sort }));
    }
  }
  next(action);
}

export default updatePaginationMiddleware;