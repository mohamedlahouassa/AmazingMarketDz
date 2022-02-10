import React, { Component, useState } from 'react'
import './Login.css'
import logo from './images/logo.png'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import {Link,useHistory} from "react-router-dom";
import {auth,provider,provider2} from './firebase';
import { useStateValue } from "./StateProvider";
import facebook from './images/facebook.png'
import google from './images/google.png'
import Blob from './blob';
import { Spinner } from 'react-bootstrap';

function Login() {
const [{user}, dispatch] = useStateValue();
 const [email, setemail] = useState("");
 const [password, setpassword] = useState("");
 const [loading, setloading] = useState(false)
 const [opan, setopan] = useState(false);
 const [blob, setblob] = useState({tit:"",message:""});
   const history=useHistory();
      const Login=(e)=>{
        e.preventDefault();
 
        auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
            
            confirmAlert({
                title: auth?.user?.displayName,
                message: 'Welcome to Amazing Market',
                buttons: [
                 
                  {
                    label: 'OK',
                    onClick: () => {history.push('/')}
                  }
                ]
              });
    
           
        })
        .catch(error => {

          setblob({tit:"Error",message:error.message});
          setopan(true);
        })
      }

    const LoginWithGoogle=()=>{
      
      auth
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
   
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

    }
    const LoginWithFacebook=()=>{
      provider2.addScope('user_birthday');
      auth
      .signInWithPopup(provider2)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
    
        // The signed-in user info.
        var user = result.user;
       console.log(user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;
    
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
       console.log(error);
        // ...
      });
    

    }
      if(user){history.push('/')}

    return (
        <div className="all">
        <div className='login'>
        {opan?<Blob in={blob} onClick={()=>setopan(false)}/>:<></>}
        <Link to='/'>
            <img
                className="login__logo"
                src={logo}
                alt="logo"
            />
        </Link>
        
        <div className='login__container'>
       
            <h1>Login</h1>
            {loading?<Spinner animation="border" className="mx-auto" />:<></>}

            <form onSubmit={Login}>
               
                <input type='text' name="email" onChange={(e)=>setemail(e.target.value)}   value={email}  placeholder="Email" />
                <input type='password' name="password" onChange={(e)=>setpassword(e.target.value)}  value={password}  placeholder="Password" />

                <input  type="submit" className='shp mpl' value="Login"/>
                <div className="provider mx-auto">
                <div   className='google' onClick={()=>LoginWithGoogle()} ><img src={google} className="signic"/> GOOGLE</div>
                <div   className='facebook' onClick={()=>LoginWithFacebook()} ><img src={facebook} className="signic"/>  Facebook</div>
            </div>
            </form>

            <p>
                By signing-in you agree to the Amazing Market Dz Conditions of Use & Sale. Please
                see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
            </p>
              
            <Link to="/register" style={{textDecoration:"none"}}> <p   className='shpi' >Register</p></Link>
          
        </div>
    </div>
    </div>
    )
}

export default Login


 