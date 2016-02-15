import React from 'react';
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import http from './core/HttpClient'
import App from './components/App/App.js'
import Login from './components/Login/Login.js'
import Logout from './components/Logout/Logout.js'
import About from './components/About/About.js'
import Dashboard from './components/Dashboard/Dashboard.js'



const router = render((
  <Router>
    <Route path="/" component={App} >
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="about" component={About} />
      <Route path="dashboard" component={Dashboard} onEnter={Dashboard.requireAuth} />
    </Route>
  </Router>
), document.body)

export default router;
