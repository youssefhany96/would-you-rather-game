export const RECIEVE_USERS = 'RECIEVE_USERS'
export const HANDLE_USER_QUESTION = 'HANDLE_USER_QUESTION'
export const HANDLE_USER_ANSWER = 'HANDLE_USER_ANSWER'

export function recieveUsers (users) {
  return {
    type: RECIEVE_USERS,
    users,
  }
}

export function handleUserQuestion (authedUser, qid) {
  return {
    type: HANDLE_USER_QUESTION,
    authedUser,
    qid,
  }
}

export function handleUserAnswer (authedUser, qid, answer) {
  return {
    type: HANDLE_USER_ANSWER,
    authedUser,
    qid,
    answer,
  }
}