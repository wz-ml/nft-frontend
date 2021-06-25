import React from 'react';
import { Navbar } from '../../common';
import { SearchFilter } from '../../common';
import './bcharity_logo.png';
import './Header.css';

function Header(){

    /*
    const updateSidebar = async (event) => {
        console.log(event.target.innerText);
        document.querySelector(".active").classList.remove("active");
        document.querySelectorAll(".sidebar-")

    }
    */

    return (        
        <section className = "header">
            <section className = "header-top__logo">
                <img src="./bcharity_logo.png"alt="bcharity_logo"></img>
            </section>
            <section className = "header-top__BCHARITY">
                BCHARITY
            </section>
            <section className = "header-top__navbar">
                <Navbar />
            </section>
            <section classNme = "header-top__search">
                <SearchFilter />
            </section>
        </section>
    )
}

export default Header;
