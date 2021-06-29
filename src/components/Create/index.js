import React from "react";


const Create = () => {
    return (
        <div className = "createThing">
 
        <h1>Create new item</h1>

        <strong>Image, Video, Audio, or 3D Model</strong> <br></br>
        File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 40 MB

        <form>
        <br></br><br></br>
        <strong>Name *</strong> <br></br>
        <input type="text"></input>
        <br></br><br></br>
        <strong>External Link</strong> 
        <br></br>
        OpenSea will include a link to this URL on this item's detail page, so that users can click to learn more about it. <br></br>You are welcome to link to your own webpage with more details.

        <br></br><input type="text"></input>


    <br></br><br></br><strong>Description</strong>
    <br></br>The description will be included on the item's detail page underneath its image.
    <span style= {{color:"blue" }} > Markdown </span>
   syntax is supported.

    {/* const element = <h1 style= {{ color:'red' }} > Hello world</h1> */}
    <br></br><input type="text"></input>

    <br></br><br></br><strong>Supply</strong>
    <br></br>The number of copies that can be minted. No gas cost to you! Quantities above one coming soon.
    <br></br><input type="text"></input>

    <br></br><br></br><strong>Freeze Metadata</strong>
    <br></br>Freezing your metadata will allow you to permanently lock and store all of this item's content in decentralized file storage.
    <br></br><input type="text"></input>


        </form>

        </div>


    )
};


export default Create;
