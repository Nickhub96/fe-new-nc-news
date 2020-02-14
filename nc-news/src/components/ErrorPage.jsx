import React from "react";

const ErrorPage = err => {
  if (err.default) {
    return <h3>"Oops Page not found"</h3>;
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
