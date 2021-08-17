import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Question extends Component {
  render() {
    const { users, question, authedUser } = this.props
    return (
      <div className='question'>
        <img
          src={users[question.author].avatarURL}
          alt={'author'}
          className='avatar'
        />
        <h3>{users[question.author].name} asks </h3>

        <div className="question-info">
          <h3> Would You Rather? </h3>
          <span>{question.optionOne.text}  or...</span>
          <Link to={`/questions/${question.id}`}> View poll</Link>
        </div>
  
      </div>
    )
  }
}



function mapStateToProps ({ users, questions, authedUser },{id}) {
  const question = questions[id]
  return {
    question,
    users,
    authedUser   
  }
}

export default connect(mapStateToProps)(Question)
