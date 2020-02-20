import React from "react";
import axios from "axios";
import { authenticate, isAuth } from "./Helpers";
import GoogleLogin from "react-google-login";


function Google({informParent = f=> f}) {
    const responseGoogle = (response) => {
        console.log(response.tokenId)
        axios({
            method:'POST',
            url: `${process.env.REACT_APP_API}/google-login`,
            data:{ idToken:response.tokenId}
        })
        .then((response)=> {
            console.log('Google signin Success',response)
            informParent(response);
        })
        .catch((error)=> {
            console.log('Google sign in error',error.response)
        })
        //
    }
  return (
    <div>
      <GoogleLogin
        clientId=  {`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`} 
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='btn btn-danger btn-lg btn-block mb-3'> <i class="fab fa-google"> Log In with Google >></i>  </button>
            
          )}
        cookiePolicy={"single_host_origin"}
      />
      
    </div>
  );
}

export default Google;
