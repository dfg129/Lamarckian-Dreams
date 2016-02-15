import * as C from './constants'
import extend from 'extend'

const defaultEndpoint = {
  apiUrl:             '/api',
  signOutPath:        '/auth/sign_out',
  userSignInPath:    '/auth/sign_in',
}

function getFirstObjectKey (obj) {
  for (var key in obj) {
    return key
  }
}

export default function parseEndpointConfig (endpoint, defaultEndpointKey=null) {

  if(endpoint.constructor !== Array) {
    defaultEndpointKey = C.INITIAL_CONFIG_KEY

    var defaultConfig = {}
    defaultConfig[defaultEndpointKey] = endpointKey
    endpoint = [defaultConfig]
  }

  let currentEndpoint = {}

  for (var i = 0; i < endpoint.length; i++) {
    var configName = getFirstObjectKey(endpoint[i])

    if (!defaultEndpointKey) {
      defaultEndpointKey = configName
    }

    currentEndpoint[configName] = extend(
      {}, defaultEndpoint, endpoint[i][configName]
    )
  }

  return {defaultEndpointKey, currentEndpoint}

}
