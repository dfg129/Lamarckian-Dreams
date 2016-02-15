import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'
import * as A from '../actions/user-sign-in'
import { SET_ENDPOINT_KEYS } from "../actions/configure"
import _debug from 'debug'

const debug = _debug('app:createReducer')

const initialState = {
  loading: false,
  errors: null,
  form: {}
};

export default createReducer(Immutable.fromJS({}), {

  [SET_ENDPOINT_KEYS]: (state, {endpoints}) => state.merge(endpoints.reduce((coll, k) => {
    debug("Initial endpoint settings")
    coll[k] = Immutable.fromJS(initialState)
    return coll
  }, {})),

  [A.USER_SIGN_IN_START]: (state, {endpoint}) => state.setIn([endpoint, "loading"], true),

  [A.USER_SIGN_IN_COMPLETE]: (state, {endpoint}) => state.merge({[endpoint]: initialState}),

  [A.USER_SIGN_IN_ERROR]: (state, {endpoint}) => state.mergeDeep({
    [endpoint]: {
      loading: false,
      errors
    }
  }),

  [A.USER_SIGN_IN_FORM_UPDATE]: (state, {endpoint, key, value}) => {
    return state.mergeDeep({
      [endpoint]: {
        form: {
          [key]: value
        }
      }
    })
  }

})
