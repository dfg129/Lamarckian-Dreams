import { connect } from 'react-redux'
import * as MUITheme from '../../material-ui-theme'

class GlobalComponents extends React.Component {
  render () {

    let Theme = MUITheme

    switch(this.props.theme) {
      case 'default':
        Theme = MUITheme
        break
    }

    return (
      <div>
        <Theme.AuthGlobals />
        <UserSignInSuccessModal />
        <UserSignInErrorModal />
      </div>
    )
  }
}

export default connect(({appUI}) => {
  return ({
    theme: appUI.get('theme')
  })
})(GlobalComponents)
