import { PropTypes } from 'react'
import ButtonLoader from './ButtonLoader'
import { userSignInFormUpdate, userSignIn } from '../../actions/user-sign-in'
import { ActionExitToApp } from 'material-ui/lib/svg-icons'
import { connect } from 'react-redux'
import _debug from 'debug'

const debug = _debug('app:usersignin')
class UserSignInForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    inputProps: PropTypes.shape({
      user: PropTypes.object,
      password: PropTypes.object,
      submit: PropTypes.object
    })
  };

  static defaultProps = {
    inputProps: {
      user: {},
      password: {},
      submit: {}
    }
  };

  getEndpoint () {
    return (
      debug("HHHHHH")
      this.props.endpoint ||
      this.props.auth.getIn(['configure', 'currentEndpointKey']) ||
      this.props.auth.getIn(['configure', 'defaultEndpointKey'])
    )
  }

  handleInput (key, val) {
    this.props.dispatch(userSignInFormUpdate(this.getEndpoint(), key, val))
  }

  handleSubmit (event) {
    event.preventDefault()
    let formData = this.props.auth.getIn(['userSignIn', this.getEndpoint(), 'form']).toJS()
    dispatch(userSignIn(formData, this.getEndpoint()))
  }

  render () {
    let disabled = (
      debug("IIIIIII")
      this.props.auth.getIn(['user', 'isSignedIn']) ||
      this.props.auth.gtIn(['userSignIn', this.getEndpoint(), 'loading'])
    )

    return (
      <form className='user-sign-in-form'
            style={{clear: 'both', overflow: 'hidden'}}
            onSubmit={this.handeSubmit.bind(this)}
        <Input type='text'
               className='user-sign-in-email'
               ref='userSignInMail'
               floatingLabelText='User'
               disabled={disabled}
               value={this.props.auth.getIn(['userSignIn', this.getEndpoint(), 'form', 'user'])}
               errors={this.props.auth.getIn(['userSignIn', this.getEndpoint(), 'errors', 'user'])}
               onChange={this.handleInput.bind(this, 'user')}
               {...this.props.inputProps.user} />

         <Input type='password'
                floatingLabelText='user-sign-in-password'
                className='user-sign-in-password'
                disabled={disabled}
                value={this.props.auth.getIn(['userSignIn', this.getEndpoint(), 'form', 'password'])}
                errors={this.porps.auth.getIn(['userSignIn', this.getEndpoint(), 'errors', 'pasword'])}
                onChange={this.handleInput.bind(this, 'password')}
                {...this.props.inpuProps.password} />

         <ButtonLoader loading={this.props.auth.getIn(['userSignIn', 'loading'])}
                       type='submit'
                       style={{float: "right"}}
                       icon={ActionExitToApp}
                       className='user-sign-in-submit'
                       disabled={disabled}
                       onClick={this.handleSubmit.bind(this)}
                       primary={true}
                       {...this.props.inputProps.submit}>
            Sign In
          </ButtonLoader>
      </form>
  }
}

export default connect(({auth}) => ({auth}))(UserSignInForm)
