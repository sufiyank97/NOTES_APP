import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import axios from "./config/axios";
import { setUser } from "./actions/user";
const store = configureStore();
//initial store value
// console.log(store.getState());
// store.subscribe(() => {
//   console.log(store.getState());
// });
// handle page reloads
if (localStorage.getItem("token")) {
  axios
    .get("/users/account", {
      headers: {
        "x-auth": localStorage.getItem("token")
      }
    })
    .then(
      response => {
        console.log(response.data, "sdfds");
        if (response.data.errors) {
          window.alert(response.data);
        }
        const user = response.data;
        store.dispatch(setUser(user));
      },
      () => {
        console.log("dsffs");
      }
    )
    .catch(err => {
      window.alert(err);
    });
}
const ele = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(ele, document.getElementById("root"));
