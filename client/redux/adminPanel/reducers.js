import { OPEN_DRAWER, CLOSE_DRAWER, START_LOADING, FINISH_LOADING } from './actions'

const initialState = {
  drawerOpen: false,
  loading: false
}
export const adminPanelReducers = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        drawerOpen: true
      }
    case CLOSE_DRAWER:
      return {
        ...state,
        drawerOpen: false
      }
    case START_LOADING:
      return {
        ...state,
        loading: true
      }
    case FINISH_LOADING:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
