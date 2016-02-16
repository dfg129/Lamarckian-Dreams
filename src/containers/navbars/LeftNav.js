import React from 'react'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as actionCreators from '../../actions/app-bar'
import _debug from 'debug'

const debug = _debug('app:view:left-nav')

class LeftNav extends React.Component {
  render () {
    const open = this.props.open ? true : "none"

    var style = {
      maxWidth: '100%',
      width: '100%',
      height: '20vh',
      display: open
    }
debug(this.props.children)
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
) (LeftNav)
