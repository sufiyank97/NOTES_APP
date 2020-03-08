import React from "react";
// import logo from './logo.svg';
// import './App.css';
import CategoriesList from "./component/category/List1";

import NotesList from "./component/notes/notesList1";
import AddNote from "./component/notes/addNote1";
import NoteShow from "./component/notes/noteShow";

import Register from "./component/Register/Register";
import Login from "./component/Login/login";
import Logout from "./component/logout/logout";
import Account from "./component/account/account";
import { connect } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "./bootstrap.css";

function App(props) {
  return (
    <div className="container h-100">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
          <Link to="/" className="navbar-brand ">
            Notes App
          </Link>
          {Object.keys(props.user).length === 0 ? (
            <React.Fragment>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </React.Fragment>
          ) : (
              <React.Fragment>
                <Link to="/categories" className="nav-link">
                  Categories
              </Link>
                <Link to="/notes" className="nav-link">
                  Notes
              </Link>
                {/* <Link to='/delete' className="nav-link" > Settings </Link> */}
                <Link to="/account" className="nav-link">
                  Account
              </Link>
                <Link to="/logout" className="nav-link">
                  Logout
              </Link>
              </React.Fragment>
            )}
        </nav>
        <Switch>
          <Route path="/notes/edit/:id" exact component={AddNote} />
          <Route path="/notes/add" exact component={AddNote} />
          <Route path="/notes/:id" exact component={NoteShow} />
          <Route path="/categories" component={CategoriesList} />
          <Route path="/notes" exact component={NotesList} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/account" component={Account} />
          <Route path="/logout" component={Logout} />
          {/* <Route path="/" component={Home} /> */}
        </Switch>
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
