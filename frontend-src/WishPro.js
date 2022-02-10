import React, { useEffect } from 'react'
import "./WindowPro.css"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {Link} from "react-router-dom";
import { useStateValue } from "./StateProvider";
import ContentLoader from 'react-content-loader'

import Productel from './Productel';
function WishPro(props) {
  const [{favori},dispatch] = useStateValue();
  const MyLoader = () => (
    <ContentLoader viewBox="0 0 400 180">
<rect x="0" y="0" rx="5" ry="5" width="95" height="140" />
    <rect x="100" y="0" rx="5" ry="5" width="95" height="140" />
    <rect x="200" y="0" rx="5" ry="5" width="95" height="140" />
    <rect x="300" y="0" rx="5" ry="5" width="95" height="140" />
    </ContentLoader>
  )

  useEffect(() => {
    console.log("hiiiiii");
    dispatch({
      type:"SET_PAGE",
      page:1
    })
  }, [])
   
    return (<div className="cont wishlist">
      <h1 className="mb-5 m-t-100">FAVORI-LIST</h1>
      <div className="product_path"><Link to="/" style={{textDecoration:"none",color:" #fca311"}}>Home <ArrowForwardIosIcon/></Link><Link to="/shop"style={{textDecoration:"none",color:" #fca311"}}> Shop <ArrowForwardIosIcon/></Link> Favorite List</div>

       <h5 style={{color:"#888"}}>{favori.length===0?"FAVORI-LIST empty":""}</h5> 
       {props.loading?MyLoader():
      <Productel onClick={(pro)=>console.log("hii")} data={favori} />}
     
      
    </div>

    )
}

export default WishPro
