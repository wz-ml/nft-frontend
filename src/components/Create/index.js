import React, {useState} from "react";
import "./index.css";

const Create = () => {  const [imgPreview, setImgPreview] = useState(null);
    const [error, setError] = useState(false);
  
    const handleImageChange = (e) => {
      const selected = e.target.files[0];
      const ALLOWED_TYPES = ["image/png" , "image/jpeg" , "image/jpg"];
      if(selected && ALLOWED_TYPES.includes(selected.type)){
        let reader = new FileReader();
        reader.onloadend = () => {
          setImgPreview(reader.result);
        }
        reader.readAsDataURL(selected);
      } else {
        setError(true);
      }
    };
  

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
      <div className="App2">
        <div className="container">
          {error && <p className="errorMsg">File not supported</p>}
          <div 
          className="imgPreview"
          style= {{background: imgPreview ? `url("${imgPreview}")no-repeat center/cover` : "#131313"}}
          >
            {!imgPreview && (
              <>
              <p>Add an image</p>
              <label htmlFor="fileUpload" className="customFileUpload">Choose file</label>
              <input type="file" id="fileUpload" onChange={handleImageChange}/>
              <span>(jpg, jpeg or png)</span>
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

    );
  
    };


export default Create;
// IMPORTANT TIMESTAMP: 10:14