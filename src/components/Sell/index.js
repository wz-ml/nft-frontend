/**
 * @author Jinhao Li
 * 
 * @version 2021.06.30 - Base development
 * 
 * @since 2021.06.30
 */

import React from 'react'
import { useEffect, useState } from "react";
import './Sell.css'

function Sell(){

    const[data, setData] = useState(null)

    const button = document.querySelector('button')
    
    
    function changeData(val){
        setData(val.target.value);
    }

    return (
        <section className='sellPage'>
            <div className='sellpage-main'>
                <div className='sellpage-top-set-price'>
                    <h3 className='select-sell-methods'>Select your sell method</h3>
                    <br />
                    <div className='sell-methods'>
                        <div className='sell-methods-items'>
                            <h4>Set Price</h4>
                            <p>Sell at a fixed price</p>
                        </div>
                    </div>
                    <hr />
                    <div className='set-sell-price'>
                        <div className='set-sell-price-left'>
                            <h3 className='price'>Price</h3>
                            <p className='price-description'>Will be on sale untill you transfer this item or cancel it.</p>
                        </div>
                        <div className='set-sell-price-right'>
                            <input type="number" placeholder="Amount" onChange={changeData} />
                        </div>
                    </div>
                </div>
                <div className='sellpage-top-summary'>
                    <h1 className='summary'>Summary</h1>
                    <hr />
                    <div className='listing-section'>
                        <h3 className='listing'>Listing</h3>
                        <p className='listing-description'>Your item will be listed for {data}</p>
                        <button className='post-button'>Post your listing</button>
                    </div>
                    <hr />
                    <div className='fees-section'>
                        <h3 className="fees">Fees</h3>
                        <p className="fees-description">Listing is free! No fees are going to be deducted.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Sell
