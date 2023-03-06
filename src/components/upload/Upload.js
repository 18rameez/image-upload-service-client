import "./style.css";
import { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";
import { API_URL } from "../../api/config";


const Upload = ({ onclick }) => {
 
  const uploadBtn = useRef(null)
  const spinnerView = useRef(null)
  const contentLoadSpinner = useRef(null)
  const [imageList, setImageList] = useState([]);

  let NO_IMAGE_FOUND = ""

  let userId = "";
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.userId;
    console.log(userId);
  }
  
  function handleImageUpload(event) {

    const currentDate = new Date();
    const newImage = {}
    uploadBtn.current.classList.toggle("d-none");
    spinnerView.current.classList.toggle("d-none");

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("upload_image", file);
    formData.append("userId", userId);
    formData.append("size", file.size/1000);
    formData.append("uploaded_date", currentDate.toDateString());

    newImage.size = file.size/1000
    newImage.userId  = userId;
    newImage.uploaded_date = currentDate.toDateString()

    fetch(API_URL+"/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        newImage.name = data.generatedName;
        setImageList(prevImageList => [...prevImageList, newImage]);
        spinnerView.current.classList.toggle("d-none");
       
        uploadBtn.current.classList.toggle("d-none");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    const body = {
      userId: userId,
    };

    fetch(API_URL+"/image/getAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setImageList(data);
        NO_IMAGE_FOUND= "No image has been uploaded"
        contentLoadSpinner.current.classList.add("d-none");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div class="upload-main-container">
      <div class="upload-options">
        <button type="button" class="btn btn-outline-secondary btn-sm">
          Select All
        </button>
        <button type="button" class="btn btn-outline-secondary btn-sm">
          New Folder
        </button>

        <label class="custom-file-upload">
          <input
            type="file"
            name="upload_image"
            onChange={(e) => handleImageUpload(e)}
          />
          <i ref={uploadBtn} class="fa-solid fa-cloud-arrow-up text-primary "></i>
          <div ref={spinnerView} class="ms-2 me-2 spinner-border spinner-border-sm d-none" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </label>
      </div>
        
        <div class="d-flex justify-content-center mt-4">
        <div ref={contentLoadSpinner} class="spinner-border text-center" role="status">
              <span class="sr-only">Loading...</span>
          </div>
        </div>
        

      <div class="content-view">

         
         {imageList.length < 1 ? <p class="pt-2 text-center">{NO_IMAGE_FOUND}</p> : null }

        
        {imageList.map((singleImage) => (
          <div
            class="single-content"
            onClick={() => {
              onclick(singleImage);
            }}
          >
            <i class="fa-regular fa-xl fa-image"></i>
            <div>
              <p class="mb-0 image-url-single"> {singleImage.name}</p>
              <span class="mb-0 fw-light d-inline-block"> {`Uploaded on ${singleImage.uploaded_date}`}  |</span>
              <span class="mb-0 fw-light "> {singleImage.size}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upload;
