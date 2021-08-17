import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  Redirect } from "react-router-dom";

import { handleAddQuestion }from "../actions/questions"


class NewQuestion extends Component {

  state = {
    optionone:'',
    optiontwo:'',
    toHome: false
  }

  handleChangeOne = (e) => {
    e.preventDefault()
    this.setState({ optionone: e.target.value})
  }

  handleChangeTwo = (e) => {
    e.preventDefault()
    this.setState({ optiontwo: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { questions, dispatch } = this.props
    const { optionone, optiontwo, toHome } = this.state
    if((Object.values(questions).map((question) => question.optionOne.text).includes(optionone)||
    Object.values(questions).map((question) => question.optionOne.text).includes(optiontwo))
    &&(Object.values(questions).map((question) => question.optionTwo.text).includes(optiontwo)||
    Object.values(questions).map((question) => question.optionTwo.text).includes(optionone)))
    {
      alert("The question exists")
      return
    }
    else if (optionone.trim() === "" || optiontwo.trim() === "") {
      alert("One or more questions are empty"); 
    } else {
      dispatch(handleAddQuestion(optionone,optiontwo))
      this.setState({ optionone: ''})
      this.setState({ optiontwo: ''})
      this.setState({ toHome: true})
    }
    
  }    

    
  render() {
    const { optionone, optiontwo} = this.state
    if(this.state.toHome === true){
      return  <Redirect to='/Home' />
    }
    return (
      <div className='center'>
        <div>
          <h2>Would You Rather..</h2>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type='text' value={optionone} name='question1' placeholder='Enter the first question' onChange={this.handleChangeOne} />
            <p>OR</p>
            <input type='text' value={optiontwo}  name='question2' placeholder='Enter the second question' onChange={this.handleChangeTwo} />
            <input type="submit" value="Submit" id="submit" />
          </form>
        </div>
        
      </div>
    )
  }
}

function mapStateToProps({questions}) {
  return {
    questions
  }
}



export default connect(mapStateToProps)(NewQuestion)
