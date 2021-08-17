import { hideLoading, showLoading } from "react-redux-loading-bar";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { handleUserQuestion, handleUserAnswer } from './users'


export const RECIEVE_QUESTIONS = 'RECIEVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const QUESTION_ANSWER = 'QUESTION_ANSWER'

export function recieveQuestions (questions) {
  return {
    type: RECIEVE_QUESTIONS,
    questions,
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

function questionAnswer ({ authedUser, qid, answer }) {
  return {
    type: QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
    .then((question) => {
      dispatch(handleUserQuestion(authedUser, question.id ))
      dispatch(addQuestion(question))
      dispatch(hideLoading())
    })
  }
}

export function handleAnswerQuestion (qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
    .then(() => {
      dispatch(handleUserAnswer( authedUser, qid, answer ))
      dispatch(questionAnswer({ authedUser, qid, answer }))
      dispatch(hideLoading())
    })
  }  
}
