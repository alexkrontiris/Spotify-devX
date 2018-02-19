/* global Demo, React, ReactDOM, firebase */

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }
  
  uploadToServer() {
    // upload
    // Create a root reference
    var storageRef = firebase.storage().ref();
    var ref = storageRef.child(this.state.file.name);
    
    return ref.put(this.state.file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      this.setState({...this.state, file: '', imagePreviewUrl: ''});
      return snapshot;
    });
  }
  
  isFileEmpty() {
    return this.state.file == '';
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
    
    
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }
  
  _showBrowsePrompt() {
    document.getElementById('upload').click();
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Upload a picture here</div>);
    }

    return (
      <div className="previewComponent">
        <div onClick={this._showBrowsePrompt} className="upload-box">
          <div className="imgPreview">
            {$imagePreview}
          </div>
        </div>               
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input style={{opacity:0}} id="upload" className="fileInput" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
          
        </form>
        
      </div>
    )
  }
}

//ReactDOM.render(<ImageUpload/>, document.getElementById("mainApp"));

// <button className="submitButton" 
//             type="submit" 
//             onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>

window.ImageUpload = ImageUpload;