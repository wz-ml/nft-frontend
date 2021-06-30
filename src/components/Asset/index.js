/**
 * @author Ethan Sengsavang
 *
 * @version 2021.06.28 - Base development
 * @since 2021.06.28
 */
import React from "react";
import {useEffect, useState} from "react";
import fetch from "node-fetch";
import {toUnitAmount} from "../../constants.js";

import { OrderSide } from 'opensea-js/lib/types';
import detectEthereumProvider from '@metamask/detect-provider';
import { OpenSeaPort, Network } from 'opensea-js';
import { getCookie } from '../../constants';

var charityAddrs = {
  "Charity 1 (Tony Address)": "0x11f408335E4B70459dF69390ab8948fcD51004D0",
  "Charity 2 (Rui Address)": "0x6926f20dD0e6cf785052705bB39c91816a753D23",
  "Charity 3 (Ethan Address)": "0x1437B4031f2b6c3a6d1D5F68502407283c3fAE31",
}

const Asset = () => {
  const API_URL = "https://rinkeby-api.opensea.io/api/v1";

  const [tokenName, setTokenName] = useState("");
  const [tokenCollection, setTokenCollection] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [schemaName, setSchemaName] = useState("");
  const [tokenOwnerId, setTokenOwnerId] = useState("");

  const [chosenCharity, setChosenCharity] = useState("");

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
    setTokenOwnerId(tokenData.owner.address);
    console.log(tokenData);
    console.log(toUnitAmount(tokenData.orders[0].base_price, tokenData.asset_contract));
  }


  function renderBuyToggle(){
    return(
      <button type="button" onClick={() => makeBuyOrder()}>Buy</button>
    );
  }

  function renderSellToggle(){
    return(
      <button type="button" onClick={() => makeSellOrder()}> Sell</button>
    );
  }

  function updateChosenCharity(evt){
    setChosenCharity(evt.target.value);
    // now the address of the charity can be retrieved via charityAddrs[chosenCharity];
  }

  function createCharityRadio(charityName){
    return(
      <div className="charitySelect" key={charityName}>
        <input type="radio" value={charityName} id={charityName}
          name="chosenCharity" onChange={updateChosenCharity}/>
        <label for={charityName}>{charityName}</label>
      </div>
    );
  }

  function renderDonateToggle(){
    let charities = [];
    let counter = 0;

    for(let charity in charityAddrs){
      charities.push(createCharityRadio(charity));
    }

    return(
      <div className="donateContainer">
        <button onClick={() => makeTransfer()}>Donate</button>
        <form className="charitySelection">
          {charities}
        </form>
      </div>
    );
  }

  async function makeSellOrder(){

    const seaport = await getOpenSeaPort()
 
    let urlParts = window.location.pathname.split('/');
    const [tokenAddress, tokenId] = urlParts.splice(-2); //fetch token address + token ID from URL

    let userInfo = JSON.parse(getCookie("uid"));
    const accountAddress = userInfo["walletAddress"];

    const listing = await seaport.createSellOrder({
    asset: {
      tokenId,
      tokenAddress
    },
    accountAddress,
    startAmount: 0.5})
  }

  async function makeBuyOrder(){

    const seaport = await getOpenSeaPort()

    let userInfo = JSON.parse(getCookie("uid"));
    const accountAddress = userInfo["walletAddress"];

    let urlParts = window.location.pathname.split('/');
    const [asset_contract_address, token_id] = urlParts.splice(-2); //fetch token address + token ID from URL

    const order = await seaport.api.getOrder({
      side: OrderSide.Sell,
      asset_contract_address,
      token_id,
        });
    
    const transactionHash = await seaport.fulfillOrder({order, accountAddress});
  }

  async function makeTransfer(){

    const seaport = await getOpenSeaPort();

    let userInfo = JSON.parse(getCookie("uid"));
    const fromAddress = userInfo["walletAddress"];

    let urlParts = window.location.pathname.split('/');
    const [tokenAddress, tokenId] = urlParts.splice(-2); //fetch token address + token ID from URL

    const transactionHash = await seaport.transfer({
      asset: {
        tokenId,
        tokenAddress,
        // schemaName: "ERC1155" !!!! //see integrating the functions.md for context 
      },
      fromAddress, //your address (you must own the asset)
      toAddress: charityAddrs[chosenCharity]
    })

  }

  function renderToggles(){

    let userInfo = JSON.parse(getCookie("uid"));
    const userAddress = userInfo["walletAddress"];
    var isOwner = false;

    if (userAddress === tokenOwnerId){
      isOwner = true;
    }

    if(isOwner){
      return (
        <div className="AssetButtonContainer">
          {renderDonateToggle()}
          {renderSellToggle()}
        </div>
      );
    }

    return (
      <div className="AssetButtonContainer">
        {renderBuyToggle()}
      </div>
    );
  }

  async function getOpenSeaPort(){
    const provider = await detectEthereumProvider();
    return new OpenSeaPort(provider, {
      networkName: Network.Rinkeby
    });
  }

  return(
    <div className="AssetContainer">
      <h2>Asset page</h2>
      <h1>{tokenName}</h1>
      <p><i>{tokenCollection}</i></p>
      <p>Owned by: <a href="#">Tester</a></p>
      <img src={imgUrl} alt={"Asset Image"} />
      <div className="priceField">
        <p>Ξ 1.950</p>
        <p><i>$434.88 USD</i></p>
      </div>
      {renderToggles()}
    </div>
  );
}

export default Asset;
