/**
 * @author Ethan Sengsavang
 *
 * @version 2021.06.28 - Base development
 * @since 2021.06.28
 */
import React from "react";
import {useEffect, useState} from "react";
import fetch from "node-fetch";

import detectEthereumProvider from '@metamask/detect-provider';
import { OpenSeaPort, Network } from 'opensea-js';
import { getCurrentWalletConnected } from "../SignIn/interact";

var isOwner = true; // this is here for testing

const Asset = () => {
  const API_URL = "https://rinkeby-api.opensea.io/api/v1";

  const [tokenName, setTokenName] = useState("");
  const [tokenCollection, setTokenCollection] = useState("");
  const [imgUrl, setImgUrl] = useState("");

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
    console.log(tokenData);
  }

  function renderBuyButton(){
    return(
      <button>Buy</button>
    );
  }

  function renderSellButton(){
    return(
      <button onClick={() => makeSellOrder()}> Sell</button>
    );
  }

  function renderDonateButton(){
    return(
      <button>Donate</button>
    );
  }

  async function makeSellOrder(){

    const provider = await detectEthereumProvider();
    const seaport = new OpenSeaPort(provider, {networkName: Network.Rinkeby});

    console.log("TEST");

    let urlParts = window.location.pathname.split('/');
    const [tokenAddress, tokenID] = urlParts.splice(-2); //fetch token address + token ID

    const obj = await getCurrentWalletConnected();
    const accountAddress = obj.address; //fetch account address using getCurrentWalletConnected() from SignIn index.js

    const listing = await seaport.createSellOrder({
    
    asset: {
      tokenID,
      tokenAddress,
    },
    accountAddress,
    startAmount: 0.5})
  }


  return(
    <div className="AssetContainer">
      <h2>Asset page</h2>
      <h1>{tokenName}</h1>
      <p><i>{tokenCollection}</i></p>
      <img src={imgUrl} alt={"Asset Image"} />
      <div className="AssetButtonContainer">
        {
          isOwner ?
          [
            renderDonateButton(),
            renderSellButton()
          ]:
            renderBuyButton()
        }
      </div>
    </div>
  );
}



export default Asset;
