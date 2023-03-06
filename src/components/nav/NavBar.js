import './style.css'

import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const navigate = useNavigate();
 

  let apikey = ""
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    apikey = decodedToken.apikey;
   
  }

  function handleCopyClick(text) {
    navigator.clipboard.writeText(text).then(() => {
       console.log("copied");
    });
  }

  function handleLogout(){
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
      <div className="navbar p-4 pt-2 navbar-custom">
         
         <a class="navbar-brand" href="#">Uploadr</a>

         <div class="nav-bar-option ">

           <p class="mb-0 api-key"  data-bs-toggle="modal" data-bs-target="#api-modal">API key</p>
         
           <p class="mb-0">Documentation</p> 

           <p onClick={handleLogout} role="button" class="mb-0">Logout</p> 

           <i class="fa-regular fa-xl fa-user user-icon"></i>

           
           <div class="modal" id="api-modal" tabindex="-1">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">API KEY</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <p className='text-truncate'>{apikey}</p>
                      <p onClick={() => {handleCopyClick(apikey)} }class=" mb-0 d-inline"><span class="btn btn-outline-primary">Copy</span></p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
            </div>
           
         </div>

      </div>
    )
};

export default NavBar;