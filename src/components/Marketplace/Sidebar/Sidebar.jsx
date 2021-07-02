import React from 'react';
import {Reddit} from "react-bootstrap-icons";
// import {useState} from "react";

import './Sidebar.css'

const Sidebar = () => {

  /**
   * Updates the sidebar with the most recently selected list header.
   * This function is called on the click event for any sidebar-listheader element.
   *
   * This will deactivate the current "active"/opened list and activate the
   * sidebar item of the same value.
   *
   * @param evt The onClick event argument.
   */
  const updateSidebar = async (evt) => {
    console.log(evt.target.innerText);
    document.querySelector(".sidebar-active").classList.remove("sidebar-active");
    document.querySelectorAll(".sidebar-item").forEach((header) => {
      if(header.attributes.value.nodeValue !== evt.target.innerText){
        return;
      }

      header.classList.add("sidebar-active");
    });
  }

  return (
    <section className="sidebar">
      <div className="sidebar-item-container">
        <ul className="sidebar-item sidebar-active" value={"Status"}>
          <h3 className="sidebar-listheader" onClick={updateSidebar}>Status</h3>
          <div className="list-items-container">
            <li className="list-item">Buy Now</li>
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
      </div>
      <div className="sidebar-item social-media-container" value={"socials"}>
        <a href={"https://www.reddit.com/r/BCharity/"} className="social-media-link">
          <Reddit />
        </a>
      </div>
    </section>
  )
}

export default Sidebar
