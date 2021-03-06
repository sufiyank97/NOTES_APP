import React from "react";
import axios from "../../config/axios";
export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const formData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    const password2 = this.state.password2;
    if (formData.password === password2) {
      axios
        .post("/users/register", formData)
        .then(response => {
          if (response.data.errors) {
            window.alert(response.data.message);
            console.log("validation error", response.data.errors);
          } else {
            console.log("Success", response.data);
            this.props.history.push("/login");
          }
        })
        .catch(err => {
          console.log(err);
          window.alert(err);
        });
    } else {
      window.alert(
        `Confirm password does not match with the password you entered.`
      );
    }
  }
  render() {
    return (
      <div className="row h-100 justify-content-center align-items-center">
        <form onSubmit={this.handleSubmit}>
          <h3>Register</h3>
          <hr />
          <div className="form-group">
            <label>
              Username
              <input
                type="text"
                name="username"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.username}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email
              <input
                type="text"
                name="email"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.email}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Password
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.password}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Confirm Password{" "}
              <input
                type="password"
                name="password2"
                className="form-control"
                value={this.state.password2}
                onChange={this.handleChange}
                required
              />{" "}
            </label>
          </div>
          <input type="submit" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}
