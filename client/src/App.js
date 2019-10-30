import React from "react";
// import logo from './logo.svg';
// import './App.css';
import CategoryList from "./component/category/List";
import Register from "./component/Register/Register";
import Login from "./component/Login/login";
import { connect } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import "./bootstrap.css";

function App(props) {
  return (
    <div>
      <BrowserRouter>
        <nav className="navbar navbar-dark bg-dark d-flex">
          <Link to="/" className="navbar-brand ">
            Notes App
          </Link>
          {Object.keys(props.user).length === 0 ? (
            <React.Fragment>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                {" "}
                Register{" "}
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to="/categories" className="nav-link">
                {" "}
                Categories{" "}
              </Link>
              <Link to="/notes" className="nav-link">
                {" "}
                Notes{" "}
              </Link>
              {/* <Link to='/delete' className="nav-link" > Settings </Link> */}
              <Link to="/account" className="nav-link">
                Account
              </Link>
              <Link to="/logout" className="nav-link">
                {" "}
                Logout{" "}
              </Link>
            </React.Fragment>
          )}
        </nav>
        <Route path="/categories" component={CategoryList} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/login" component={Login} exact={true} />
      </BrowserRouter>
    </div>
  );
}
const mapStatetoProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStatetoProps)(App);
