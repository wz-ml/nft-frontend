import React from 'react';
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
            <div className = "navbar_bcharity">
                BCHARITY
            </div>
            <div className = "navbar-item-container">
                <div className="navbar-item navbar-active" onClick={updateNavbar}>Home</div>
                <div className="navbar-item" onClick={updateNavbar}>Marketplace</div>
                <div className="navbar-item" onClick={updateNavbar}>Resources</div>
            </div>
            <div className = "navbar_search">
                <input type="text" placeholder="Search..." />
            </div>
        </section>
    )

    /*
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
    )*/
}

export default Header;
