import NavBar from "../../components/nav/NavBar";
import SideBar from "../../components/sidebar/SideBar";
import './style.css'
import Upload from "../../components/upload/Upload";
import ImageInfo from "../../components/info/ImageInfo";
import { useState } from "react";

const Home = () => {

 const [imageData,  setImageData] = useState(null)

 function handleClick (imageData){
   setImageData(imageData)
   console.log(imageData);
 }
 

  return (
    <>
      <NavBar />
      <div className="home-container">
        <SideBar/>
        <Upload onclick={handleClick}/>
        <ImageInfo data={imageData}/>
      </div>
    </>
  );
};

export default Home;
