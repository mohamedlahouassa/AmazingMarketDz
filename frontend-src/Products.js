import React, { Component } from 'react'
import "./Products.css"
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { stockData } from "./stock";
import Productel from './Productel';
import { StateContext } from "./StateProvider";
import ReactImageMagnify from 'react-image-magnify';
import {inCart,inFavori} from "./reducer"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { confirmAlert } from 'react-confirm-alert';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
export default class Products extends Component {
    
    static contextType=StateContext;

    constructor(props) {
        super(props);
        this.state = {
           
            details:false,
            quantity:1,
            item:{},
            actif2:0,
            actif1:0,
            actif3:0,
            searchval:'',
            minmax:[0,1000000000],
            type:'',
            data:stockData
        };
      }
        componentDidUpdate() {
        if(this.state.quantity<1){
            this.setState({quantity:1})
        }
        }
       
     
        togg=(item)=>{
                
                this.setState({details:!this.state.details});
               this.setState({item});
                this.state.details?console.log('.'):this.setState({quantity:0})
        }
        handleChange=(event)=> {
                this.setState({quantity: event.target.value});
        }
        handleSearch=(e)=>{
           this.setState({searchval:e.target.value},()=>{
               this.filtering();
           })
            
        }
        filterByPrice=(i,min,max)=>{
            this.setState({actif2:i});
            this.setState({minmax:[min,max]},()=>{
                this.filtering();
            })
            
        }
        sort = (a,sortType) => {
              this.setState({actif1:a});
            if (sortType === "asc") {
              this.setState({data: this.state.data.sort(function(a, b) {
                  return a.price - b.price
                }), sortType: "asc"
              });
            } else if (sortType === "desc") {
              this.setState({data: this.state.data.sort(function(a, b) {
                  return b.price - a.price
                }), sortType: "desc"
              });
            }
        }
        default=()=>{
            this.setState({actif1:0});
            this.filtering();

           
        }
        filterByType=(a,type)=>{
            this.setState({actif3:a,type:type},()=>{
            
                this.filtering();
            })

        }
        filtering=()=>{
           
            const [{page,currentProduct}, dispatch] = this.context;
            const {minmax,type,searchval}=this.state;
          
            if(page!=1){
                dispatch({
                    type: "SET_PAGE",
                    page: 1,
                  });
        }
        let b=[];
        stockData.filter(item => item.price>=minmax[0] && item.price<=minmax[1] && item.name.toLowerCase().includes(searchval.toLowerCase()) &&  item.type.toLowerCase().includes(type.toLowerCase()) ).map(el=>{
            b.push(el);
                 });
                 this.setState({data:b});

   
        }
    AddToCart=()=>{
        const [{cart,currentProduct}, dispatch] = this.context;
        if(this.state.item){
            const index = cart.findIndex(
                (cartItem) => cartItem.id === this.state.item.sku
              );

                if(index===-1){
                    dispatch({
                        type: "ADD_TO_CART",
                        item: {id:this.state.item.sku,product:this.state.item,quantity:this.state.quantity},
                    });
                }
                else{
                    dispatch({
                        type: "SET_QUANTITY",
                        id:cart[index].id,
                        quantity:this.state.quantity+cart[index].quantity
                    });

                }
          
              this.togg({});
        } 


    }
    addToFavori=()=>{
        const [{cart,favori}, dispatch] = this.context;
        if(inFavori(favori,this.state?.item?.sku)){
          dispatch({
            type:"REMOVE_FROM_FAVORI",
            id:this.state?.item?.sku
        })
        }
        else{
        dispatch({
            type:"ADD_TO_FAVORI",
            item:this.state?.item
        })
    
        confirmAlert({
            title: 'Merci',
            message: this.state?.item?.name+' is added to wishlist !',
            buttons: [
              {
                label: 'Ok',
                onClick: () =>

                {}}
                  
              
            
            ]
          });
    
    }
    }

