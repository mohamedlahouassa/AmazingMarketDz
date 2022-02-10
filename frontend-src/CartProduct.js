import React, { Component } from 'react'
import "./CartProduct.css"
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { StateContext } from "./StateProvider";
import CurrencyFormat from 'react-currency-format';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
export default class CartProduct extends Component {
    static contextType=StateContext;
    RemoveFrom=()=>{
        const [{cart}, dispatch] = this.context;
        dispatch({
          type:"REMOVE_FROM_CART",
          id:this.props?.info?.id
        })
      }
    setQuantity=(e)=>{
        const [{cart}, dispatch] = this.context;
        if(e<1){
            e=1;
        }
       console.log("clickedop");
        dispatch({
            type:"SET_QUANTITY",
            id:this.props?.info?.id,
            quantity:e
          })

    }
    render() {
        return (
       
            <div className="cartproduct-tl">
              <div className="cartproduct">
                <div className="cart_product_title">
                    <img src={this.props?.info?.product?.image}/>
                   
                    <p>	{this.props?.info?.product?.name}</p>
                </div>
                
                <CurrencyFormat
                                renderText={(value) => (
                                <>  <p>
                                    Total: {value}
                                    </p>
                                </>
                                )}
                                decimalScale={2}
                            value={this.props?.info?.product?.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                      
                <div className="detail_counter" style={{width:"24%"}}>
                             <div className="counter_btn" onClick={()=>this.setQuantity(this.props?.info?.quantity-1)}><RemoveIcon/></div>
                             <input type="number" value={this.props?.info?.quantity} onChange={(e)=>this.setQuantity(e.target.value)}   min="0" />
                             <div className="counter_btn" onClick={()=>this.setQuantity(this.props?.info?.quantity+1)}><AddIcon/></div>
                        </div>
              
                <CurrencyFormat
                                renderText={(value) => (
                                <>  <p>
                                    Total: {value}
                                    </p>
                                </>
                                )}
                                decimalScale={2}
                            value={this.props?.info?.product?.price*this.props?.info?.quantity}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                </div>
            <div className="prmbtn" >
            <div className="shpi rmbtn" onClick={()=>{this.RemoveFrom()}}>
            <RemoveCircleOutlineIcon/>
          Remove From Cart
            </div>

            </div>
            </div>
         
        )
    }
}
