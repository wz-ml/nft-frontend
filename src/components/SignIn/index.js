import React from 'react';
import ReactDOM from 'react-dom';
    
export default class SignIn extends React.Component {
    
    
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