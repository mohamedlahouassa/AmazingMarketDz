import React, { Component } from 'react'
import './Nav.css';
import logo from './images/logo.png'
import Avatar from 'react-avatar';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import CurrencyFormat from 'react-currency-format';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import "./BasketWindow.css"
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import WindowPro from './WindowPro';
import {Link} from "react-router-dom";
import ContentLoader from 'react-content-loader'

import { StateContext } from "./StateProvider";
import { auth } from "./firebase";
import { withRouter } from "react-router-dom";
import { getCartTotal } from './reducer';
import Verified from './verified';
import { Spinner } from 'react-bootstrap';

class Nav extends Component {
   static contextType=StateContext;
    constructor(props) {
        super(props);
        this.state = {
            search:false,
            list:false,
            fenetre:false,
            scrolling:false,
        };
      }
      toggle=(e)=>{
        this.setState({[e]:!this.state[e]});
      }
      componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
     
      }
 
    componentWillUnmount() {
         window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll=(event)=> {
        if (window.scrollY === 0 && this.state.scrolling === true) {
            this.setState({scrolling: false});
        }
        else if (window.scrollY !== 0 && this.state.scrolling !== true) {
            this.setState({scrolling: true});
        }
    }
    MyLoader = () => (
        <ContentLoader style={{marginTop:"10px"}} viewBox="0 0 400 70">
         
          <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
          <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
          <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
        </ContentLoader>
      )

  signed =()=>{
    const [{user,cart}, dispatch] = this.context;

    if(user){
        
   this.setState({list:false});
 
        confirmAlert({
            title: 'Sign Out',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>

                {
                    const pr=this.props
                    auth.signOut().then(function() {
                        pr.history.push("/");
                    }).catch(function(error) {
                     alert(error.message);
                    });
                }
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          });





       
    }
    else{
   
        this.props.history.push("./login");

    }
   
    }
    render() {
        const [{user,cart,favori}, dispatch] = this.context;
   
        return (
           
            
            <div className="head">
               
            <div className="nav" style={{backgroundColor:this.state.scrolling?"white":"transparent"}}>
                <div className="first">
                 <Link to="/">  <img src={logo} alt="logo" /></Link> 
                    <ul className="nav_list">
                        <li><Link to="/"><a href="#">Home</a></Link></li>
                        <li><Link to="/shop" ><a href="#">Shop</a></Link></li>
                        <li><Link to="/cart"><a href="#">Feature</a></Link></li>
                        <li><Link to="/account"><a href="#">Account</a></Link></li>
                        <li><Link to="/wish"><a href="#">Favorite </a></Link></li>
                        <li><Link to="/contact"><a href="#">Contact</a></Link></li>

                    </ul>
                  
                </div>
                <div className="second">
                 <Link to="/account" style={{textDecoration:"none"}}>   <div className="ic sr" onClick={()=>this.toggle("search")}>
                        <PersonIcon />
                    </div></Link>
                    <div className="ic">

                        <ShoppingCartIcon onClick={()=>this.toggle("fenetre")}/>
                        {this.props.loading?<p style={{backgroundColor:"transparent"}}><Spinner animation="border" size="sm" /></p>:<p>{cart.length}</p>}
                    </div>
                <Link to="/wish">    <div className="ic">

                        <FavoriteBorderIcon />
                        {this.props.loading?<p style={{backgroundColor:"transparent"}}><Spinner animation="border" size="sm" /></p>:<p>{favori.length}</p>}

                    </div></Link>
                    <div className="ic menu" onClick={()=>this.toggle("list")} >
                        <MenuIcon />
                    </div>
                    
                    <div className="nav_profile"  >
                    <Link to='/register'  style={{textDecoration:"none"}}> {user?user?.photoURL?<img src={user.photoURL} className="picroun" />:<Avatar name={user?.displayName}  color="#fca311" size={38}  round="50%"  />:<Avatar name={user?.displayName}  color="#fca311" size={38}  round="50%"  />}</Link> 
                          <div className="nav_profile_info">
                          <div className="guest" ><b>Hello ,</b> {user?user?.displayName:"Guest"}</div>
                          <div  onClick={()=>this.signed()} className="signedou">{user?"Sign out":"Sign in"}</div>

                          </div>
                    </div>
                   

                </div>
            </div>
           
            <ul className="nav_list2" style={{display:this.state.list?"block":"none"}} >
            
         <div className="nav_profile2"  >
    <Link to='/register'  style={{textDecoration:"none"}}>{user?user?.photoURL?<div style={{background:"url("+user.photoURL+")",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className="picroun" ></div>:<Avatar name={user?.displayName}  color="#fca311" size={38}  round="50%"  />:<Avatar name={user?.displayName}  color="#fca311" size={38}  round="50%"  />}</Link> 
                          <div className="nav_profile_info">
                              <div className="guest"><b>Hello ,</b> {user?user?.displayName:"Guest"}</div>
                              <div  onClick={()=>this.signed()} className="signedou">{user?"Sign out":"Sign in"}</div>
                          </div>
                    </div>
                         <li><Link to="/"><a href="#">Home</a></Link></li>
                        <li><Link to="/shop" ><a href="#">Shop</a></Link></li>
                        <li><Link to="/cart"><a href="#">Feature</a></Link></li>
                        <li><Link to="/account"><a href="#">Account</a></Link></li>
                        <li><Link to="/wish"><a href="#">Favorite </a></Link></li>
                        <li><Link to="/contact"><a href="#">Contact</a></Link></li>
            </ul>
          <div className="par" style={{visibility:this.state.fenetre?"visible":"hidden"}} >
                <div className="ch1" style={{opacity:this.state.fenetre?1:0}} onClick={()=>this.toggle("fenetre")} ></div>
                <div className="child" style={{transform:this.state.fenetre?"scaleX(1)":"scaleX(0)"}} >
                   
                        <div className="title">
                            <p>YOUR CARD ({cart.length} items)</p>
                            <CloseIcon style={{ fontSize: 37, cursor: "pointer" }} onClick={()=>this.toggle("fenetre")} />
                        </div>
                
                        <div className="products">
                        {this.props.loading?this.MyLoader():<></>}
                        {this.props.loading?this.MyLoader():<></>}
                        {this.props.loading?this.MyLoader():<></>}
                            {!this.props.loading?
                                cart.map((el)=>{
                                  return  <WindowPro info={el} />

                                }):<></>
                            }
                      
                        </div>
                    <div className="check">
                    <CurrencyFormat
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
                      
                        <div className="btns">
                        <Link to="/cart" onClick={()=>this.toggle('fenetre')}> <div >VIEW CART</div></Link>
                            <div >CHECK OUT</div>
                        </div>
                    </div>
                </div>
            </div>

            <Verified/> 
        </div>
        )
    }
}

export default withRouter(Nav);