import React from 'react'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import _debug from 'debug'

const debug = _debug('app:view:menu-item')

class MenuItem extends React.Component {
  render () {

    var style = {
      maxWidth: '100%',
      width: '15%',
      height: '10vh',
      marginLeft: '20px',
      backgroundColor: 'lightblue'
    }

    return (
      <div style={style}>
        {this.props.children}
      </div>
    )
  }
}

export default MenuItem
