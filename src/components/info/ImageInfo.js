import './style.css'

const ImageInfo = ({data}) => {

   const availableSize = [200, 400, 800]
   const rootPath = "http://localhost:4005/image"
   let fileNameParts, fileExt, fileNameWithoutExt;

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
      <p class="image-url-single mb-0">{`${rootPath}/${data.name}`}</p>
      <p onClick={() => {handleCopyClick(`${rootPath}/${data.name}`)}} class="ps-2 mb-0 d-inline"><i class="fa-regular fa-copy fa=lg"></i></p>
      <p class="fw-semibold mt-4 mb-0">Size</p>
      <p>{data.size + "KB"}</p>
      <p class="fw-semibold mb-1">Available Size</p>
      {availableSize.map(size => {
         const fileName =  `${rootPath}/${fileNameWithoutExt}-${size}.${fileExt}` 
        return <>
        <span class="image-url pt-1">{fileName}</span>
         <p onClick={() => {handleCopyClick(fileName)}} class="ps-2 mb-0 d-inline text-center"><i class="fa-regular fa-copy fa=lg"></i></p>
         <span class="badge rounded-pill bg-secondary ms-2">{size}</span>
        </>
         
         })}
       </div>
    )

   
} 

export default ImageInfo;