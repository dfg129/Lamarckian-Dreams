import React, { Component, PropTypes } from 'react'
import ButtonLoader from 'ButtonLoader'
import Input from 'Input'
import { userSignIn } from 'user-sign-in'
import { Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import CSSModule from 'react-css-modules'
import styles from './login.styl'


CSSModule(styles)
class LoginForm extends Component {

  static propTypes = {
    endpoint: PropTypes.string,
    inputProps: PropTypes.shape({
      username: ProtoTypes.object,
      password: ProtpTypes.object,
      submit: ProtoTypes.object
    })
  }

  static defaultProps = {
    inputProps: {
      username: {},
      password: {},
      submit: {}
    }
  }

  getEndpoint () => {
    return (
      debug("BBBBBBBB")
      this.props.endpoint ||
      this.props.auth.getIn(["configure", "currentEndpointKey"]) ||
      this.props.auth.getIn(["configure", "defaultEndpointKey"])
    )
  }

  handleInput (key, val) {
    this.props.dispatch(userSignInFormUpdate(this.getEndpoint(), key, val))
  }

  handleSubmit = (event) => {
    event.preventDefault()

    let formData = this.props.auth.getIn(["userSignIn", this.getEndpoint(), "form"]).toJs()
    this.props.dispatch(userSignIn(formData, this.getEndpoint()))
  }

  render() {
    let disabled = (
      debug("CCCCCCCC")
      this.props.auth.getIn(["user", "isSignedIn"]) ||
      this.props.auth.getIn(["userSignIn", this.getEndpoint(), "loading"])
    )
   debug("DDDDDDDDD")
    return (
      <form className='redux-auth user-sign-in-form'
        style={{clear: "both", overflow: "hidden"}}
        onSubmit={this.handleSubmit.bind(this)}>

        <Input type="text"
          className="user-sign-in"
          ref="userSignIn"
          floatingLableText="UserName"
          disabled={disabled}
          value={this.props.auth.getIn(["userSignIn", this.getEndpoint(), "form", "username"])}
          errors={this.props.auth.getIn(["userSignIn", this.getEndpoint(), "errors", "username"])}
          onChange={this.handleInput.bind(this, "username")}
          {...this.props.inputProps.username}
          />

        <Input type="password"
          floatingLabelText="Password"
          className="user-sign-in-password"
          disabled={disabled}
          value={this.props.auth.getIn(["userSignIn", this.getEndpoint(), "form", "password"])}
          errors={this.props.auth.getIn(["userSign", this.getEndpoint(), "errors", "password"])}
          onChange={this.handleInput.bind(this, "password")}
          {...this.props.inputProps.password}
          />

        <ButtonLoader loading={this.props.auth.getIn(["userSignIn", "loading"])}
                      type="submit"
                      style={{float: "right"}}
                      icon={ActionExitToApp}
                      className={disabled}
                      onClick={this.handleSubmit.bind(this)}
                      primary={true}
                      {...this.props.inputProps.submit}>
                      Sign In
        </ButtonLoader>
      </form>
      )
    }
  }

  export default connect(({auth}) => ({auth}))(LoginForm)
