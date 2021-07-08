import React from 'react';
import { useState } from 'react';
import { ReactComponent as LoginIcon } from './login.svg';
import './bcharity_logo.png';
import './Header.css';

function Header(){
    const updateNavbar = async (evt) => {
        console.log(evt.target.innerText);
        document.querySelector(".navbar-active").classList.remove("navbar-active");
        document.querySelectorAll(".navbar-item").forEach((item) => {
            if(item.innerText !== evt.target.innerText){
                return;
            }
            item.classList.add("navbar-active");
        });
    }
    return (
        <section className = "navbar">
            <div className = "navbar_logo">
                <img src="./bcharity_logo.png"alt="bcharity_logo"></img>
            </div>
            <div className="navbar_bcharity">
                BCHARITY
            </div>
            <div className = "navbar-item-container">
                <div className="navbar-item navbar-active" onClick={updateNavbar}>Home</div>
                <div className="navbar-item" onClick={updateNavbar}>Marketplace</div>
                <div className="navbar-item" onClick={updateNavbar}>Resources</div>
             </div>
             <div className="navbar_search">
                 <input type="text" placeholder="Search..." />
             </div>
             <Login>
                 <Login_item icon={<LoginIcon />}>
                     <DropdownMenu />
                 </Login_item>
             </Login>
         </section>
     )
 }  

 function Login(props) {
    return (
        <div className="login-section">
            <ul className="login-div">{ props.children }</ul>
        </div>
    );
}

function Login_item(props){

    const [open, setOpen] = useState(false);

    return (
        <li className="login-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </li>
    )
}

function DropdownMenu(){

    function DropdownItem(props){
        return (
            <a href="#" className="menu-item">
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        );
    }

    return (
        <div className="dropdown">
            <DropdownItem>Sign In</DropdownItem>
            <DropdownItem>My NFTs</DropdownItem>
            <DropdownItem>Log off</DropdownItem>
        </div>
    )
}

export default Header;

