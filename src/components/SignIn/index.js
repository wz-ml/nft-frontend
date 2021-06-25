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
	  <div id="container">
		<h1>Sign in to your waallet</h1>
		<br />
		{" "}🦊{" "}
		<button id="walletButton" onClick={connectWalletPressed}>
		{walletAddress.length > 0 ? (
				"Connected: " + String(walletAddress).substring(0, 6) + "..." +
				String(walletAddress).substring(38)) : (
				<span>Connect Wallet</span>
			)}
		</button>	
  	  </div>
  )
};

export default SignIn;