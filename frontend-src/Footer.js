import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import './Footer.css'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
export default class Footer extends Component {
    render() {
        return (
            <footer className="ftr ">
                 <div className="cont" >
                    <Row>
                   <Col sm={6} lg={3} className="fot_col p-b-50">
                        <h4 class="stext">Categories </h4>
                        <ul className="away">
                            <li class="p-b-10"><a href="#" class="stext-107 cl7 hov-cl1 trans-04">   Women</a>  </li>
                            <li class="p-b-10"><a href="#" class="stext-107 cl7 hov-cl1 trans-04">   Men</a>  </li>
                            <li class="p-b-10"><a href="#" class="stext-107 cl7 hov-cl1 trans-04">   Shoes</a>  </li>
                            <li class="p-b-10"><a href="#" class="stext-107 cl7 hov-cl1 trans-04">   Watches</a>  </li>
            
                        </ul>
                        </Col>
                   <Col sm={6} lg={3} className="fot_col p-b-50"> <h4 class="stext">Me</h4>
                        <ul className="away">
                            <li class="p-b-10"><a href="#" class="stext-107 cl7 hov-cl1 trans-04">Account</a>  </li>
                            <li class="p-b-10"><a href="#" class="stext-107 cl7 hov-cl1 trans-04">Features</a>  </li>
                            <li class="p-b-10"><a href="#" class="stext-107 cl7 hov-cl1 trans-04">Likes</a></li>
                         
            
                        </ul></Col>
                   <Col sm={6} lg={3} className="fot_col p-b-50"> <h4 class="stext">GET IN TOUCH </h4>
                          <a href="#">Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879</a>
                        
                        </Col>
                   <Col sm={6} lg={3} className="fot_col p-b-50"> <h4 class="stext">Follow us </h4>
                        <ul className="away">
                            <li class="p-b-10"><a href="#" class="stext-107 cl7 hov-cl1 trans-04"> <FacebookIcon/>  </a>  </li>
                            <li class="p-b-10"><a href="#" class="stext-107 cl7 hov-cl1 trans-04">  <InstagramIcon/> </a>  </li>
                            <li class="p-b-10"><a href="#" class="stext-107 cl7 hov-cl1 trans-04"> <LinkedInIcon/> </a>  </li>
                        
            
                        </ul></Col>
                    </Row>


                 </div>
            </footer>
        )
    }
}
