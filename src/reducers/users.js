import { RECIEVE_USERS, HANDLE_USER_QUESTION, HANDLE_USER_ANSWER } from "../actions/users";

export default function users (state = {}, action) {
  switch(action.type) {
    case RECIEVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case HANDLE_USER_ANSWER :
      const { authedUser, qid, answer } = action
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      } 
    case HANDLE_USER_QUESTION :
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser].questions.concat([action.qid])
        }
      }  
    default :
      return state
  }
}