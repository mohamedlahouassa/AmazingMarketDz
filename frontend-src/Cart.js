import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import "./Cart.css"
import CartProduct from './CartProduct'
import CurrencyFormat from 'react-currency-format';
import ContentLoader from 'react-content-loader'

import EuroIcon from '@material-ui/icons/Euro';
import { StateContext } from "./StateProvider";
import { getCartTotal } from './reducer';
export default class Cart extends Component {
  static contextType=StateContext;
 MyLoader = () => (
    <ContentLoader style={{margin:"10px"}} viewBox="0 0 400 70">
     
      <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
      <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
      <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    </ContentLoader>
  )
    render() {
      const [{cart}, dispatch] = this.context;
      
      
        return (

            <div className="cart">
            <h1>Your Shopping Basket</h1>
           
            <Row style={{justifyContent:"center"}}>
              <Col lg={10} xl={7} className="cart_ele">
                <div className="cart_table">
                 <div className="cart_table_head">
                     <p style={{width:"30%"}}>PRODUCT</p>
                     <p  >PRICE</p>
                     <p>QUANTITY</p>
                     <p>TOTAL</p>	
                 </div>
                 <div className="cart_table_content">
                 {this.props.loading?this.MyLoader():<></>}
                 {this.props.loading?this.MyLoader():<></>}
                 {this.props.loading?this.MyLoader():<></>}
                   {!this.props.loading?
                     cart.map(el=>{
                       return <CartProduct info={el}/>
                     })
                   :<></>}
                 
               
                 </div>
                </div>
              </Col>
              <Col lg={7} xl={5} sm={10} className="cart_ele">
              <div className="cart_shipp">
                  <h4>Cart Totals</h4>
                  <div >
                  

                    <p className="shipp_def">Subtotal:</p>
                    <p className="shipp_def2">   <CurrencyFormat
                                renderText={(value) => (
                                <>  <p>
                                    Total: {value}
                                    </p>
                                </>
                                )}
                                decimalScale={2}
                            value={getCartTotal(cart)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                      </p>
                   </div>
                   <a href="#" className="shp" ><EuroIcon/> CHECKOUT</a>
              </div>
              </Col>

              

            </Row>
            </div>
        )
    }
}
