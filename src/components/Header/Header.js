import React, { Component } from 'react';
mport CSSModules from 'react-css-modules';
import styles from './../../styles/header.styl'

@CSSModules(styles)
class Header extends Component {

  render() {
    return (
      <div className="Header">
        <div className="container">
          <a className="brand" href="/"/>
        </div>
      </div>
    )
  }
}
