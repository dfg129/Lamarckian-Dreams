import React from 'react'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as actionCreators from '../../actions/app-bar'
import _debug from 'debug'

const debug = _debug('app:view:menu-item')

class MenuItem extends React.Component {
  render () {

    var style = {
      maxWidth: '100%',
      width: '100%',
      height: '20vh',
      backgroundColor: 'blue'
    }

    return (
      <div style={style}>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps ({appBar}) {
  return {

  }
}

export default connect(
  mapStateToProps,
  actionCreators
) (MenuItem)
