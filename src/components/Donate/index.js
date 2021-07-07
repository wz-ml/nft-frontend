/**
 * @author Stuart Chen
 * 
 * @version 2021.07.07 - Connection to asset page
 * 
 * 2021.07.03 - Base development
 * 
 * @since 2021.07.03
 */

import React from "react";
import {useEffect, useState} from "react";
import fetch from "node-fetch";

import { OrderSide } from 'opensea-js/lib/types';
import detectEthereumProvider from '@metamask/detect-provider';
import { OpenSeaPort, Network } from 'opensea-js';
import { getCookie } from '../../constants';

var charityAddrs = {
    "Charity 1 (Tony Address)": "0x11f408335E4B70459dF69390ab8948fcD51004D0",
    "Charity 2 (Rui Address)": "0x6926f20dD0e6cf785052705bB39c91816a753D23",
    "Charity 3 (Ethan Address)": "0x1437B4031f2b6c3a6d1D5F68502407283c3fAE31",
  }

const Donate = () => {

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


  function updateChosenCharity(evt){
    setChosenCharity(evt.target.value);
    // now the address of the charity can be retrieved via charityAddrs[chosenCharity];
  }

 function createCharityRadio(charityName) {
      return(
        <span className="charityRadio">
        <div key={charityName}>
          <span className="charityInput">
            <input className="charityNameInput" type="radio" value={charityName} id={charityName}
              name="chosenCharity" onChange={updateChosenCharity}/>
            <span className="charityInputControl"></span>
          </span> 
          <label htmlFor={charityName} className="charityName">{charityName}</label>
        </div>
        </span>  
      );
  }

  function renderDonateToggle(charityListObject){
    let charities = [];

    /* for (let counter = 0; counter < charityListObject.length; counter++) {
      charities.push(createCharityRadio(charityListObject[counter]));
    } */
    
     for (let charity in charityListObject) {
      charities.push(createCharityRadio(charity));
    } 

    return (
      <div className="donateContainer">
        <button className="button" onClick={() => makeTransfer()}>Donate</button>
        <form className="charitySelection">
          {charities}
        </form>
      </div>
    );
  }

  function renderDonateToggle(){
    const charities = Object.entries(charityAddrs);
    
    for (let charity in charities) {

        charities.push(createCharityRadio(charity));

    }

/*    const charities = Object.keys(charityAddrs);
    console.log(charities);
    charities.forEach((key, index) => {
        console.log(`${key}: ${charityAddrs[key]}`);
    });
    const charities = [];
    for (let charity in charityAddrs) {
        charities.push(createCharityRadio(charity));
        charities.push({charity: value.charity});
        charities.push(", ");
    } */



    return (
        <div className="donateContainer">
            <button className="button" onClick={() => makeTransfer()}>Donate</button>
            <form className="charitySelection">
              {charities}
            </form>
        </div>
    );
  }

  async function makeTransfer(){

    const seaport = await getOpenSeaPort();

    let userInfo = JSON.parse(getCookie("uid"));
    const fromAddress = userInfo["walletAddress"];

    let urlParts = window.location.pathname.split('/');
    const [tokenAddress, tokenId] = urlParts.splice(-2); //fetch token address + token ID from URL

    let asset = {tokenId, tokenAddress};
    if (schemaName === "ERC1155") {asset["schemaName"] = "ERC1155"};

    const transactionHash = await seaport.transfer({
        asset,
        fromAddress, //your address (you must own the asset)
        toAddress: charityAddrs[chosenCharity]
    })
  }

  async function getOpenSeaPort(){
    const provider = await detectEthereumProvider();
    return new OpenSeaPort(provider, {
        networkName: Network.Rinkeby
    });
  }

  function showDropdownContent() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


  return(
    <div>
      <h1>
        <br></br>
          Donate Your NFT Here!
      </h1>
      {/* {renderDonateToggle()} */}
      <h1 className="tokenName">{tokenName}</h1>
      <p className="tokenCollection"><i>{tokenCollection}</i></p>
      <img src={imgUrl} alt={"Asset Image"} className="AssetImage"/>
      {renderDonateToggle(charityAddrs)}
      <h3 className="charitySelect">Select your Charity:</h3>

      <div className="dropdown">
        <button className="dropbtn" onClick={showDropdownContent}>All Charities</button>
        <div className="dropdown-content" id="myDropdown">
          <a href="#">Charity 1</a>
          <a href="#">AVERYLONGCHARITYNAMEAVERYLONGCHARITYNAME</a>
          <a href="#">Charity 3</a>
        </div>
      </div>

      <div><br></br></div>

      <div className="donateButton">
          <button>
              DONATE 
          </button>
      </div>



    </div>
  );
};

export default Donate;
