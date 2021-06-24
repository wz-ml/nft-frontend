import React from 'react';
// import {useState} from "react";

import './Sidebar.css'

const Sidebar = () => {


  const updateSidebar = async (evt) => {
    console.log(evt.target.innerText);
  }

  return (
    <section className="sidebar">
      <p className="sidebar-item sidebar-listheader" onClick={updateSidebar}>Status</p>
      <p className="sidebar-item sidebar-listheader" onClick={updateSidebar}>Price</p>
      <p className="sidebar-item sidebar-listheader" onClick={updateSidebar}>Categories</p>
      <p className="sidebar-item sidebar-listheader" onClick={updateSidebar}>Charities</p>
      <div className="sidebar-item social-media-container"></div>
    </section>
  )
}

export default Sidebar
