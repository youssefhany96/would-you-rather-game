import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from "./User"


class Leaderboard extends Component {
  render() {
    const { sortedUsers } = this.props
    return (
      <div>
        <ul>
          {sortedUsers.map((user)=>(
            <li key={user.id}>
              <User id={user.id}/>
            </li>
          )
            
          )}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({users}) {
  const sortedUsers = (Object.values(users)).sort((a, b) => {
    return ((Object.keys(b.answers)).length + b.questions.length)-((Object.keys(a.answers)).length + a.questions.length)
  })

  return {
    sortedUsers
  }
}    


export default connect(mapStateToProps)(Leaderboard)
