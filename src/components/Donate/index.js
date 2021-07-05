import React from "react";
import {useEffect, useState} from "react";
import "./index.css";

import detectEthereumProvider from '@metamask/detect-provider';
import { OpenSeaPort, Network } from 'opensea-js';
import { getCookie } from '../../constants';
import { func } from "prop-types";



let charityAddrs = {
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


  async function getDetails(){
    let urlParts = window.location.pathname.split('/');
    const [collectionAddr, tokenID] = urlParts.splice(-2);

    fetch(`${API_URL}/asset/${collectionAddr}/${tokenID}`, {method: "GET"})
      .then((res) => res.json())
      .then((json) => updateDetails(json))
      .catch((err) => console.error(err));
  }

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