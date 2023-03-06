import './style.css'
import jwtDecode from "jwt-decode";
import { API_URL } from "../../api/config";

const ImageInfo = ({data}) => {

   const availableSize = [200, 400, 800]
   let fileNameParts, fileExt, fileNameWithoutExt;

   let apikey = ""
   const token = localStorage.getItem("token");
   if (token) {
     const decodedToken = jwtDecode(token);
     apikey = decodedToken.apikey;
    
   }

   if(data !== null){
       fileNameParts = data.name.split(".");
      
       fileExt = fileNameParts.pop();
       fileNameWithoutExt = fileNameParts.join(".");
   }
   

   function handleCopyClick(text) {
      navigator.clipboard.writeText(text).then(() => {
         console.log("copied");
      });
   }

   return(
      data === null ? <div class="dflex pt-4 text-center">
            No image is currently selected.
      </div> : 
      <div class="file-info-conatiner">
      <p class="fw-semibold fs-5">Image Details:</p>
      <p class="fw-semibold mb-0">Image URL</p>
      <p class="image-url-single mb-0">{`${API_URL}/${"image"}/${data.name}?api_key=${apikey}`}</p>
      <p onClick={() => {handleCopyClick(`${API_URL}/${"image"}/${data.name}?api_key=${apikey}`)}} class="ps-2 mb-0 d-inline"><i class="fa-regular fa-copy fa=lg"></i></p>
      <p class="fw-semibold mt-4 mb-0">Size</p>
      <p>{data.size + "KB"}</p>
      <p class="fw-semibold mb-1">Available Size</p>
      {availableSize.map(size => {
         let fileName =  `${API_URL}/${"image"}/${fileNameWithoutExt}-${size}.${fileExt}` 
         fileName += `?api_key=${apikey}`
        return <>
        <span class="image-url pt-1">{`${fileName}?api_key=${apikey}`}</span>
         <p onClick={() => {handleCopyClick(fileName)}} class="ps-2 mb-0 d-inline text-center"><i class="fa-regular fa-copy fa=lg"></i></p>
         <span class="badge rounded-pill bg-secondary ms-2">{size}</span>
        </>
         
         })}
       </div>
    )

   
} 

export default ImageInfo;