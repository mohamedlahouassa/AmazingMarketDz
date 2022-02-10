import React, {useState } from 'react'
import './Login.css'
import logo from './images/logo.png'

import {Link,useHistory} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'

import {auth} from './firebase';
import { useStateValue } from "./StateProvider";
import Blob from './blob';
import { Spinner } from 'react-bootstrap';

function Register() {
const [{user}, dispatch] = useStateValue();
 const [username, setusername] = useState("");
 const [num, setnum] = useState("");
 const [email, setemail] = useState("");
 const [password, setpassword] = useState("");
 const [loading, setloading] = useState(false);
 const [opan, setopan] = useState(false);
 const [blob, setblob] = useState({tit:"",message:""});

   const history=useHistory();
      const register=(e)=>{
          setloading(true);
        e.preventDefault();
       if(num===password){

      auth.createUserWithEmailAndPassword(email,password).then((e)=>{
        var user = auth.currentUser;
        if(user)
     
        user.updateProfile({
          displayName: username,
        
        }).then(function() {
          setloading(false);

            confirmAlert({
                title: username,
                message: 'Welcome to Amazing Market',
                buttons: [
                 
                  {
                    label: 'OK',
                    onClick: () => {history.push('/')}
                  }
                ]
              });
             
        
        }).catch(function(error) {
          setloading(false);

          setblob({tit:"Error",message:error.message});
        setopan(true);
        });
        
      }).catch((u)=>{
        setloading(false);
        setblob({tit:"Error",message:u.message});
        setopan(true);
      })
    }
    else{
      setloading(false);
      confirmAlert({
        title: 'Oops!',
        message: 'password does not match',
        buttons: [
         
          {
            label: 'OK',
            onClick: () => {}
          }
        ]
      });
     
    }
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
       
            <h1>Register</h1>
            {loading?<Spinner animation="border" className="mx-auto" />:<></>}

            <form onSubmit={register}>
                 <input type='text' name="username" onChange={(e)=>setusername(e.target.value)}  value={username}  placeholder="Name"  />
                <input type='email' name="email" onChange={(e)=>setemail(e.target.value)}   value={email}  placeholder="Email" />
                <input type='password' name="password" onChange={(e)=>setpassword(e.target.value)}  value={password}  placeholder="Password" />
                <input type='password' name="num"  onChange={(e)=>setnum(e.target.value)}   value={num} placeholder="Confirm password" />

                <input  type="submit" className='shp mpl' value="Register"/>
            </form>

            <p className="noselect">
                By signing-in you agree to the Amazing Market Dz Conditions of Use & Sale. Please
                see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
            </p>
              
           <Link to="/login" style={{textDecoration:"none"}}> <p   className='shpi' >Sign in</p></Link>
        </div>
    </div></div>
    )
}

export default Register


 