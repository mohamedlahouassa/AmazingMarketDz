import React, { Component } from 'react'
import "./Single.css"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import {inCart,inFavori} from "./reducer"
import { StateContext } from "./StateProvider";
import { withRouter } from "react-router-dom";

import { confirmAlert } from 'react-confirm-alert';
 class Product extends Component {
    static contextType=StateContext;
    constructor(props) {
        super(props);
        this.state = {
           heart:false,
           details:false,
           
        };
      } 
    addToFavori=()=>{
        const [{favori}, dispatch] = this.context;
        if(inFavori(favori,this.props.info.sku)){
            confirmAlert({
                title: 'UNLIKE',
                message: 'Are You SURE !',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () =>
                    { dispatch({
                        type:"REMOVE_FROM_FAVORI",
                        id:this.props.info.sku
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
            item:this.props.info
        })
    
        confirmAlert({
            title: 'Merci',
            message: this.props?.info?.name+' is added to wishlist !',
            buttons: [
              {
                label: 'Ok',
                onClick: () =>

                {}}
                  
              
            
            ]
          });
    
    }
    }
    details=()=>{
        const [{favori}, dispatch] = this.context;
     
        dispatch({
            type:"SET_CURRENT",
            item:this.props.info
        }
            
        );
        this.props.history.push("./prod");
    }
    render() {
        const [{cart,favori}] = this.context;
        return (
            <div className="Product_st col-sm-6 col-md-4 col-lg-3 p-b-35 " >
                <div className="hp">
                <img src={this.props.info.image} alt="Product"/>
             <p className="hms"onClick={this.props.onClick} >Quick View</p>
                </div>
               
        
                <div className="Product_title">
                     <p onClick={()=>this.details()}>{this.props.info.name}</p>
                     
                     <div className="heartbtn" onClick={()=>this.addToFavori()}>
                          {inFavori(favori,this.props.info.sku)?<FavoriteIcon/>:<FavoriteBorderIcon/>}
                     </div>
                </div>
                <p>{this.props.info.type}</p>
                <div className="d-flex justify-content-between">
                <p className="Product_price">$ 
                {this.props.info.price}
                </p>
                <p className="incart">{
                    inCart(cart,this.props.info.sku)===-1?"":"(IN CART)"
                    
                    }</p>
                </div>



               
            </div>
        )
    }
}
export default withRouter(Product);