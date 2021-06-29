/**
 * @author Jinhao Li
 * 
 * @version 2021.06.28 - Base development
 * @since 2021.06.28
 */


import React from 'react'

function Home() {
    return (
        <section className='homepage'>
            <h1>Discover, collect, and sell extradinary NFTs</h1>
            <div className='button-container'>
                <button className='button-list'>Explore</button>
                <button className='button-list'>Create</button>
            </div>
            <h4>Get featured on the homepage</h4>
            <div className='create-container'>
                <li className='create-item'>
                    <h4>Set up your wallet</h4>
                    <p>We only support MetaMask wallet at the moment</p>
                </li>
                <li className='create-item'>
                    <h4>Create your collection</h4>
                    <p>Click create and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.</p>
                </li>
                <li className='create-item'>
                    <h4>Add your NFTs</h4>
                    <p>Upload your work(image, video, audio, or 3D art), add a title and description, 
                        and customize your NFTs with properties, stats, and unlockable content.
                    </p>
                </li>
                <li className='create-item'>
                    <h4>List them for sale</h4>
                    <p>Choose between auctions, fixed-price listings, and declining-price listings. 
                        You choose how you want to sell or donate your NFTs, and we help you to do that.
                    </p>
                </li>
            </div>
            <div className='browse-by-category-container'>
                <h2>Browse by category</h2>
                <li className='categories'>
                    <h3>Art</h3>
                    <p>Discover the world's top crypto artists</p>
                    <button className='categoryBtn'>Explore Art</button>
                </li>
                <li className='categories'>
                    <h3>Music</h3>
                    <p>Discover the world's top crypto mustic</p>
                    <button className='categoryBtn'>Explore Music</button>
                </li>
                <li className='categories'>
                    <h3>All NFTs</h3>
                    <p>Just want to explore, browse, and discover the endless possibilites of NFTs?
                        Browse all categories
                    </p>
                    <button className='categoryBtn'>Explore All NFTs</button>
                </li>
            </div>
        </section>
    )
}

export default Home
