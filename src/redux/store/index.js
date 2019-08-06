import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import createRootReducer from "../modules";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

let composeEnhancers = compose;
composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultState = {};

function configureStore(preloadedState = defaultState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
  );
  return store;
}

const store = configureStore();

export default store;
