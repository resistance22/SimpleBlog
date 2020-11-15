import axios from 'axios'

export const setAuthorizationHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const removeAuthorizationHeader = token => {
  delete axios.defaults.headers.common.Authorization
}
