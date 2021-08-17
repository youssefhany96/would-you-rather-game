import { RECIEVE_QUESTIONS, ADD_QUESTION, QUESTION_ANSWER } from "../actions/questions";

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECIEVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION :
      const { question } = action
      return {
        ...state,
        [question.id]: question
      }
    case QUESTION_ANSWER :
      const { authedUser, qid, answer } = action
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat(authedUser)
          }
        }
      }   
    default :
      return state
    
  }
}      
      