
import { checkHttpStatus, parseJSON } from './../../utils/utils.js';
import { pushState } from 'redux-router';
import jwtDecode from 'jwt-decode';
import { LOGIN_USER_REQUEST, LOGIN_USER_FAILURE } from './../../constants.js'



const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST
  }
}

const loginUserFailure = (error) => {
  localStorage.removeItem('token')
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

const login = (username, password, redirect="/") => {
  return function(dispatch) {
    dispatch(loginUserRequest())
    return fetch('http://localhost:3000/auth/getToken/', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'applicaton/json'
      },
      body: JSON.stringify({username: username, password: password})
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      try {
        let decoded = jwtDecode(response.token)
        dispatch(loginUserSuccsee(response.token))
        dispatch(pushState(null, redirect))
      } catch(e) {
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid Token'
          }
        }))
      }
    })
    .error(error => {
      dispatch(loginUserFailure(error))
    })
  }
}

const loggedIn = () => {
    return false;
  }

const onChange = () => {

}

export { loginUserRequest, loginUserFailure, login, loggedIn, onChange }
