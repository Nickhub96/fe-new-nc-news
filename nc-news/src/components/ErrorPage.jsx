import React from "react";

const ErrorPage = err => {
  if (err.default) {
    return <p>"page not found"</p>;
  } else if (err) {
    const { msg } = err.err.data;
    const { status } = err.err;
    return (
      <div>
        {" "}
        <h3>Oops... {msg}</h3>
        <h3>Status {status}</h3>
      </div>
    );
  }
};

export default ErrorPage;
