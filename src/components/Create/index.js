import React from "react";
import "./index.css";

const Create = () => {
    return (
        <div className = "createThing">
 
        <h1 className = "head">Create new item</h1>

        <h4 className = "file">
        <strong className = "file_descrip">Image, Video, Audio, or 3D Model</strong> <br></br>
        <p className="file_types">
        File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 40 MB
        </p>
        </h4>

        <form>
        <br></br><br></br>
        
        <h4 className = "name">
        <strong className = "name_text">Name *</strong> <br></br>
        <input className = "name_textbox" type="text"></input>
        </h4>

        <br></br>
        
    <h4 className="description">
    <strong className="description_title">Description</strong>
    <p className="description_text">
    The description will be included on the item's detail page underneath its image.
    <span style= {{color:"blue" }} > Markdown </span>
    syntax is supported.
    </p>
    <textarea className="description_textbox" name="comment[body]" rows="1" cols="50" wrap="physical" id="comment_text_area"></textarea>
    </h4>

    

   


        </form>

        </div>


    )
};


export default Create;
