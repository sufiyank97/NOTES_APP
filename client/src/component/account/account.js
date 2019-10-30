import React from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import { startAccountUser } from "../../actions/user";

function Account(props) {
  //   return <Redirect to="/login" />;
  return (
    <div>
      Name:{props.user.username}
      <br />
      Email:-{props.user.email}
    </div>
  );
}
const mapStatetoProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStatetoProps)(Account);
