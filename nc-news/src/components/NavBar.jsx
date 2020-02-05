import React from "react";
import { Link } from "@reach/router";

const NavBar = () => {
  return (
    <nav>
      <Link to="/" className="nav-link">
        Home
      </Link>
      {"  "}
      <Link to="/topics" className="nav-link">
        Topics
      </Link>
    </nav>
  );
};

export default NavBar;
