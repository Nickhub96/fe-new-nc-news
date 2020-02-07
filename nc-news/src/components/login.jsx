import React from "react";

const handleLogin = loggedIn => {
  this.setState({ loggedIn: !loggedIn });
};

const Login = ({ user, loggedIn }) => {
  return (
    <button
      onClick={() => {
        handleLogin(loggedIn);
      }}
    >
      {loggedIn ? `logged in as ${user}` : `log in as ${user}`}
    </button>
  );
};

export default Login;
