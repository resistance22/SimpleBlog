import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { loginReducer } from './auth/reducers'
import thunk from 'redux-thunk'

const allReducers = combineReducers({
  auth: loginReducer
})

export const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)))
