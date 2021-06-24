import React from 'react';
// import {useState} from "react";

import './Sidebar.css'

const Sidebar = () => {


  const updateSidebar = async (evt) => {
    console.log(evt.target.innerText);
  }

  return (
    <section className="sidebar">
      <ul className="sidebar-item">
        <h3 className="sidebar-listheader" onClick={updateSidebar}>Status</h3>
      </ul>
      <ul className="sidebar-item">
        <h3 className="sidebar-listheader" onClick={updateSidebar}>Price</h3>
      </ul>
      <ul className="sidebar-item">
        <h3 className="sidebar-listheader" onClick={updateSidebar}>Categories</h3>
      </ul>
      <ul className="sidebar-item">
        <h3 className="sidebar-listheader" onClick={updateSidebar}>Charities</h3>
      </ul>
      <div className="sidebar-item social-media-container"></div>
    </section>
  )
}

export default Sidebar
