import React from 'react'
import './Home.css'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import { Animated } from "react-animated-css";

import StorefrontIcon from '@material-ui/icons/Storefront';
import { Link } from 'react-router-dom';


export class Home extends React.Component{

  render() {
    return (
      <div>
     
        <Slide easing="ease">
        <div className="each-slide">
          <div style={{ 'backgroundImage': "url(https://preview.colorlib.com/theme/cozastore/images/slide-01.jpg)" }}>
            <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
              <span className="frs animate__animated animate__bounce" >
                Open Your Own Market Now  <StorefrontIcon/>
             </span>
            </Animated>
            <h2 className="seas">NEW Edition</h2>
           <Link className="tdn" to="/market"> <p className="shp"><StorefrontIcon/>Open Market</p></Link>
          </div>
        </div>
        <div className="each-slide">
          <div style={{ 'backgroundImage': "url(https://preview.colorlib.com/theme/cozastore/images/slide-02.jpg)" }}>
            <span className="frs">
              Men Collection 2020
             </span>
            <h2 className="seas">
              Jackets & Coats</h2>
              <p className="shp">SHOP NOW</p>
          </div>
        </div>
        <div className="each-slide">
          <div style={{ 'backgroundImage': "url(https://preview.colorlib.com/theme/cozastore/images/slide-03.jpg)" }}>
            <span className="frs">
              Men Collection 2020
             </span>
            <h2 className="seas">
              New arrivals</h2>
              <p className="shp">SHOP NOW</p>
          </div>
        </div>
      </Slide>
  
      </div>
    )
  }
}



export default Home;
