
import React from 'react'
import { connect } from 'react-redux'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import _debug from 'debug'

const debug = _debug('app:view:main')

class Main extends React.Component {


  render () {

  return (
       <LeftNav open={this.props.isOpen} style={{position:'relative'}}>
         <MenuItem> Menu One </MenuItem>
         <MenuItem> Menu Two </MenuItem>
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
