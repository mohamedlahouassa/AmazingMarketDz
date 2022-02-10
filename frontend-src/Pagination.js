import React from 'react'

import { useStateValue } from "./StateProvider";
import './pagination.css';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
function Paginationa(props) {
  

    const [{page}, dispatch] = useStateValue();
const pageNumbers=[];
for(let i=1;i<=Math.ceil(props.total/props.perpage);i++){

    pageNumbers.push(i);
}
const paginate=(nb)=>{
    if(nb<1){
      nb=1;
    }
    if(nb>pageNumbers.length){
        nb=pageNumbers.length;
        
      }
 
    dispatch({
        type: "SET_PAGE",
        page: nb,
      });
}
   if(pageNumbers.length<6){
       return  <ul className="mypag">
           
       
                    {
                    pageNumbers.map(nb=>{
                        

                        
                        if(nb==page){
                            return  <li className="mypageel myact">
                            <a style={{cursor:"pointer"}}  >{nb}</a>
                        </li>
                        }
                        else{
                        return (<li className="mypageel" onClick={()=>{paginate(nb)}}>
                            <a style={{cursor:"pointer"}}  >{nb}</a>
                        </li>);}
                    }) 
                    }

    
      
</ul>
   }



    return (   <ul className="mypag">
           
    <li className="mypageel " onClick={()=>{paginate(page-1)}}>
        <a style={{cursor:"pointer"}}  ><ChevronLeftIcon/></a>
    </li>
    <li className="mypageel " onClick={()=>{paginate(1)}}>
        <a style={{cursor:"pointer"}}  >1</a>
    </li>
    <li className="mypageel ">
        <a style={{cursor:"pointer"}}  ><MoreHorizIcon/></a>
    </li>
{



pageNumbers.map(nb=>{
    if(nb<=page+1 &&nb>=page-1){

   
    if(nb==page){
      return  <li className="mypageel myact">
        <a style={{cursor:"pointer"}}  >{nb}</a>
    </li>
    }
    else{
    return (<li className="mypageel" onClick={()=>{paginate(nb)}}>
        <a style={{cursor:"pointer"}}  >{nb}</a>
    </li>);}
}}) 
}
<li className="mypageel ">
        <a style={{cursor:"pointer"}}  ><MoreHorizIcon/></a>
    </li>
    <li className="mypageel " onClick={()=>{paginate(pageNumbers.length)}}>
        <a style={{cursor:"pointer"}}  >{pageNumbers.length}</a>
    </li>
    <li className="mypageel "  onClick={()=>{paginate(page+1)}}>
        <a style={{cursor:"pointer"}}  ><ChevronRightIcon/></a>
    </li>
 
   
</ul>)
}

export default Paginationa
