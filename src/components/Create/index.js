import React from "react";
import "./index.css";

const Create = () => {
    return (
        <div className = "createThing">
 
        <div className = "createNewItem_text">
            <h1>
            Create new item
            </h1>
        </div>
        

        <div className="file_types">
        {/* <h4> */}
        <strong className = "file_descrip">Image, Video, Audio, or 3D Model</strong>
        <br></br>
        File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 40 MB
        {/* </h4> */}
        </div>


        {/* <h4 className = "file">
        <strong className = "file_descrip">Image, Video, Audio, or 3D Model</strong> 
        </h4>
        
        <p className="file_types">
        File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 40 MB
        </p> */}



        <form>
        <br></br><br></br>
        <div className = "name">
        {/* <div className = "name_text"> */}
        <strong>Name *</strong> <br></br>
        {/* </div> */}

        {/* <div className = "name_textbox"> */}
        <input className="name_textbox_size" type="text" placeholder="Item Name"></input>
        {/* </div> */}
        </div>

        <br></br>
        
        {/* <h4 className = "description"> */}
        <div className = "description">
        <strong>Description</strong>

        <p className="description_text">
        The description will be included on the item's detail page underneath its image.
        <span style= {{color:"blue" }} > Markdown </span>
        syntax is supported.
        </p>
        
        <textarea className="description_textbox" name="comment[body]" rows="1" cols="50" wrap="physical" id="comment_text_area" placeholder="Provide a detailed description of your item."></textarea>
        </div>
        {/* </h4> */}

    

   


        </form>

        </div>


    )
};


export default Create;
