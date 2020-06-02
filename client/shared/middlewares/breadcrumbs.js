import { actionTypes } from 'pages/Library/actions';

const selectFolderMiddleware = store => next => action => {
  if (action.type === actionTypes.APPLY_BREADCRUMBS && action.payload !== 'Root') {
    const state = store.getState();
    let [, ...breadcrumbs] = state.library.breadcrumbs;
    const index = breadcrumbs.indexOf(action.payload);

    if (index === -1) {
      breadcrumbs.push(action.payload);
    } else {
      breadcrumbs = breadcrumbs.splice(0, index + 1);
    }
    
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('path', breadcrumbs.join('/'));
    const newQuery = window.location.pathname + '?' + searchParams.toString();
    window.history.pushState(null, '', newQuery);
  }
  next(action);
}

export default selectFolderMiddleware;