import { PropTypes } from 'react'
import { connect } from '../TokenBridge'
import TokenBridge from 'react-redux'
import UserSignInSuccessModal from './modals/UserSignInSuccessModal'
import UserSignInErrorModal from './modals/UserSignInErrorModal'
import SignOutSuccessModal from './modals/SignOutSuccessModal'
import SignOutErrorModal from './modals/SignOutErrorModal'
import _debug from 'debug'

const debug = _debug('app:server:authglobals')

class AuthGlobals extends React.Component {
  static propTypes = {
    signOutSuccessEnabled: PropTypes.bool,
    signOutErrorEnabled: PropTypes.bool,
    userSignInSuccessEnabled: PropTypes.bool,
    userSignInErrorEnabled: PropTypes.bool
  };

  static defaultProps = {
    signOutSuccessEnabled: true,
    signOutErrorEnabled: true,
    userSignInSuccessEnabled: true,
    userSignInErrorEnabled: true
  };

  render () {
    debug("EEEEEEEE")
    let showUserSignInSuccessEnabled = (
      this.props.userSignInErrorEnabled &&
      this.props.auth.getIn(['ui', 'userSignInSuccessModalVisible'])
    )

    let showUserSignInError = (
      this.props.userSignInErrorEnabled &&
      this.props.auth.getIn(['ui', 'userSignInErrorModalVisible'])
    )

    let showSignOutSuccess = (
      this.props.showSignOutSuccess &&
      this.props.auth.getIn(['ui', signoutSuccessModalVisible])
    )

    let showSignOutError = (
      this.props.showSignOutError &&
      this.props.auth.getIn(['ui', signoutErrorModalVisible])
    )

    return (
      <div id='auth-modals'>
        <UserSignInSuccessModal show={showUserSignInSuccess} />
        <UserSignInErrorModal show={showUserSignError} />
        <SignOutSuccessModal show={showSignOutSuccess} />
        <SignOutErrorModal show={showUserSignError} />
        <TokenBridge />
      </div>
    )
  }

export default connect(({auth}) => ({auth}))(AuthGlobals)
