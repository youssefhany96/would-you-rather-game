import React, { Component } from 'react'
import { connect } from 'react-redux'

class User extends Component {
  render() {
    const { users, id } = this.props
    return (
      <div className="user">
        <div className="userinfo">
          <img src={users[id].avatarURL} alt="img" className="avatar"/>
        </div>

        <div className="userd">
          <h1>{users[id].name}</h1>
          <h4> number of questions: {users[id].questions.length} </h4>
          <h4> number of answers: {Object.keys(users[id].answers).length} </h4>
        </div>
      </div>  
    )
  }
}

function mapStateToProps ({ users }, {id}) {
  return {
    users,
    id
  }
}

export default connect(mapStateToProps)(User)
