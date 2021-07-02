import React from "react";


const Create = () => {
    return (

        <div class = "createThing">
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Kevin_Durant_%28Wizards_v._Warriors%2C_1-24-2019%29_%28cropped%29.jpg" id="wallet-img" alt="Your very own NFT Wallet" class="wallet-img">
        </img>

        <br></br><a href="#">CREATE NEW ITEM HERE</a> */}
        <h1>HEADER 1</h1>

        <form>
        <strong>Name *</strong> <br></br>
        <input type="text" id="_name"></input>

        <br></br><strong>External Link</strong> 
        <p>OpenSea will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.
        </p>
        <input type="text" id="_external_url"></input>


    <br></br><strong>Description</strong>
    <p>The description will be included on the item's detail page underneath its image. Markdown syntax is supported.</p>
    <input type="text" id="_description"></input>



        </form>

        </div>



    )

     function getFormData(){

        let formData = {

            "name": String(document.getElementById("_name")),
            "external_url": String(document.getElementById("_external_url")),
            "description": String(document.getElementById("_description"))

        }

        return formData;

     }

};


export default Create;
