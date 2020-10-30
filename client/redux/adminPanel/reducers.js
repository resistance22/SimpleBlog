import { OPEN_DRAWER, CLOSE_DRAWER } from './actions'

const initialState = {
  drawerOpen: false
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
    default:
      return state
  }
}
