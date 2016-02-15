import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import * as auth from '../Auth/auth.js';
import router from '../../routes.js';
import CSSModules from 'react-css-modules';
import styles from './app.styl';


CSSModules(styles)
class App extends Component {

  constructor(props) {
    super(props)

  }

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  }

  componentWillMount() {
    auth.onChange = this.updateAuth
    this.updateAuth(false)
//    auth.login()
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Sign In</Link>
            )}
          </li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/dashboard">Dashboard</Link> (authenticated) </li>
         </ul>
         {this.props.children}
      </div>
    )
  }
}

//router.render()

export default App;
