import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import store, { history } from "./redux/store";
import Scenes from "./scenes";
// import "./styles-global/style.scss";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Scenes history={history} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
