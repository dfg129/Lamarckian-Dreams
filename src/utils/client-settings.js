import * as C from './constants'
import extend from 'extend'
import axios from 'axios'
import parseEndpointConfig from './parse-endpoint-config'
import { setEndpointKeys } from '../actions/configure'
import {
  getCurrentSettings,
  setCurrentSettings,
  getInitialEndpointKey,
  setDefaultEndpointKey,
  setCurrentEndpoint,
  setCurrentEndpointKey,
  retrieveData,
  persistData
} from './session-storage'
import _debug from 'debug'

const debug = _debug('app:client-settings')

const defaultSettings = {
  proxyIf:            function () { return false },
  proxyUrl:           '/proxy',
  forceHardRedirect:  false,
  storage:            'cookies',
  cookieExpiry:       14,
  cookiePath:         '/',
  initialCredentials: null,

  passwordResetSuccessUrl: function () {
    return root.location.href
  },

  confirmationSucessUrl: function () {
    return root.location.href
  },

  tokenFormat: {
    'access-token': '{{ access-token }}',
    'token-type':   'Bearer',
    client:         '{{ client }}',
    expiry:         '{{ expiry }}',
    uid:            '{{ uid }}'
  },

  parseExpiry: function (headers) {
    return (parseInt(headers['expiry'], 10) * 1000) || null
  },

  handleLoginResponse: function (resp) {
    return resp.data
  },

  handleAccountUpdateResponse: function (resp) {
    return resp.data
  }
}

export function applyConfig({dispatch, endpoint={}, settings={}, reset=false}={}) {
  debug("inside applyConfig")
  let currentEndpointkey;

  if (reset) {
    resetConfig();
  }

  if (settings.initialCredentials) {
    currentEndpointkey = settings.initialCredentials.currentEndpointkey
  }

  setCurrentSettings(extend({}, defaultSettings, settings))

  let {defaultEndpointKey, currentEndpoint} = parseEndpointConfig(
    endpoint, getInitialEndpointKey()
  )

  if (!currentEndpointkey) {
    currentEndpointkey = defaultEndpointKey
  }

  setDefaultEndpointKey(defaultEndpointKey)
  setCurrentEndpoint(currentEndpoint)

  dispatch(setEndpointKeys(Object.keys(currentEndpoint), currentEndpointkey, defaultEndpointKey))
  setCurrentEndpointKey(currentEndpointkey)

  let savedCreds = retrieveData(C.SAVED_CREDS_KEY)

  if (getCurrentSettings().initialCredentials) {
    let {user, headers, config} = getCurrentSettings().initialCredentials
    persistData(C.SAVED_CREDS_KEY, headers)
    return Promise.resolve(user)
  } else if (savedCreds) {
    return axios.get(savedCreds)
  } else {
    return Promise.reject({reason: "No credentials."})
  }
}
