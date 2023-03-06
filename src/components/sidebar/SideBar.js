import './style.css'

const SideBar = () =>{

    return (
      <div class="file-container">
          <p class="text-center mt-2 text-danger">Not functional</p>
          <div class="single-file ps-4">
          <i class="fa-solid fa-lg fa-folder"></i>
          <p class="mb-0 fs-6 ">Customers</p>
          </div>

          <div class="single-file ps-4">
          <i class="fa-solid fa-lg fa-folder"></i>
          <p class="mb-0 fs-6 ">Home</p>
          </div>

          <div class="single-file ps-4">
          <i class="fa-solid fa-lg fa-folder"></i>
          <p class="mb-0 fs-6 ">Icons</p>
          </div>

          <div class="single-file ps-4">
          <i class="fa-solid fa-lg fa-folder"></i>
          <p class="mb-0 fs-6 ">Logo</p>
          </div>
      </div>
    )
} 

export default SideBar;