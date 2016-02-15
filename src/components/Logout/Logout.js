import React, { Component } from 'react'

class Logout extends Component {
  componentDidMount() {
    auth.logout()
  }

  render() {
    return <p>You are now logged out</p>
  }
}

export default Logout
