import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <h1>404 - Not Found!</h1>
        <NavLink to="/">
          <button id="returnHome">Go Home</button>
        </NavLink>
    </div>
    );
  }
}

export default NotFound
