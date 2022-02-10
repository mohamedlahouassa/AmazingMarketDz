import React from 'react'
import './market.css'
import { Link } from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import {db, auth,firebase } from "./firebase";
function Market() {
    const [{user}, dispatch] = useStateValue();
    const nouser=()=>{
        return(
        <div className="nousermarket">
          <h2>To create market you should have account</h2>
          <div className="shp my-3">Login</div>
          <div className="shpi">Register</div>

        </div>);
    }
    const withuser=()=>{
        return (<div className="withusermarket">
                   <form>
                       <input type="text" placeholder="Your Market Name" />
                      
                   </form>

                </div>);
    }
    return (
        <div className="cart cont">
           {withuser()}
        </div>
    )
}

export default Market
