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

  function displayUserInfo(){
    return(
      <div className="UserStyleContainer">
        <div className="ProfilePicContainer">
          <img src={"https://randomuser.me/api/portraits/lego/1.jpg"} />
        </div>
      </div>
    );
  }

  return(
    <div className="UserContainer">
      <h2>User</h2>
      {
        loginStatus? displayUserInfo() : displayLoginError();
    </div>
  );
}

export default User;
