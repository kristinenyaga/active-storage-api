import React,{useContext,useState} from 'react'
import { AppContext } from '../App'
import './fileform.css'

function FileForm() {
  const {latestPost,setLatestPost}=useContext(AppContext)
  const handleSubmit = (event) =>{
    event.preventDefault();
    const data = new FormData();
    data.append("post[title]",event.target.title.value)
    data.append("post[image]",event.target.image.files)
    submitToApi(data)

  }
  const submitToApi = (data) =>{
    fetch("/posts", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setLatestPost(data.image_url);
      })
      .catch((error) => console.error(error));
    
  }

  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadImages,setUploadImages] = useState([])

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    setUploadImages((previousImages) => previousImages.concat(selectedFiles));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  return (
    <div>
      <h1>File Form</h1>
      <form onSubmit={(e) => handleSubmit(e)}> 
      <label htmlFor='title'>Tilte</label>
      <input type='text' name='title' />
      <br></br>
      <label htmlFor='image'>Image</label>
      <input type='file' name='image' multiple
          accept="image/png , image/jpeg, image/webp" />
      <br></br>
      <button type='submit'>Upload</button>

      </form>
      {/* <section>
      <label>
        + Add Images
        <br />
        <span>up to 4 images</span>
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
      <br />


      {selectedImages.length > 0 &&
        (selectedImages.length > 4 ? (
          <p className="error">
            You can't upload more than 4 images! <br />
            <span>
              please delete <b> {selectedImages.length - 4} </b> of them{" "}
            </span>
          </p>
        ) : (
          <button
            className="upload-btn"
            onClick={() => {
              console.log(uploadImages);
            }}
          >
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === 1 ? "" : "S"}
          </button>
        ))}

      <div className="images">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image} className="image">
                <img src={image} height="200" alt="upload" />
                <button onClick={() => deleteHandler(image)}>
                  delete image
                </button>
                <p>{index + 1}</p>
              </div>
            );
          })}
      </div>
    </section> */}
    </div>
  )
}

export default FileForm