    render() {
        const [{cart,currentProduct,favori}, dispatch] = this.context;

        const imageProps = {
            smallImage: {
              alt: 'Phasellus laoreet',
              isFluidWidth: true,
              src: this.state?.item?.image
            },
            largeImage: {
              src: this.state?.item?.image,
              width: 1200,
              height: 1800
            },
            enlargedImageContainerStyle: { background: '#fff', zIndex: 9 }
          };
        
        return (
            <div className="products_me">
                <div className="products_nav">
                    <ul>
                        <li  className={this.state.actif3==0?"ele actif":"ele"}  onClick={()=>this.filterByType(0,'')}  >All Products</li>
                        <li className={this.state.actif3==1?"ele actif":"ele"}  onClick={()=>this.filterByType(1,'HardGood')}  > HardGood</li>
                        <li  className={this.state.actif3==2?"ele actif":"ele"} onClick={()=>this.filterByType(2,'Software')}  >Software</li>
                        <li className={this.state.actif3==3?"ele actif":"ele"} onClick={()=>this.filterByType(3,'Game')} >Game</li>
                        
                    </ul>
                   
                    </div>


                    
               <div className="products_search mb-3" >
                   <div> 
                     <SearchIcon style={{fontSize:"17px",marginLeft:"12px"}}/>
                     <input placeholder="Search ....." type="text" className="product_input px-3" value={this.state.searchval} onChange={(e)=>this.handleSearch(e)} />
                   </div>
                 
                </div>
                <div className="filter mt-3" >
                      <div>
                        <p>Sort By</p>
                          <ul className="filter_list">
                              <li><a className={this.state.actif1==0?"hola actif2":"hola"}  onClick={()=>{this.default()}}>Default</a></li>
                              <li><a className={this.state.actif1==1?"hola actif2":"hola"}  onClick={()=>this.sort(1,"asc")}>Price: Low to High</a></li>
                              <li><a className={this.state.actif1==2?"hola actif2":"hola"}  onClick={()=>this.sort(2,"desc")}>Price: High to Low</a></li>
                          </ul>
                      </div>
                      <div>
                        <p>Price</p>
                          <ul className="filter_list">
                              <li ><a className={this.state.actif2==0?"hola actif2":"hola"}   onClick={()=>this.filterByPrice(0,0,100000000)} >  All</a></li>
                              <li><a className={this.state.actif2==1?"hola actif2":"hola"}    onClick={()=>this.filterByPrice(1,0,50)} >$0.00 - $50.00</a></li>
                              <li><a className={this.state.actif2==2?"hola actif2":"hola"}    onClick={()=>this.filterByPrice(2,50,100)} >$50.00 - $100.00</a></li>
                              <li><a className={this.state.actif2==3?"hola actif2":"hola"}    onClick={()=>this.filterByPrice(3,100,150)} >$100.00 - $150.00</a></li>
                              <li><a className={this.state.actif2==4?"hola actif2":"hola"}    onClick={()=>this.filterByPrice(4,150,200)} >$150.00 - $200.00</a></li>
                              <li><a className={this.state.actif2==5?"hola actif2":"hola"}    onClick={()=>this.filterByPrice(5,200,100000000)} >$200.00+</a></li>

                          </ul>
                      </div>
                      <div>
                        <p>type</p>
                          <ul className="filter_list">
                          <li><a className="hola" className={this.state.actif2==5?"hola actif2":"hola"} >all</a></li>
                          <li><a className="hola" className={this.state.actif2==5?"hola actif2":"hola"} > HardGood</a></li>
                              <li><a className="hola" className={this.state.actif2==5?"hola actif2":"hola"} >Software</a></li>
                              <li><a className="hola" className={this.state.actif2==5?"hola actif2":"hola"} >Game</a></li>
                            
                          </ul>
                      </div>
                      <div>
                        <p>Tags</p>
                          <ul className="filter_list">
                              <li><a className="hola">Default</a></li>
                              <li><a className="hola">Popularity</a></li>
                              <li><a className="hola">Average rating</a></li>
                              <li><a className="hola">Newness</a></li>
                              <li><a className="hola">Price: Low to High</a></li>
                              <li><a className="hola">Price: High to Low</a></li>
                          </ul>
                      </div>
                </div>

              
                <p className="numofitems">({this.state.data.length}  Products)</p>
              <Productel onClick={(pro)=>this.togg(pro)} data={this.state.data} />
         

            
              <div className="Product_details" style={{display:this.state.details?"block":"none"}}>
                <div className="details_outside" onClick={()=>this.togg()}></div>
               
                <div className="cont  details_inside" style={{position:"relative"}}>
                <div className="cl_ic2"><CloseIcon  style={{fontSize:"43px"}} onClick={()=>this.togg()} />  </div>
                    <div className="bg0 p-t-60 p-b-30 p-lr-15-lg" >
                    
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
                      <h3>{inCart(cart,this.state?.item?.sku)==-1?"":"(This Product is in Your Cart)"}</h3>  
                      <h4>{this.state?.item?.name}      </h4>
                      <h3><div className="heartbtn1" onClick={()=>this.addToFavori()}>
                          {inFavori(favori,this.state?.item?.sku)?<FavoriteIcon/>:<FavoriteBorderIcon/>}
                     </div></h3>
                      <h3>$ {this.state?.item?.price}</h3>
                      <p>{this.state.item?.description}</p>
                      <div className="detail_counter_add">
                        <div className="detail_counter">
                             <div className="counter_btn" onClick={()=>this.setState({quantity:this.state.quantity-1})}><RemoveIcon/></div>
                             <input type="number" value={this.state.quantity} onChange={this.handleChange}   min="0" />
                             <div className="counter_btn" onClick={()=>this.setState({quantity:this.state.quantity+1})}><AddIcon/></div>
                        </div>
                        <a className="shp" onClick={()=>this.AddToCart()}>ADD TO CART</a>
                      </div>



                    </div>




                    </div>
                   </div>
                   </div>
               
               
               
               
               
                </div>    
                
                </div>
               
            </div>
        )
    }
}
