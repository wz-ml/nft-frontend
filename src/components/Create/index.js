import React, {useState} from "react";
import {Plus} from "react-bootstrap-icons";
import "./index.css";
import * as Mint from "./mint";
import { getCookie } from '../../constants';
import fetch from "node-fetch";
import { v4 as uuidv4 } from 'uuid';

const Create = () => {  
    const [imgPreview, setImgPreview] = useState(null);
    const [error, setError] = useState(false);
  
    const handleImageChange = (e) => {
      e.preventDefault();
      let selected = undefined;

      if(e.target.files){
        selected = e.target.files[0];
      }

      if(selected === undefined && e.dataTransfer.items){
        if(e.dataTransfer.items[0].kind !== "file"){
          return;
        }

        selected = e.dataTransfer.items[0].getAsFile();
      }

      if(selected === undefined){
        selected = e.dataTransfer.items[0].name;
      }

      console.log(selected);

      const ALLOWED_TYPES = ["image/png" , "image/jpeg" , "image/jpg"];
      if(selected && ALLOWED_TYPES.includes(selected.type)){
        let reader = new FileReader();
        reader.onloadend = () => {
          setImgPreview(reader.result);
        }
        reader.readAsDataURL(selected);

        setError(false);
      } else {
        setError(true);
      }
    };

    async function createNFT(){
        let userData = JSON.parse(getCookie("uid"));
        let walletAddress = userData.walletAddress;

        let folderName = btoa(walletAddress.substring(0, 5) + walletAddress.substring(10, 14));
        //let fileData = document.getElementById("fileUpload").target.files[0];
        let fileData = "./2.png"
        let extension = uuidv4();

        console.log("folder name is " + folderName);
        console.log("extension name is " + extension);
        console.log("file data is " + fileData);


        const inbody = new FormData;
        inbody.append("file", fileData);

      
        const address = ("https://api.backendless.com/AD3CB4F2-2229-93EE-FFFE-A667BBA40900/E273AF64-34D7-4085-AF58-C5961F8EE3D3/files/nft/" + folderName + "/" + extension);
        const request = {
            body: inbody,
            method: "POST"
        };

        console.log(request);

        fetch(address, request).then((Response) => { console.log(Response) });

      

        var NFT = {
          "name": document.getElementById("nameField").value,
          "description": document.getElementById("descriptionField").value,
          "image_url": address //temp until image hosting is implemented
        }

        console.log(NFT);

        let userInfo = JSON.parse(getCookie("uid"));
      
        //await Mint.mint(NFT, userInfo["walletAddress"]);
  
    }

    const dragOverHandler = (evt) => {
      console.log("upload occurring");
      evt.preventDefault();
    }

    return (
      <div className = "createThing">
 
        <div className = "createNewItem_text">
            <h1>Create new item</h1>
        </div>

        <div className="file_types">
        {/* <h4> */}
        <strong className = "file_descrip">Use an image as your NFT!</strong>
        <br></br>
        File types supported: JPG, PNG, JPEG
        {/* </h4> */}
        </div>

      <div className="App2">
        <div className="container" onDrop={handleImageChange} onDragOver={dragOverHandler}>
          {error && <p className="errorMsg">File not supported</p>}
          <div 
          className="imgPreview"
          style= {{background: imgPreview ? `url("${imgPreview}")no-repeat center/cover` : "#ffffff"}}
          >
            {!imgPreview && (
              <>
              <p></p>
              <label htmlFor="fileUpload" className="customFileUpload">
                Drag & drop file
                <div>
                  or <span className="fileTypeDescription">browse media on your device</span>
                </div>  
              </label>
              <input type="file" id="fileUpload" onChange={handleImageChange} />
              </>
            )}
          </div>
          {imgPreview && (
            <button onClick={() => setImgPreview(null)}>Remove image</button>
          )}
        </div>
      </div>

      <form>
        <br></br><br></br>
        <div className = "name">
        {/* <div className = "name_text"> */}
        <strong>Name *</strong> <br></br>
        {/* </div> */}

        {/* <div className = "name_textbox"> */}
        <input className="name_textbox_size" id="nameField" type="text" placeholder="Item Name"></input>
        {/* </div> */}
        
        </div>

        <br />

        <div className="tags">
          <strong>Item tags</strong>
          <p>Tags should be separated by commas (,)</p>
          <input className="name_textbox_size" type="text" placeholder="Art, Abstract, Colourful, ..." />
        </div>

        <br />
        
        {/* <h4 className = "description"> */}
        <div className = "description">
        <strong>Description</strong><br></br>

      
        <p className="description_text">
        The description will be included on the item's detail page underneath its image.
        <span style= {{color:"blue" }} > Markdown </span>
        syntax is supported.
        </p>
        <textarea className="description_textbox" name="comment[body]" rows="1" cols="50" wrap="physical" id="descriptionField" placeholder="Provide a detailed description of your item."></textarea>

        </div>
        {/* </h4> */}

      </form>
      <button className="CreateButton" onClick={() => createNFT()}>
        <Plus className="CreatePlus" />
        <p>Create Token</p>
      </button>

    </div>

  );
  
};

export default Create;
