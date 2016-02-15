import React from 'react'
import { PageHeader } from 'react-bootstrap'
import { connect } from 'react-redux'

class SignIn extends React.Component {
  render () {
    return (
      <div>
        <PageHeader>Sign In First</PageHeader>
        <p>Unauthenticated users can't come in</p>
      </div>
    )
  }
}

export default connect(({routes}) => ({routes}))(SignIn)
