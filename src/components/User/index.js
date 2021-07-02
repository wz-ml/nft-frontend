/**
 * @author Ethan Sengsavang
 *
 * @version 06.29.2021
 * @since 06.29.2021
 */
import React from "react";
import {useEffect, useState} from "react";
import "./index.css";
import {getCookie} from "../../constants";
import fetch from "node-fetch"
import AssetMetadata from "../common/assetInfo/AssetMetadata.js";

const User = () => {
  const API_URL = "https://rinkeby-api.opensea.io/api/v1";

  const [walletAddress, setWalletAddress] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [userAssets, setUserAssets] = useState([]);

  useEffect(() => {
    let userCookie = getCookie("uid");
    if(userCookie === undefined){
      setLoginStatus(false);
      return;
    }

    setLoginStatus(true);
    let userData = JSON.parse(userCookie);
    setWalletAddress(userData.walletAddress);

    if(walletAddress.length === 0) return;
    fetchAssets();
  });

  /**
   * Fetches Assets the user has associated to their wallet if they have any.
   * These assets will be stored in a state variable.
   */
  async function fetchAssets(){
    let limit = 20;
    let offset = userAssets.length;

    fetch(`${API_URL}/assets?order_by=token_id&limit=${limit}&offset=${offset}&owner=${walletAddress}`)
    .then((resp) => resp.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err.message));
  }

  /**
   * Renders a given asset within a card, as specified by the AssetMetadata styles
   *
   * @param asset A NFT token represented by a JavaScript object.
   */
  async function renderAssetCard(asset){
    return(
      <div className="AssetCard">
        {
          asset
          ? <AssetMetadata asset={asset} />
          : <p>Nothing to see here :)</p>
        }
      </div>
    );
  }

  async function updateAssets(assetList){
  }

  /**
   * Displays everything about the user, if they are signed in at the moment
   */
  function displayUserInfo(){
    return(
      <div className="UserInfoContainer">
        <div className="UserStyleContainer">
          <div className="ProfilePicContainer">
            <img src={"https://randomuser.me/api/portraits/lego/1.jpg"} />
          </div>
        </div>
      </div>
    );
  }

  /**
   * Displays a page to go to the sign-in page if the user is not logged in
   */
  function displayLoginError(){
    return(
      <div className="LoginError">
        <h1>You are not signed in at the moment</h1>
        <h3>Please Sign-In <a href="/signin">here</a></h3>
      </div>
    );
  }

  return(
    <div className="UserContainer">
      <h2>User</h2>
      {
        loginStatus? displayUserInfo() : displayLoginError()
      }
    </div>
  );
}

export default User;
