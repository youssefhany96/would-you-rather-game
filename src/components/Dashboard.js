import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  state= {
    answered: false
  }
  render() {
    console.log(this.props)
    const { questionsIds, users, authedUser } = this.props
    let { answered } = this.state
    if (answered === true) {
      return (
        <div className='center'>
          <button onClick={() => (
               this.setState(() => ({
                answered: false
              }))
          )
          }>
            not answered        
          </button>  
          <button onClick={() => (
            this.setState(() => ({
              answered: true
            }))
          )}>
            answered
          </button>
          <div>

            <h3></h3>
            <ul className='dashboard-list'>
              {questionsIds.filter(id => Object.keys(users[authedUser].answers).includes(id)).map((questionid) => (
                  <li key={questionid}> 
                    <Question id={questionid} />             
                  </li> 
              ))
              }
            </ul>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className='center'>
          <button onClick={() => (
            this.setState(() => ({
              answered: false
            }))
          )
          }>
            not answered        
          </button>  
          <button onClick={() => (
            this.setState(() => ({
              answered: true
            }))
          )}>
            answered
          </button>
          <div>
              
            <h3></h3>
            <ul className='dashboard-list'>
              {questionsIds.filter(id => !Object.keys(users[authedUser].answers).includes(id)).length === 0 
              
              ?
                <p>you answered all the questions you can  </p>
                  // <p>you answered all the questions you can <Link to='/New'>create</Link> new question </p>     
              :
                questionsIds.filter(id=> !Object.keys(users[authedUser].answers).includes(id)).map((questionid) => (
                  <li key={questionid}>
                    <Question id={questionid}/>
                  </li>
                ))
              }
            </ul>
          </div>  
        </div>  
      )
    }
  }

  }

function mapStateToProps ({ users, questions, authedUser }) {
  return {
    questionsIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    users,
    authedUser  
  }
}

export default connect(mapStateToProps)(Dashboard)

