import React from 'react'
import "./WindowPro.css"
import CloseIcon from '@material-ui/icons/Close';
import { useStateValue } from "./StateProvider";
import { useHistory } from 'react-router-dom';
function WindowPro(props) {
  const history=useHistory();
  const [{cart}, dispatch] = useStateValue();
  const RemoveFrom=()=>{
    
    dispatch({
      type:"REMOVE_FROM_CART",
      id:props?.info?.id
    })
  }
 const details=()=>{
   
 
    dispatch({
        type:"SET_CURRENT",
        item:props?.info?.product
    }  
    );
   history.push("/prod");
}
    return (
        <div className="product">
             <img src={props?.info?.product?.image} alt="prood" />
             <div className="prod_info">
                <p className="tit ptr" onClick={()=>details()}> 
                {props?.info?.product?.name}</p>
               <p className="price">{props?.info?.quantity}  x ${props?.info?.product?.price}</p> 
             </div>
             <CloseIcon  className="icon" onClick={RemoveFrom} />
        </div>
    )
}

export default WindowPro
