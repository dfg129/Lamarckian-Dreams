
import React from 'react'
import { connect } from 'react-redux'
import LeftNav from '../navbars/LeftNav'
import MenuList from '../menus/MenuList'
import _debug from 'debug'

const debug = _debug('app:view:main')

class Main extends React.Component {


  render () {
  var data = [
    {id: 1, label: "Menu Item 1"},
    {id: 2, label: "Menu Item 2"}
  ];


  return (
       <LeftNav open={this.props.isOpen} style={{position:'relative'}}>
         <MenuList data={data}/>
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
