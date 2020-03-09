import React from "react";
import { Link } from "@reach/router";

const NavBar = () => {
  return (
    <nav>
      <Link to="/" className="nav-link">
        Home
      </Link>
      <p>{"   "}</p>
      <Link to="/topics" className="nav-link">
        Topics
      </Link>
    </nav>
  );
};

export default NavBar;
