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

import React from 'react';
import ReactDOM from 'react-dom';
    
export default class SignIn extends React.Component {
    constructor() {
      
    }
    
    renderSignInButton() {}

    async connectWallet() {}

    /* const (for some reason, const doesn't work) */ connectWalletPressed() {}

    addWalletListener() {}

    /* const */ onUpdatePressed() {}

    useEffect() {}

    render() {
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
        }
    }