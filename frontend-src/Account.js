import React, { useEffect, useState } from 'react'
import './account.css'
import {db,firebase} from './firebase';

import {Link,useHistory} from "react-router-dom";

import { useStateValue } from "./StateProvider";
import CreateIcon from '@material-ui/icons/Create';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import Blob from './blob';


function Account() {
    const [{user}, dispatch] = useStateValue();
      const [namedis, setnamedis] = useState(true);
      const [emaildis, setemaildis] = useState(true);
     
      const [name, setname] = useState(user?.displayName);
      const [email, setemail] = useState(user?.email);
      const [pass, setpass] = useState();
      const [oldpass, setoldpass] = useState();
      const [newpass, setnewpass] = useState();
      const [credpass, setcredpass] = useState();
      const [loading, setloading] = useState(false);
      const [active, setactive] = useState(true);
      const [open, setOpen] = React.useState(false);
      const [opan, setopan] = useState(false);
      const [blob, setblob] = useState({tit:"",message:""});
      const history=useHistory();
        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };
        
  useEffect(() => {
    setname(user?.displayName);
    setemail(user?.email);
  }, [user])
const saveChanges=()=>{
    
   if(user?.displayName !== name){
       if(name==""){

           setblob({tit:"Please Write Your Name",message:"there is no person without name so please Write your name"});
           setopan(true);
           setname(user?.displayName);
           setAll();
       }
       else{
    user.updateProfile({
        displayName: name,
      
      }).then(function() {
        const mydb=db.collection('users').doc(user?.uid);
        mydb.update({
             name:user?.displayName
        }).then(()=>{

        }).catch(error=>{

        })

        setblob({tit:"Name Changed",message:"Your Name was updated succesfully"});
        setopan(true);
        setAll();
      }).catch(function(error) {
        setblob({tit:"Error",message:error.message});
        setopan(true);
      });

   }
   
}
   if(user?.email !== email){
 

setOpen(true);
     
}


}
const setAll=()=>{
    setnamedis(true);
    setemaildis(true);
   
}
const reauth=(pa)=>{
    setloading(true);
var cred=firebase.auth.EmailAuthProvider.credential(user?.email,pa);
return user.reauthenticateWithCredential(cred);
}
const updatepass=()=>{
 
 reauth(oldpass).then(()=>{
    setloading(true);
     if(pass===newpass){
    user.updatePassword(pass).then(function() {
        setoldpass("");
        setpass("");
        setnewpass("");
        setloading(false);
        setblob({tit:"Password Changed",message:"Your password Was changed succesfully"});
        setopan(true);
        
        
      }).catch(function(error) {
        setloading(false);
        setblob({tit:"Error",message:error.message});
        setopan(true);
        

      });
    }
    else{
        setloading(false);

        setblob({tit:"Error",message:"Password Does Not match"});
        setopan(true);
    }


 }).catch(error=>{
    setloading(false);
    setblob({tit:"Error",message:error.message});
    setopan(true);
     

 })


}
const updatenam=()=>{
    handleClose();
    reauth(credpass).then(()=>{
        user.updateEmail(email).then(function() {
            setloading(false);
            setcredpass("");
            setAll();
            const mydb=db.collection('users').doc(user?.uid);
            mydb.update({
                 email:user?.email
            }).then(()=>{
    
            }).catch(error=>{
    
            })
            setblob({tit:"Email Changed",message:"Your Email Was changed succesfully"});
            setopan(true);
        }).catch(function(error) {
            setblob({tit:"Error",message:error.message});
            setopan(true);
        });
      
    
    
     }).catch(error=>{
        setloading(false);
        setblob({tit:"Error",message:error.message});
        setopan(true);
         
    
     })

}
if(!user){
    history.push('/login');
}
    return (
        <div className="cont account">
        <h1>Account Details </h1>
        {loading?<Spinner animation="border" className="mx-auto" />:<></>}
        {opan?<Blob in={blob} onClick={()=>setopan(false)}/>:<></>}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
          To change your email you must write your password .
          </DialogContentText>
         <input type="password" className="account_info "  autoFocus style={{width:"100%",border:"1px solid #e2e2ee"}} placeholder="Your Password" value={credpass} onChange={(e)=>{setcredpass(e.target.value)}}/>
        </DialogContent>
      
     
          <div onClick={updatenam} className="shp mx-auto my-3">
            OK
          </div>
      
      </Dialog>
        <div className="d-flex switcher"> <div className="pixel mx-2" style={{borderBottom:active?"2px solid #fca311":"2px solid transparent"}} onClick={()=>setactive(true)}>Account Informations</div>
        <div className="pixel mx-2" style={{borderBottom:!active?"2px solid #fca311":"2px solid transparent"}}  onClick={()=>setactive(false)}>Password</div>
        </div>
        <div className="account_all" style={{display:active?"block":"none"}}>
        <div className="account_rw">
            <p className="account_titles">Name</p>
            <input className="account_info" value={name} disabled={namedis} onChange={(e)=> setname(e.target.value)} style={{outline:!namedis?"2px solid #e2e2ee":"none"}}/>
            <div className="update_btn" style={{visibility:namedis?"visible":"hidden"}} onClick={()=>setnamedis(false)}>
            <CreateIcon/>
            </div>
        </div>
        <div className="account_rw">
            <p className="account_titles">Email</p>
            <input className="account_info" value={email}  disabled={emaildis} onChange={(e)=> setemail(e.target.value)} style={{outline:!emaildis?"2px solid #e2e2ee":"none"}}/>
            <div className="update_btn" style={{visibility:emaildis?"visible":"hidden"}} onClick={()=>setemaildis(false)}>
            <CreateIcon/>
            </div>
        </div>
        
    
        <div className="account_enre" style={{transform:!emaildis ||!namedis ?"scaleY(1)":"scaleY(0)"}}>
         
            <div className="shp save_btn" onClick={()=>saveChanges()}>
            {loading?<Spinner animation="border"  />:<CreateIcon/>}
                <span className="mx-1">Save Your info</span>

            </div>
        </div>
        </div>







        <div className="account_pass" style={{display:!active?"block":"none"}}>
        <div className="account_rw">
            <p className="account_titles">old password</p>
            <input className="account_info" type="password" value={oldpass} onChange={(e)=>setoldpass(e.target.value)} placeholder="old password" />
            
        </div>
        <div className="account_rw">
        <p className="account_titles" >new password</p>
            <input className="account_info" type="password" value={newpass} onChange={(e)=>setnewpass(e.target.value)} placeholder="new password" />
           
        </div>
         <div className="account_rw">
        <p className="account_titles">confirm new password</p>
            <input className="account_info" type="password"  value={pass} onChange={(e)=>setpass(e.target.value)} placeholder="confirm new password" />
           
        </div>
    
        <div className="account_enre" style={{justifyContent:"center"}}>
         
            <div className="shp save_btn" onClick={()=>updatepass()}>
            
            {loading?<Spinner animation="border"  />:<CreateIcon/>}
                <span className="mx-1" >Change password</span>

            </div>
        </div>
        </div>
 



        </div>
    )
}

export default Account
