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

import { OpenSeaPort, Network } from 'opensea-js';
import { getCookie, smartContract } from '../../constants';
import detectEthereumProvider from '@metamask/detect-provider';



function Sell(){

    const API_URL = "https://rinkeby-api.opensea.io/api/v1";

    const [tokenName, setTokenName] = useState("");
    const [tokenCollection, setTokenCollection] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [tokenOwnerId, setTokenOwnerId] = useState("");
    const [chosenCharity, setChosenCharity] = useState("");
    const [schemaName, setSchemaName] = useState("");
    const [tokenPrice, setTokenPrice] = useState(-1);
  
    /**
     * Uses React effects perform one-time actions.
     *
     * - Adds a load event listener to fetch the details of the connected NFT
     */
    useEffect(() => {
      window.addEventListener("load", getDetails);
    });
  
    /**
     * Gets the details of the connected NFT, found within the url.
     * A valid NFT collection address and tokenID are expected within
     * the url in the format: 
     * <code>https://(URL)/asset/(Collection Address)/(tokenID)</code>
     *
     * Will fetch the data needed from the opensea API and update the page.
     */
     async function getDetails(){
      let urlParts = window.location.pathname.split('/');
      const [collectionAddr, tokenID] = urlParts.splice(-2);
  
      fetch(`${API_URL}/asset/${collectionAddr}/${tokenID}`, {method: "GET"})
        .then((res) => res.json())
        .then((json) => updateDetails(json))
        .catch((err) => console.error(err));
    }
  
    /**
   * Updates the page with the new token details
   *
   * @param tokenData {Object} the parsed JSON object retrieved after fetching
   * details from the opensea API.
   */
    async function updateDetails(tokenData){
      setTokenName(tokenData.name)
      setTokenCollection(tokenData.collection.name);
      setImgUrl(tokenData.image_url);
      setSchemaName(tokenData.asset_contract.schema_name);
      setTokenOwnerId(tokenData.top_ownerships[0].owner.address);
  
      if(tokenData.orders.length > 0){
        setTokenPrice(tokenData.orders[0].base_price * Math.pow(10, -18));
      }
  
      console.log(tokenData);
    }

    const[data, setData] = useState(null)

    
    function changeData(val){
        setData(val.target.value);
    }

    async function makeSellOrder(){

        const seaport = await getOpenSeaPort()
     
        let urlParts = window.location.pathname.split('/');
        const [tokenAddress, tokenId] = urlParts.splice(-2); //fetch token address + token ID from URL
    
        let userInfo = JSON.parse(getCookie("uid"));
        const accountAddress = userInfo["walletAddress"];
    
        let asset = {tokenId, tokenAddress};
        // if (schemaName === "ERC1155") {asset["schemaName"] = "ERC1155"};
    
        const listing = await seaport.createSellOrder({
        asset,
        accountAddress,
        startAmount: getSalePrice()})
    
    }

    async function makeDescendingAuction() {
        const seaport = await getOpenSeaPort()

        let urlParts = window.location.pathname.split('/');
        const [tokenAddress, tokenId] = urlParts.splice(-2); //fetch token address + token ID from URL

        let userInfo = JSON.parse(getCookie("uid"));
        const accountAddress = userInfo["walletAddress"];

        let asset = { tokenId, tokenAddress };

        const dutchAuctionSellOrder = await seaport.createSellOrder({
            asset,
            accountAddress,
            startAmount: getSalePrice(),
            endAmount: getEndPrice(),
            expirationTime: getExpirationTime(),
        });
    }

    async function makeAscendingAuction() {
        const seaport = await getOpenSeaPort()

        let urlParts = window.location.pathname.split('/');
        const [tokenAddress, tokenId] = urlParts.splice(-2); //fetch token address + token ID from URL

        let userInfo = JSON.parse(getCookie("uid"));
        const accountAddress = userInfo["walletAddress"];

        let asset = { tokenId, tokenAddress };

        const EnglishAuctionSellOrder = await seaport.createSellOrder({
            asset,
            accountAddress,
            paymentTokenAddress: getPaymentToken(),
            startAmount: getSalePrice(),
            waitForHighestBid: true,
            expirationTime: getExpirationTime(),
        });
    }

    async function getOpenSeaPort(){
        const provider = await detectEthereumProvider();
        return new OpenSeaPort(provider, {
            networkName: Network.Rinkeby
        });
    }
    
    function getSalePrice(){
        //return Number(document.getElementById("salePrice").value);
    }

    function getExpirationTime() {
        //return Number(Math.round(new Date(document.getElementById("expirationTime").value).getTime() / 1000));
    }

    function getEndPrice() {
        //return Number(document.getElementById("endPrice").value);
    }

    function getPaymentToken() {
        //Currently only returns weth's Address depending on whether the network is on mainnet or Rinkeby.  
        const wethAddress =
            NETWORK === "mainnet" || NETWORK === "live"
                ? "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
                : "0xc778417e063141139fce010982780140aa0cd5ab";
        return wethAddress;
    }

    return (
        <section className='sellPage'>
                <div className="sellTokenInfo">
                    <h1 className="sellTokenName">{tokenName}</h1>
                    <p className="sellTokenCollection"><i>{tokenCollection}</i></p>
                    <img src={imgUrl} alt={"Asset Image"} className="SellImage"/>
                </div>        
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
                            <p className='price-description'>Will be on sale until you transfer this item or cancel it.</p>
                        </div>
                        <div className='set-sell-price-right'>
                            <input type="number" placeholder="Amount" id="salePrice" onChange={changeData} />
                        </div>
                    </div>
                </div>
                <div className='sellpage-top-summary'>
                    <h1 className='summary'>Summary</h1>
                    <hr />
                    <div className='listing-section'>
                        <h3 className='listing'>Listing</h3>
                        <p className='listing-description'>Your item will be listed for {data}</p>
                        <button className='post-button' onClick={() => makeSellOrder()}>Post your listing</button>
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
