import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class QuestionPage extends Component {
  state = {
    selected: 'optionOne'
  }
  handleSubmit=(e) => {
    e.preventDefault()
    const { dispatch, id} = this.props
    const { selected } = this.state
    dispatch(handleAnswerQuestion(id, selected))
  }
  handleChange=(e) => {
    this.setState({ selected: e.target.value})
  }
  calculateVotes = (votes, totalVotes) => {
    return Math.round((votes / totalVotes) * 100);
  }; 
  render() {
    const { id, users, questions, authedUser} = this.props
    if(!questions[id]) {
      return <Redirect to="/not-found"/>
    }
    let optionOneVotes = questions[id].optionOne.votes.length
    let optionTwoVotes = questions[id].optionTwo.votes.length
    let totalVotes = questions[id].optionOne.votes.length + questions[id].optionTwo.votes.length
    return (
      <div>
      { Object.keys(users[authedUser].answers).includes(id) ?
          <div className='center'>
            <div className='heading'>
              <img src= {users[questions[id].author].avatarURL} alt='avatar' className='avatar' />
              <h2>Asked by {users[questions[id].author].name}</h2>
              <h3>The Results</h3>
            </div>   
            <div className={ users[authedUser].answers[id]==="optionOne"? "sucess":"unsucess"}>
              <p>Would you rather {questions[id].optionOne.text}?</p>
              <p>{optionOneVotes} out of {totalVotes}</p>
              <p>{this.calculateVotes(optionOneVotes, totalVotes)}%</p>
            </div>

            <div className={users[authedUser].answers[id]==="optionTwo"? "sucess":"unsucess"}>
              <p>Would you rather {questions[id].optionTwo.text}?</p>
              <p>{optionTwoVotes} out of {totalVotes}</p>
              <p>{this.calculateVotes(optionTwoVotes, totalVotes)}%</p>
            </div>  
          </div>  
      : <div className='center'>
          <div>
            <img src= {users[questions[id].author].avatarURL} alt='avatar' className='avatar' />
            <h1>{users[questions[id].author].name} asks</h1> 
          </div>
          <h3>Would You Rather...</h3>
          <form onSubmit={this.handleSubmit}>
            <input type="radio" name="option" value="optionOne" onChange={this.handleChange} defaultChecked />
            <label htmlFor="optionOne">{questions[id].optionOne.text}</label>
            <input type="radio" id="optionTwo" name="option" value="optionTwo" onChange={this.handleChange} />
            <label htmlFor="optionTwo">{questions[id].optionTwo.text}</label>
            <input type="submit" value="Submit Vote" className="voteBtn" disabled={this.state.selected===undefined} />
          </form>
        </div>    
      }
      </div>
    )
  }
}

function mapStateToProps ({ users, questions, authedUser}, { match }) {
  const id = match.params.question_id
  return {
    id,
    authedUser,
    users,
    questions
  }
}
  

export default connect(mapStateToProps)(QuestionPage)
