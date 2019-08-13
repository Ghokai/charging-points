import "antd/dist/antd.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import "./app.css";
import App from "./components/App";
import history from "./history";
import configureStore from "./store";

const store = configureStore();

const applicationWrapper = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(applicationWrapper, document.getElementById("root"));
