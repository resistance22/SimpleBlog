import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { loginReducer, adminPanelReducers } from './reducers'
import thunk from 'redux-thunk'

const allReducers = combineReducers({
  auth: loginReducer,
  adminPanel: adminPanelReducers
})

export const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)))
