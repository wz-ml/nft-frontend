/**
 * @author Ethan Sengsavang
 *
 * @version 2021.06.28 - Base development
 * @since 2021.06.28
 */
import React from "react";
import {useState} from "react";
import fetch from "node-fetch";

const Asset = () => {
  const API_URL = "https://rinkeby-api.opensea.io/api/v1";
  const [imgUrl, setImgUrl] = useState("");

  async function getDetails(){
    let urlParts = window.location.pathname.split('/');
    const [collectionAddr, tokenID] = urlParts.splice(-2);

    fetch(`${API_URL}/asset/${collectionAddr}/${tokenID}`, {method: "GET"})
      .then((res) => res.json())
      .then((json) => updateDetails(json))
      .catch((err) => console.error(err));
  }

  async function updateDetails(tokenData){
    setImgUrl(tokenData.image_url);
    console.log(tokenData);
  }

  return(
    <h2 onClick={getDetails}>Asset page</h2>
  );
}

export default Asset;
