import React from "react";
import axios from "axios";
import { authenticate, isAuth } from "./Helpers";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

function Facebook({ informParent = f => f }) {
  const responseFacebook = response => {
    console.log(response);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/facebook-login`,
      data: { userID: response.userID,accessToken:response.accessToken }
    })
      .then(response => {
        console.log("Facebook signin Success", response);
        informParent(response);
      })
      .catch(error => {
        console.log("Facebook sign in error", error.response);
      });
    
  };
  return (
    <div>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={renderProps => (
            <button 
            onClick={renderProps.onClick} 
            disabled={renderProps.disabled} 
            className='btn btn-primary btn-lg btn-block mb-3'> 
            <i class="fab fa-facebook"> Log In with Facebook >></i>  </button>
            
          )}
      />
    </div>
  );
}

export default Facebook;
