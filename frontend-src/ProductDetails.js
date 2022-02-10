import React, { useState } from 'react'
import ReactImageMagnify from 'react-image-magnify';
import { useStateValue } from "./StateProvider";
import "./Productdetails.css"
import {Link,useHistory} from "react-router-dom";
import {inCart,inFavori} from "./reducer"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { confirmAlert } from 'react-confirm-alert';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Comments from './Comments';

function ProductDetails(props) {
    const [{currentProduct,cart,favori}, dispatch] = useStateValue();
    const history=useHistory();
   const [quantity, setquantity] = useState(1);

    const imageProps = {
        smallImage: {
          alt: 'Phasellus laoreet',
          isFluidWidth: true,
          src: currentProduct?.image
        },
        largeImage: {
          src: currentProduct?.image,
          width: 1200,
          height: 1800
        },
        enlargedImageContainerStyle: { background: '#fff', zIndex: 9 }
      };
      const AddToCart=()=>{
        
        if(currentProduct){
            const index = cart.findIndex(
                (cartItem) => cartItem.id === currentProduct.sku
              );

                if(index===-1){
                    dispatch({
                        type: "ADD_TO_CART",
                        item: {id:currentProduct.sku,product:currentProduct,quantity:quantity},
                    });
                }
                else{
                    dispatch({
                        type: "SET_QUANTITY",
                        id:cart[index].id,
                        quantity:quantity+cart[index].quantity
                    });

                }
          
             
        } 
        history.push('/');

    }


 const handlech=(e)=>{
   if(e<1){
     e=1; }

     setquantity(e);
 }
 const addToFavori=()=>{
 
  if(inFavori(favori,currentProduct.sku)){
      confirmAlert({
          title: 'UNLIKE',
          message: 'Are You SURE !',
          buttons: [
            {
              label: 'Yes',
              onClick: () =>
              { dispatch({
                  type:"REMOVE_FROM_FAVORI",
                  id:currentProduct.sku
              })}},
              {
                  label: 'No',
                  onClick: () =>
  
                  { }}
            
          
          ]
        });
  }
  else{
  dispatch({
      type:"ADD_TO_FAVORI",
      item:currentProduct
  })

  
  confirmAlert({
      title: 'Merci',
      message: currentProduct?.name+' is added to wishlist !',
      buttons: [
        {
          label: 'Ok',
          onClick: () =>

          {}}
            
        
      
      ]
    });

}
}



      if(!currentProduct.name){  history.push('/')}
    return (<div className="cont mymr">
      <div className="product_path"><Link to="/" style={{textDecoration:"none",color:" #fca311"}}>Home <ArrowForwardIosIcon/></Link><Link to="/shop"style={{textDecoration:"none",color:" #fca311"}}> Shop <ArrowForwardIosIcon/></Link> {currentProduct.name}</div>
    <div className="myrow">
                       
                       <div className=" col-md-6 col-lg-6 p-b-35">
                          <div className="p-l-25 p-r-30 p-lr-0-lg showd" >
                            
                             <div className="big_image_de">
                              
                             <ReactImageMagnify {...imageProps} />
                             </div>
                          </div>
                       
                       
                       </div>
                    
    
                       <div className=" col-md-6 col-lg-6 p-b-35">
                        <div className="p-l-25 p-r-30 p-lr-0-lg showe" >
                        <h3>{inCart(cart,currentProduct?.sku)===-1?"":"(This Product is in Your Cart)"}</h3>  
                          <h4>{currentProduct.name}</h4>
                          <h3><div className="heartbtn1" onClick={()=>addToFavori()}>
                          {inFavori(favori,currentProduct.sku)?<FavoriteIcon/>:<FavoriteBorderIcon/>}
                     </div></h3>
                          <h3>$ {currentProduct.price}</h3>
                          <p>{currentProduct.description}</p>
                          <p className="mb-5">{currentProduct.type}</p>
                          <div className="detail_counter_add mt-5">
                            <div className="detail_counter">
                                 <div className="counter_btn" onClick={()=>handlech(quantity-1)}><RemoveIcon/></div>
                                 <input type="number"  value={quantity} onChange={(e)=>handlech(e.target.value)}   min="0" />
                                 <div className="counter_btn" onClick={()=>handlech(quantity+1)}><AddIcon/></div>
                            </div>
                            <div >
                            <p className="shp py-0" onClick={()=>AddToCart()}>ADD TO CART</p>
                          <Link to="/cart" className="tdn">  <p className="shpi py-0 wh" >VIEW CART</p></Link>
                            </div>
                          </div>
                          
    
    
                        </div>

                        </div>
                       </div>
                   
                      <Comments/>
                    
                        
                       </div>
      )}

export default ProductDetails
