import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import Router from "./Router";
import { createStore } from "redux";
import allReducer from "./redux/reducers";
import { Provider } from "react-redux";
const mystore = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={mystore}>
    <Router />
  </Provider>,

  document.getElementById("root")
);
