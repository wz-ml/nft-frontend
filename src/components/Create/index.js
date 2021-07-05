import React, {useState} from "react";
import "./index.css";

const Create = () => {  
    const [imgPreview, setImgPreview] = useState(null);
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
        <div className="container">
          {error && <p className="errorMsg">File not supported</p>}
          <div 
          className="imgPreview"
          style= {{background: imgPreview ? `url("${imgPreview}")no-repeat center/cover` : "#ffffff"}}
          >
            {!imgPreview && (
              <>
              <p></p>
              <label htmlFor="fileUpload" className="customFileUpload">Drag & drop file</label>
              <input type="file" id="fileUpload" onChange={handleImageChange}/>
              <div>
              or <span className="fileTypeDescription">browse media on your device</span>
                </div>  
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
        <strong>Description</strong><br></br>

      
        <p className="description_text">
        The description will be included on the item's detail page underneath its image.
        <span style= {{color:"blue" }} > Markdown </span>
        syntax is supported.
        </p>
        <textarea className="description_textbox" name="comment[body]" rows="1" cols="50" wrap="physical" id="comment_text_area" placeholder="Provide a detailed description of your item."></textarea>

        </div>
        {/* </h4> */}

      </form>
      <button className="CreateButton">
        <Plus className="CreatePlus" />
        <p>Mint a new Token </p>
      </button>

    </div>

  );
  
};

export default Create;
