import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'
import * as A from '../actions/app-bar'
import _debug from 'debug'

const debug = _debug("app:reducer:app-bar")

const initialState = Immutable.fromJS({
  isOpen: false
})

export default createReducer(initialState, {

  [A.TOGGLE_NAV_BAR]: (state, {}) => {
    return state.set('isOpen', !state.get('isOpen'))
  }
})
