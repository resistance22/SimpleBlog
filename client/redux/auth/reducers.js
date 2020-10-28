import { LOGIN_SUCCESS, LOGOUT } from './actions'

const initialState = {
  loggedIn: false,
  user: {}
}
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: {}
      }
    default:
      return state
  }
}
