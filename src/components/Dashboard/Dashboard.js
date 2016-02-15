import React, { Component } from 'react'


class Dashboard extends Component {


  requireAuth() {
    return true;
  }

  render() {
    return (
      <div>
        <h2> dashboard </h2>
      </div>
    )
  }
}

export default Dashboard
