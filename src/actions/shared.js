import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getInitialData } from "../utils/api";
import { recieveQuestions } from "./questions";
import { recieveUsers } from "./users";
import { setAuthedUser } from "./authedUser";

const AUTHED_ID = 'LOGGED_OUT'



export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions}) => {
        dispatch(recieveUsers(users))
        dispatch(recieveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}