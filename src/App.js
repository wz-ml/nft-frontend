import React from 'react';
import {useEffect} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Header, Navbar} from './compound/common';
import Home from './components/Home';
import Marketplace from "./components/Marketplace";
import SignIn from './components/SignIn';
import Asset from "./components/Asset";
import Create from './components/Create';
import User from "./components/User";
import './App.css';

function App(){
  
  /**
   * Saves the user's information in a cookie that persists througout the entire website.
   *
   * @param userInfo The user's information in a javascript object. This will be 
   * stringified and be saved in a cookie.
   */
  function saveUserInfo(userInfo){
      let userString = JSON.stringify(userInfo);
      // cookie expires in 24hr
      let expiryDate = new Date();
      expiryDate.setDate(new Date().getDate() + 1);

      document.cookie = `uid=${userString}; expires=${expiryDate}; SameSite=Lax;`;
  }

  /**
   * Adds a wallet listener to check whenever the wallet address in the page 
   * changes, this includes switching wallets or disconnecting wallets
   */
  function addWalletListener(){
    if(window.ethereum){
      window.ethereum.on("accountsChanged", (accounts) => {
        if(accounts.length > 0){
          saveUserInfo({account: accounts[0]});
          return;
        }

        saveUserInfo({account: ""});
      });
    }
  }

  /**
   * Gets the current wallet that is connected to the site, if there is one.
   */
  async function getCurrentWalletConnected(){
    if(window.ethereum){
      try{
        const addressArray = await window.ethereum.request({
          method: "eth_accounts"
        });
        if(addressArray.length > 0){
          saveUserInfo({address: addressArray[0]});
          return;
        }

        saveUserInfo({address: ""});
      }catch(err){
        saveUserInfo({address: ""});
        console.error("something went wrong fetching current wallet", err.message);
      }
    }
  }

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  });

  return (
    <div className = "App">
      <Header />
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/marketplace">Marketplace</Link>
            </li>
            <li>
              <Link to='/signin'>Sign In</Link>
            </li>
            <li>
              <Link to="/asset">Asset</Link>
            </li>
            <li>
              <Link to='/Create'>Create New Item</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/signin" component={SignIn}/>
          <Route path="/asset" component={Asset} />
          <Route path="/Create" component={Create}/>
          <Route path="/user" component={User} />
        </div>
      </Router>
    </div>
  );
}

// next line is very temporary
/*
class Home extends React.Component{
  render(){
    return(
      <div>
        <h2>home</h2>
      </div>
    );
  }
}
*/

export default App;
