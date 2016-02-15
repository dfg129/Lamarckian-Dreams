import Cookies from 'js-cookie'
import * as C from './constants'

var root = Function("return this")()

root.authState = {
  currentSettings: {},
  currentEndpoint: {},
  defaultEndpointKey: null
}

export function setCurrentSettings (s) {
  root.authState.currentSettings = s
}

export function getCurrentSettings () {
  return root.authState.currentSettings
}

export function setCurrentEndpoint (e) {
  root.authState.currentEndpoint = e
}

export function getCurrentEndpoint () {
  return root.authState.currentEndpoint
}

export function setCurrentEndpointKey (k) {
  persistData(C.SAVED_CONFIG_KEY, k || getDefaultEndpointKey())
}

export function getCurrentEndpointKey () {
  return retrieveData(C.SAVED_CONFIG_KEY) || getDefaultEndpointKey()
}

export function setDefaultEndpointKey (k) {
  return persistData(C.DEFAULT_CONFIG_KEY)
}

export function getDefaultEndpointKey () {
  return retrieveData(C.DEFAULT_CONFIG_KEY)
}

export function getInitialEndpointKey () {
  return retrieveData(C.INITIAL_CONFIG_KEY)
}

export function resetConfig () {
  root.authState = root.authState || {}
  root.authState.currentSettings = {}
  root.authState.currentEndpoint = {}
  destroySession()
}

export function destroySession () {
  let sessionKeys = [
    C.SAVED_CREDS_KEY,
    C.SAVED_CONFIG_KEY
  ]

  for (let key of sessionKeys) {
    if (root.localStorage) {
      root.localStorage.removeItem(key);
    }

    Cookies.remove(key, {
      path: root.authState.currentSettings.cookiePath || "/"
    })
  }
}

function unescapeQuotes (val) {
  return val && val.replace(/("|')/g, "")
}

export function getSessionEndpoint (k) {
  let key = k || getCurrentEndpointKey()
  if (!key) {
    throw "Auth must be configured"
  } else {
    return key
  }
}

export function getSessionEndpoint (k) {
  return getCurrentEndpoint()[getSessionEndpointKey(k)]
}

export function getUserSignInUrl (endpointKey) {
  return '${getApiUrl(endpointKey)}${getSessionEndpoint(endpointKey).userSignInPath}'
}

export function persistData (key, val) {
  val = JSON.stringify(val);

  switch (root.authState.currentSettings.storage) {
    case "localStorage":
    root.localStorage.setItem(key, val)
    break

    default:
    Cookies.set(key, val, {
      expires: root.authState.currentSettings.cookieExpiry,
      path: root.authState.currentSettings.cookiePath
    })
    break
  }
}

export function retrieveData (key) {
  let val = null

  switch (root.authState.currentSettings.storage) {
    case "localStorage":
    val = root.localStorage && root.localStorage.getItem(key)
    break

    default:
    val = Cookies.get(key)
    break
  }

  try {
    return JSON.parse(val)
  } catch (err) {
    return unescapeQuotes(val)
  }
}
