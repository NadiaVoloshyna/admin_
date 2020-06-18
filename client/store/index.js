import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import middlewares from './rootMiddleware';

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const initializeStore = (preloadedState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    preloadedState,
    bindMiddleware([sagaMiddleware, ...middlewares])
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export default initializeStore;
