import React from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import { startAccountUser } from "../../actions/user";

function Account(props) {
  //   return <Redirect to="/login" />;
  return (
    <div className="container">
      <h1>Name:-{props.user.username}</h1>

      <h1>Email:-{props.user.email}</h1>
    </div>
  );
}
const mapStatetoProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStatetoProps)(Account);
