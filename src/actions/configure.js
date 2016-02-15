import * as C from '../utils/constants'
import {
  authenticateStart,
  authenticateComplete,
  authenticateError
} from './authenticate'
import ssAuthTokenUpdate from './server'
import verifyAuth from '../utils/verify-auth'
import { applyConfig } from '../utils/client-settings'
import _debug from 'debug'

const debug = _debug('app:configure')

export const STORE_CURRENT_ENDPOINT_KEY = "STORE_CURRENT_ENDPOINT_KEY"
export const SET_ENDPOINT_KEYS = "SET_ENDPOINT_KEYS"

export function storeCurrentEndpointKey (currentEndpointKey) {
  return { type: STORE_CURRENT_ENDPOINT_KEY, currentEndpointKey }
}

export function setEndpointKeys(endpoints, currentEndpointKey, defaultEndpointKey) {
  return { type: SET_ENDPOINT_KEYS, endpoints, currentEndpointKey, defaultEndpointKey}
}

export function configure(endpoint={}, settings={}) {
  return dispatch => {

    dispatch(setEndpointKeys(endpoint))

    dispatch(authenticateStart())

    let promise,
    user,
    headers

    let tokenBridge = document.getElementById("token-bridge")

    if (tokenBridge) {
      let rawServerCreds = tokenBridge.innerHtml
      if (rawServerCreds) {
        let serverCreds = JSON.parse(rawServerCreds)

        ({headers, user} = serverCreds)

        if (user) {
          dispatch(authenticeComplete(user))

          settings.initialCredentials = serverCreds
        }

        dispatch(ssAuthTokenUpdate({user, headers}))
      }

      let {authRedirectPath, authRedirectHeaders} = getRedirectInfo(window.location)

      if (authRedirectPath) {
        dispatch(pushState(null, authRedirectPath))
      }
    }

   promise = Promise.resolve(applyConfig({dispatch, endpoint, settings}))

   return promise
    .then(user => {
      dispatch(authenticateComplete(user))
      return user
    })
    .catch(({reason} = {}) => {
      dispatch(authenticateError([reason]))
      return Promise.resolve({reason})
    })
  }
}
