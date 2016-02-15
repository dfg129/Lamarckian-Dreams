
import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/lib/app-bar'
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as actionCreators from '../../actions/app-bar'
import MenuItem from 'material-ui/lib/menus/menu-item'
import header_img from '../../../assets/images/ld1.png'
import _debug from 'debug'

const debug = _debug('app:view:header')

class Header extends React.Component {
  render () {
    debug(header_img)

    var style = {
      maxWidth: '100%',
      width: '100%',
      height: '20vh'
    }

    return (
      <div  onClick={this.props.toggleNavBar}>
        <img style={style} src={header_img}/>
      </div>
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
