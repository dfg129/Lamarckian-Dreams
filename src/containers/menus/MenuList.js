
import React from 'react'
import { connect } from 'react-redux'
import MenuItem from './MenuItem'
import _debug from 'debug'

const debug = _debug('app:view:menu-list')

class MenuList extends React.Component {


  render () {
    debug(this.props.data)
    var menuItems = this.props.data.map(function(item) {
      return (
        <MenuItem key={item.id}>
          {item.label}
        </MenuItem>
      )
    })

    return (
      <div>
        {menuItems}
      </div>
    )
  }
}

export default MenuList
