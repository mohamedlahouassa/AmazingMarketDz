import React from 'react'
import { Row,Col } from 'react-bootstrap'
import "./Content.css"
import Products from './Products'
function Content() {
    return (

        <div className="cont" >
        <Row>
          <Col md={6} xl={4}  className="m-lr-auto colon p-2">
            <div className="fe">
            <img src="https://preview.colorlib.com/theme/cozastore/images/banner-01.jpg"/>
          
            <div className="hv">
             <div className="sprig" >
              <div className="big" >Women</div>
              <div className="sec" >Spring 2018</div>
            </div>
            <span className="sprig2" >
              <div className="biglink" >SHOP NOW</div>
              
            </span>
            </div>
            </div>
          </Col>       
          <Col md={6} xl={4} className="m-lr-auto colon p-2">
          <div className="fe">
          <img src="https://preview.colorlib.com/theme/cozastore/images/banner-02.jpg"/>
         
          <div className="hv">
             <div className="sprig" >
              <div className="big" >Women</div>
              <div className="sec" >Spring 2018</div>
            </div>
            <span className="sprig2" >
              <div className="biglink" >SHOP NOW</div>
            </span>
            </div>
          </div>
          </Col>
          <Col md={6} xl={4} className="m-lr-auto colon p-2">
         
          <div className="fe">
          <img src="https://preview.colorlib.com/theme/cozastore/images/banner-03.jpg"/>
          <div className="hv">
             <div className="sprig" >
              <div className="big" >Women</div>
              <div className="sec" >Spring 2018</div>
            </div>
            <span className="sprig2" >
              <div className="biglink" >SHOP NOW</div>
              
            </span>
            </div>
          </div>
          </Col>   
         </Row>
         <Row  className="mt-5 mrl-auto"><h3 className="over">PRODUCT OVERVIEW</h3></Row>
         <Row >
        <Products/> 
         </Row>
     
      </div>
     

    )
}

export default Content
