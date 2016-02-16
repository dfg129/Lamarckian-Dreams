
import React from 'react'
import { connect } from 'react-redux'
import LeftNav from '../navbars/LeftNav'
import MenuItem from '../menus/MenuItem'
import _debug from 'debug'

const debug = _debug('app:view:main')

class Main extends React.Component {


  render () {
  debug("isOpen : " + this.props.isOpen)
  return (
       <LeftNav open={this.props.isOpen} style={{position:'relative'}}>
         <MenuItem> Menu One </MenuItem>

       </LeftNav>
    )
  }
}

function mapStateToProps ({appBar}) {
  return {
    isOpen: appBar.get('isOpen')
  }
}
export default connect(
  mapStateToProps
)(Main)
