import React, { useEffect, useState } from 'react'
import "./contact.css"
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { useStateValue } from "./StateProvider";
import {db,firebase} from "./firebase";

function Contact() {
    const [{user}, dispatch] = useStateValue();
        const [ema, setema] = useState(user?.email);
        const [sub, setsub] = useState();
        const [mes, setmes] = useState()
        useEffect(() => {
         setema(user?.email);
        }, [user])
    const sendEmail=(e)=>{
        console.log("hmd");
        e.preventDefault();
        db.collection("messages").add({
            email: ema,
            subject: sub,
            message: mes,
            datesend:firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(function(docRef) {
            setema("");
            setsub("");
            setmes("");
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        
     
              }
    return (
        <div className="contact_all">
            <div className="Contact_first"><h2>Contact</h2></div>
          <div className="cont contact_fall">
            <div className="contact_form_all">
                <div className="contact_form">
                   <form onSubmit={(e)=>{sendEmail(e)}}>
                       <h4>Send Us a message</h4>
                       <div className="contact_email">
                        <MailOutlineIcon/> 
                       <input type="email" value={ema} onChange={e=>setema(e.target.value)} className="contact_email_inp" name="email" placeholder="Your Email Address"/>
                       </div>
                       <div className="contact_email">
                        <SendRoundedIcon/> 
                       <input type="text" name="suject"  value={sub} onChange={e=>setsub(e.target.value)} className="contact_email_inp"  placeholder="Subject"/>
                       </div>
                       <textarea value={mes} onChange={e=>setmes(e.target.value)} placeholder="How we can Help you ?" name="message">

                       </textarea>
                       <button className="shpi mt-3 sub"  type="submit">Send Your Message</button>
                   </form>
                </div>
                <div className="contact_info">
                   <div className="contact_icnfo_o">
                        <div className="d-flex contact_info_f">
                         <LocationOnOutlinedIcon/> 
                         <div>
                             <h3>Adresse</h3>
                             <p>Bordj Bou Arreridj ,Algerie :D</p>
                         </div>
                        </div>
                        <div className="d-flex contact_info_f">
                         <CallOutlinedIcon/>
                         <div>
                             <h3>Lets Talk</h3>
                             <p>+213664035598</p>
                         </div>
                        </div>
                        <div className="d-flex contact_info_f">
                         <MailOutlineIcon/> 
                         <div>
                             <h3>Sale Support</h3>
                             <p>mohamedlahouassa325@ gmail.com</p>
                         </div>
                        </div>

                   </div>
                </div>
            </div>
            </div>
            <div className="contact_map"></div>
        </div>
    )
}

export default Contact
