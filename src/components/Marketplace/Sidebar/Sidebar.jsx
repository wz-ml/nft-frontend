import React from 'react';
// import {useState} from "react";

import './Sidebar.css'

const Sidebar = () => {


  const updateSidebar = async (evt) => {
    console.log(evt.target.innerText);
    document.querySelector(".active").classList.remove("active");
    document.querySelectorAll(".sidebar-item").forEach((header) => {
      if(header.attributes.value.nodeValue !== evt.target.innerText){
        return;
      }

      header.classList.add("active");
    });
  }

  return (
    <section className="sidebar">
      <ul className="sidebar-item active" value={"Status"}>
        <h3 className="sidebar-listheader" onClick={updateSidebar}>Status</h3>
        <div className="list-items-container">
          <li className="list-item">itema1</li>
          <li className="list-item">itema2</li>
        </div>
      </ul>
      <ul className="sidebar-item" value={"Price"}>
        <h3 className="sidebar-listheader" onClick={updateSidebar}>Price</h3>
        <div className="list-items-container">
          <li className="list-item">itemb1</li>
          <li className="list-item">itemb2</li>
        </div>
      </ul>
      <ul className="sidebar-item" value={"Categories"}>
        <h3 className="sidebar-listheader" onClick={updateSidebar}>Categories</h3>
        <div className="list-items-container">
          <li className="list-item">itemc1</li>
          <li className="list-item">itemc2</li>
        </div>
      </ul>
      <ul className="sidebar-item" value={"Charities"}>
        <h3 className="sidebar-listheader" onClick={updateSidebar}>Charities</h3>
        <div className="list-items-container">
          <li className="list-item">itemd1</li>
          <li className="list-item">itemd2</li>
        </div>
      </ul>
      <div className="sidebar-item social-media-container" value={"socials"}></div>
    </section>
  )
}

export default Sidebar
