export const OPEN_DRAWER = 'OPEN_DRAWER'
export const CLOSE_DRAWER = 'CLOSE_DRAWER'
export const START_LOADING = 'START_LOADING'
export const FINISH_LOADING = 'FINISH_LOADING'

export const openDrawer = () => {
  return {
    type: OPEN_DRAWER
  }
}

export const closeDrawer = () => {
  return {
    type: CLOSE_DRAWER
  }
}

export const startLoading = () => {
  return {
    type: START_LOADING
  }
}

export const finishLoading = () => {
  return {
    type: FINISH_LOADING
  }
}
