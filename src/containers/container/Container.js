import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import styles from './container.styl'
import _debug from 'debug'
import background_img from '../../../assets/images/background2.png'

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
    var style = {
      backgroundImage: 'url(' + background_img + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      maxWidth: '100%'
    }

    return (
      <div className="container">
        <div className="header">
          {this.getHeader()}
        </div>
        <div className="main" style={style}>
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
