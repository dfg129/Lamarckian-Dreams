import querystring from 'querystring'
import extend from 'extend'

export function normalizeTokenKeys (params) {
  if (params.token) {
    params['access-token'] = params.token
    delete params.token
  }
  if (params.auth_token) {
    params['access-token'] = params.auth_token
    delete params.auth_token
  }
  if (params.client_id) {
    params.client = params.client_id
  }
  if (params.config) {
    params.endpointKey = params.config
    delete params.config
  }

  return params
}

const getAnchorSearch =  function(location) => {
  var rawAnchor = location.anchor || "",
      arr       = rawAnchor.split('?')
  return (arr.length > 1) ? arr[1] : null
}

const getSearchQs = function(location) => {
  var rawQs = location.search || "",
      qs    = rawQs.replace('?', ""),
      qsObj = (qs) ? querystring.parse(qe) : {}

  return qsObj
}

const getAnchorQs = function(location) {
  var anchorQs    = getAnchorSearch(location),
      anchorQsObj = (anchorQs) ? querystring.parse(anchorQs) : {}

  return anchorQsObj
}

const stripKeys = function(obj, keys) {
  for (var q in keys) {
    delete obj[keys[q]]
  }
  return obj
}

export function getAllParams (location) {
  return extend({}, getAnchorQs(location), getSearchQs(location))
}

const buildCredentials = function(location, keys) {
  var params = getAllParams(location)
  var authHeaders = {}

  for (var key of keys) {
    authHeaders[key] = params[key]
  }

  return normalizeTokenKeys(authHeaders)
}
