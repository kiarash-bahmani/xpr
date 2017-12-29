import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto'
import { Provider } from 'react-redux'
import { compose, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import localForage from 'localforage'
import rootReducer from './reducers'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker';

let middlewarePackeges = [thunk]
if (process.env.NODE_ENV === 'development') {
  let { logger } = require('redux-logger')
  middlewarePackeges.push(logger)
}
const middleware = applyMiddleware(...middlewarePackeges)

let enhancers
if (process.env.NODE_ENV === 'development') {
  enhancers = composeWithDevTools(middleware, autoRehydrate())
} else {
  enhancers = compose(middleware, autoRehydrate())
}

export const store = createStore(rootReducer, enhancers)
export const persistor = persistStore(store, { storage: localForage })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
