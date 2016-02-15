import {
  getUserSignInUrl,
  setCurrentEndpointKey,
  getCurrentEndpointKey
} from '../utils/session-storage'
import { storeCurrentEndpointKey } from './configure'
import { axios } from 'axios'


export const USER_SIGN_IN_START       = "USER_SIGN_IN_START"
export const USER_SIGN_IN_COMPLETE    = "USER_SIGN_IN_COMPLETE"
export const USER_SIGN_IN_ERROR       = "USER_SIGN_IN_ERROR"
export const USER_SIGN_IN_FORM_UPDATE = "USER_SIGN_IN_FORM_UPDATE"

export function userSignInFormUpdate(endpoint, key, value) {
  return { type: USER_SIGN_IN_FORM_UPDATE, endpoint, key, value }
}
export function userSignInStart(endpoint) {
  return { type: USER_SIGN_IN_START, endpoint }
}
export function userSignInComplete(endpoint, user) {
  return { type: USER_SIGN_IN_COMPLETE, endpoint, user }
}
export function userSignInError(endpoint, error) {
  return { type: USER_SIGN_IN_ERROR, endpoint, error }
}
export function userSignIn(body, endpointKey) {
  return dispatch => {
    const prevEndpointKey = getCurrentEndpointKey()

    setCurrentEndpointKey(endpointKey)
    const currentEndpointKey = getCurrentEndpointKey()

    dispatch(storeCurrentEndpointKey(currentEndpointKey))
    dispatch(userSignInStart(currentEndpointKey))

    return axios.post(getUserSignInUrl(currentEndpointKey), JSON.stringify(body))
      .then(parseResponse)
      .then((user) => dispatch(userSignInComplete(currentEndpointKey, user)))
      .catch((errors) => {
        setCurrentEndpointKey(prevEndpointKey)
        dispatch(storeCurrentEndpointKey(prevEndpointKey))
      })
  }
}

const parseResponse = (response) => {
  let json = respopnse.json()
  if (response.status >= 200 && response.status < 300) {
    return json
  } else {
    return json.then(err => Promise.reject(err))
  }
}
