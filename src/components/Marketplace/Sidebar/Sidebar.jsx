import React from 'react';

import './Sidebar.css'

export default class Sidebar extends React.Component{

  state = {}
  
  selectListHeader = function(){
    console.log("clicked:");
  }

  render(){
    return (
      <section className="sidebar">
        <p className="sidebar-item sidebar-listheader" onClick={this.selectListHeader("Status")}>Status</p>
        <p className="sidebar-item sidebar-listheader" onClick={this.selectListHeader("Status")}>Price</p>
        <p className="sidebar-item sidebar-listheader" onClick={this.selectListHeader("Status")}>Categories</p>
        <p className="sidebar-item sidebar-listheader" onClick={this.selectListHeader("Status")}>Charities</p>
        <div className="sidebar-item social-media-container"></div>
    </section>
    )
  }
}

