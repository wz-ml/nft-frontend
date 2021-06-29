import React from 'react';
import './bcharity_logo.png';
import './Header.css';

function Header(){
    const updateNavbar = async (event) => {
        console.log(event.target.innerText);
        document.querySelector(".active").classList.remove("active");
        document.querySelectorAll(".navbar-item").forEach((item) => {
            if(item.attributes.value.nodeValue !== event.target.innerText){
                return;
            }
            item.classList.add("active");
        })
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
                <a href="/status" className="navbar-item active" onClick={updateNavbar}>Status</a>
                <a href="/resources" className="navbar-item active" onClick={updateNavbar}>Marketplace</a>
                <a href="/market" className="navbar-item active" onClick={updateNavbar}>Resources</a>
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
