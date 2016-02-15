
import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/lib/app-bar'
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as actionCreators from '../../actions/app-bar'
import MenuItem from 'material-ui/lib/menus/menu-item'
import _debug from 'debug'

const debug = _debug('app:view:header')

class Header extends React.Component {
  render () {
    debug(this.props)
    return (
        <AppBar className="main-nav" title={this.props.title} onClick={this.props.toggleNavBar}>
        </AppBar>
    )
  }
}

function mapStateToProps ({appBar}) {
  return {
    isOpen: appBar.get('isOpen')
  }
}

export default connect(
  mapStateToProps,
  actionCreators
) (Header)
