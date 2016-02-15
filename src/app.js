import React from 'react'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'
import { Route, IndexRoute } from 'react-router'
import { createStore, compose, applyMiddleware } from 'redux'
import { createHistory, createMemoryHistory } from 'history'
import { routerStateReducer, reduxReactRouter as clientRouter } from 'redux-router'
import { reduxReactRouter as serverRouter } from 'redux-router/server'
import { combineReducers  } from 'redux'
import userSignIn from './reducers/user-sign-in'
import appBar from './reducers/app-bar'
import thunk from 'redux-thunk';
import Container from './containers/container/Container'
import Main from './containers/main/Main'
import Header from './containers/header/Header'
import SignIn from './views/SignIn'
import { configure } from './actions/configure'
import _debug from 'debug'

const debug = _debug('app:debug')

class App extends React.Component {
  render() {
    debug(this.props.header)
    return (
      <Container title="Lamarckian Dreams" className="container" {...this.props}>

      </Container>
    )
  }
}

export function initialize(ctx) {

  var reducer = combineReducers({
    appBar: appBar,
    router: routerStateReducer
  })

  var store;

  var routes = (
    <Route path='/' component={App}>
      <IndexRoute components={{header: Header, main: Main}} />
      <Route path='login' component={SignIn} />
      <Route path='main' components={{header: Header, main: Main}} />
    </Route>
  )

  var reduxReactRouter = clientRouter
  var createHistoryMethod = createHistory

  store = compose(
    applyMiddleware(thunk),
    reduxReactRouter({
      createHistory: createHistoryMethod,
      routes
    })
  )(createStore)(reducer)


  return (
    Promise.resolve()


    .then(() => {
        return ({
          provider: (
            <Provider store={store} key='provider'>
              <ReduxRouter children={routes} />
            </Provider>
          )
        })
      }
    )
  )
}
