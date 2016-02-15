import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import styles from './container.styl'
import _debug from 'debug'

const debug = _debug("app:views:container")


class Container extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  getHeader () {
    return React.Children.map(this.props.header, child =>
      React.cloneElement(child, {
        title: this.props.title
      })
     )
  }

  render () {
    return (
      <div className="container">
        <div className="header">
          {this.getHeader()}
        </div>
        <div className="main">
          {this.props.main}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    isOpen: state.isOpen
  }
}

export default connect(
  mapStateToProps
) (Container)
