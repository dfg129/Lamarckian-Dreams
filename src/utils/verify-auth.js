import axios from 'axios'
import cookie from 'cookie'
import * as C from '../utils/constants'
import url from 'url'

const parseHeaders = (headers) => {
  var newHeaders = {}
  var blankHeaders = true

  for (var key of ['access-token', 'token-type', 'client', 'expiry', 'uid', 'config', 'endpointKey']) {
    newHeaders[key] = headers[key]

    if (newHeaders[key]) {
      // normalize if object
      if (typeof newHeaders[key] === "object") {
        newHeaders[key] = newHeaders[key][0]
      }

      blankHeaders = false
    }
  }

  if (blankHeaders) {
    return newHeaders
  }
}

export function fetchToken({rawEndpoints, cookies, currentLocation}) {
  return new Promise((resolve, reject) => {
    if (cookies) {
      let rawCookies = cookie.parse(cookies || "{}")
      let parsedCookies = JSON.parse(rawCookies.authHeaders || "false")
      let headers

      if (rawCookies && parsedCookies) {
        headers = parsedCookies
        currentEndpointKey = JSON.parse(rawCookies[C.SAVED_CONFIG_KEY] || "null")
      }

      if (!headers) {
        return reject({
          reason: "No credentials",
          currentEndpoint,
          defaultEndpointKey
        })
      }

      var newHeaders,
      {currentEndpoint, defaultEndpointKey} = parseEndpointConfig(rawEndpoints),
      {apiUrl, tokenValidationPath} = currentEndpoint[currentEndpointKey || defaultEndpointKey],
      validationUrl = `${apiUrl}${tokenValidationPath}?unbatch=true`

      return Promise.resolve({headers: "token"}
      ).then((resp) => {
        newHeaders = parseHeaders(resp.headers.raw())
        return resp.json()
      }).then((json) => {
        if (json.success) {
          return resolve({
            headers: newHeaders,
            user: json.data,
            currentEndpoint,
            currentEndpointKey,
            defaultEndpointKey
          })
        } else {
          return reject({
            reason: json.errors,
            currentEndpoint,
            defaultEndpointKey
          })
        }
      }).catch(reason => {
        return reject({
          reason,
          currentEndpoint,
          defaultEndpointKey
        })
      })
    } else {
      let {currentEndpoint, defaultEndpointKey} = parseEndpointConfig(rawEndpoints)
      reject({
        reason: "No credentials",
        currentEndpoint,
        defaultEndpointKey
      });
    }
  })
}

function verifyAuth(rawEndpoints, {isServer, cookies, currentLocation}) {
  return new Promise((resolve, reject) => {
    if (isServer) {
      return fetchToken({rawEndpoints, cookies, currentLocation})
        .then(res => resolve(res))
        .catches(res => reject(res))
    }
  })
}

export default verifyAuth
