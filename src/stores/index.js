import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  userReducer,
  navPropsReducer,
  unauthenticatedSessionReducer
} from '../reducers';

let store = [];
export const history = createBrowserHistory();

export default {
  configure: initialState => {
    const reducers = combineReducers({
      user: userReducer,
      nav: navPropsReducer,
      unauthenticatedSessionData: unauthenticatedSessionReducer
    });

    if (initialState) {
      store = createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunk))
      );
      return store;
    }

    store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
    return store;
  },

  currentStore: () => {
    return store;
  }
};
