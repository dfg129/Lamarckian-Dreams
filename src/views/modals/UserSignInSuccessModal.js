import { connect } from 'react-redux'
import { hideUserSignInSuccessModal } from '../../actions/ui'
import Modal from './Modal'

class UserSignInErrorModal extends React.Component {
  render () {
    return (
      <Modal
        show={this.props.show}
        containerClass='user-sign-in-success-modal'
        closeAction={hideUserSignInSuccessModal}
        closeBtnLabel="Close"
        title="Welcome Back">
        <p>You are now signed in as {this.props.auth.getIn(['user', 'attributes', 'email'])}.</p>
      </Modal>
    )
  }
}

export default connect(({auth}) => ({auth}))(UserSignInSuccessModal)
