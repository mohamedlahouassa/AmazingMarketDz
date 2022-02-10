import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { confirmAlert } from 'react-confirm-alert';
function Verified() {
    const [{user}, dispatch] = useStateValue();
    const [aff, setaff] = useState(true)
     const close=()=>{
         setaff(false);
     }
     const verify=()=>{
        user.sendEmailVerification().then(function() {
            confirmAlert({
                title: 'Email Verification',
                message: 'Email verification are sent',
                buttons: [
                  {
                    label: 'OK',
                    onClick: () =>
    
                    {}}
                     
                ]
              });
          }).catch(function(error) {
           
          });
     }
    const aler=()=>{
        return <div className="verified">
        <div className="d-flex align-items-center">
        <p>your account s not verified   </p>
        <div className="shp mx-4" onClick={verify}>Click to verify</div>
        </div>
       
        <CloseIcon style={{cursor:"pointer"}} onClick={close}/>
    </div>
    }
    return (
        <div>
        { aff&&user?user.emailVerified?<div></div>:aler():<div></div>
             
        }
        </div>
    )
}

export default Verified
