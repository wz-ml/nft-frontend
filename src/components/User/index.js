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

const User = () => {
  const [walletAddr, setWalletAddr] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    let userCookie = getCookie("uid");
    if(userCookie === undefined){
      setLoginStatus(false);
      return;
    }

    setLoginStatus(true);
  });

  /**
   * Fetches Assets the user has associated to their wallet if they have any.
   * These assets will be stored in a state variable.
   */
  function fetchAssets(){}

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
