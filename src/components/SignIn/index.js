/**
 * @Stuart (person who created the file), (other people who developed this file)
 *
 * @version 2021.06.22.1 - adding the names of necessary functions
 * 2021.06.22.0 - file created
 * 
 * @since 2021.06.22.0
 */

/** constructor()
 * The constructor of the object
 * 
 * @param 
 *
 * @return Does not return anything
 */

/** renderSignInButton()
 * Renders the button that allows users to sign into the MetaMask wallet.
 * First: Check if MetaMask is available on browser or if a user is already
 * connected to the wallet. If not, MetaMask extension which allows user to 
 * sign in with their MetaMask account.
 * 
 * @param (parameter name) (Description of any parameter inputs)
 *
 * @return HTML
 */

import { string } from "prop-types";
import React from "react";
import { useEffect, useState } from "react";
import {
	//oursmartcontract
	connectWallet,
	updateMessage,
	loadCurrentMessage,
	getCurrentWalletConnected,
} from "./interact.js";

const SignIn = () => { // Change the name after
  //state variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("No connection to the network."); //default message
  const [newMessage, setNewMessage] = useState("");

  /*
  This is a React hook that is called after your compoent is rendered.
  Because it has an empty array [] prop passed into it, it will only
  be called on the component's first render.
  */
  useEffect(async () => {
  	const message = await loadCurrentMessage();
  	setMessage(message);
  	addSmartContractListener();

  	const { address, status } = await getCurrentWalletConnected();
  	setWallet(address)
  	setStatus(status);

  	addWalletListener();
  }, []);

  /*
  This function sets up a listener that will watch for the smart contract's
  updateMessages event and update the UI when the information is chaaned in 
  the smart contract
  */
  function addSmartContractListener(){
  	/*
  	ourSmartContract.events.updatedMessages({}, (error, data) => {
  		if (error){
  			setStatus("😥 " + error.message)
  		} else {
  			setMessage(data.returnValues[i]);
  			setNewMessage("");
  			setStatus(" Your message has been updated!");
  		}
  	});
  	*/
  }

  /*
  This function sets up a listener that detects changes in the user's Metamask
  wallet state, such as when the user disconnects their wallet or switch addresses
  */
  function addWalletListener(){
  	if (window.ethereum){
  		window.ethereum.on("accountsChanged", (accounts) => {
  			if (accounts.length > 0){
  				setWallet(accounts[0]);
  				setStatus("Write a message in the text-field above.");
  			} else {
  				setWallet("");
  				setStatus("Connect to Metamask using the top right button.");
  			}
  		});
  	} else {
  		setStatus(
  			<p>
  				{" "}🦊{" "}
  				<a target="_blank" href={`https://metamask.io/download.html`}>
  				You must install Metamask in your browser.
  				</a>
  			</p>
		);
  	}
  }

  /*
  This function will be called to connect the user's Metamask wallet to frontend
  */
  const connectWalletPressed = async () => {
  	const walletResponse = await connectWallet();
  	setStatus(walletResponse.status);
  	setWallet(walletResponse.address);
  };

  /*
  This function will be called when the user wants to update the message stored
  in the smart contract
  */
  const onUpdatePressed = async() => {
  	const { status } = await updateMessage(walletAddress, newMessage);
  	setStatus(status);
  };

  // The UI of the sign-in page
  return (
          <main id="main">
      <h2 class="header" id="header">
      Sign in to your wallet!
       </h2>
  
    <div id="img-div" class="img-div">
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/NFT_Icon.png" id="wallet-img" alt="Your very own NFT Wallet" class="wallet-img">
      </img>
      </div>
  
  {/*} i wanted to use javascript to make the 'sign in' button, but i dont know how to incorporate that yet
  */}
    <button id="walletButton" onClick={connectWalletPressed}>
		{walletAddress.length > 0 ? (
				"Connected: " + String(walletAddress).substring(0, 6) + "..." +
				String(walletAddress).substring(38)) : (
				<span>Connect Wallet</span>
			)}
		</button>
  
          <div id="different-wallet" class="different-wallet">
      <button class="wallet-dropdown"> → USE A DIFFERENT WALLET</button>
        <div class="wallet-options">
          <a href="#">Option 1</a>
          <a href="#">Option 2</a>
          <a href="#">Option 3</a>
        </div>
        {/*} don't know how to make this a dropdown menu like the opensea one
        */}
          </div>
      </main>
  )
};

export default SignIn;
