import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Nav extends Component {
  handleCLick = () => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser("LOGGED_OUT"));
  };
  render(){ 
    const { loggedOut, user } = this.props
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/Home' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
            leaderboard
            </NavLink>
          </li>
          {/* <li className='sign'>
            <NavLink to='/' exact activeClassName='active'>
            Sign out
            </NavLink>
          </li> */}
          <li className='sign'>
            Hello {loggedOut? 'please login': user.name}
            <p onClick={this.handleCLick}>Logout</p>
          </li>
        </ul>
      </nav>
    )
  }  
}

function mapStateToProps({ authedUser, users }) {
  const user = users[authedUser];
  let loggedOut = false;
  if (authedUser === "LOGGED_OUT") {
    loggedOut = true;
  }
  return {
    user,
    loggedOut,
  };
}
export default connect(mapStateToProps)(Nav)