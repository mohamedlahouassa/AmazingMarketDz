import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Cmt from './cmt';
import Avatar from '@material-ui/core/Avatar';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import './Comments.css'
import { CommentsData } from "./commentsData";
import { useStateValue } from "./StateProvider";

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
function Comments() {
    const [{user}, dispatch] = useStateValue();
    const [number, setnumber] = useState(2);
    const [Comments, setComments] = useState(CommentsData);
    const [comm, setcomm] = useState("");
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const isEmpty=(str)=>{
        return str === null || str.match(/^ *$/) !== null;
    }
    const AddComment=(e)=>{
    e.preventDefault();
        console.log(comm);
        if(isEmpty(comm)){
            
        }
        else{
  
         const a={postId:1,id:1,name:user?.displayName,email:user?.email,body:comm,url:user?.photoURL}
        const comma=[a,...Comments]
         setComments(comma);
         setcomm("");
        }
    }
    const AddCommentNouser=(e)=>{
      e.preventDefault();
          console.log(comm);
          if(isEmpty(comm) || isEmpty(name)||isEmpty(email)){
              
          }
          else{
    
           const a={postId:1,id:1,name:name,email:email,body:comm}
          const comma=[a,...Comments]
           setComments(comma);
           setcomm("");
           setname("");
           setemail("");
          }
      }
    useEffect(() => {
      //Server Side places
    }, [Comments])
    return (
        <div>
      
      <Row className="comments_all">
            
        <Col sm={10} md={8} lg={6} className="comments_bloc mx-auto">

     
        
        <div class="d-flex  justify-content-between my-3" style={{width:"100%"}}>
            <UnfoldMoreIcon onClick={()=>number<Comments.length?setnumber(number+2):setnumber(Comments.length)} style={{cursor:"pointer"}}/> 
            <p className="comments_title">Comments</p>
            <p className="comments_title">{number}/{Comments.length}</p>
            </div> 
       <div className="comm_bloc"> {
            Comments.slice(0,number).map((el)=>{
               return <Cmt name={el.name} body={el.body} url={el.url}/>
                
            })
        }
        </div>         <div className="comment_readMore my-3" onClick={()=>number<Comments.length?setnumber(number+3):setnumber(Comments.length)}>{number!=Comments.length?<span><MoreHorizIcon/>Read More</span>:<span>Full Comments</span>}</div>

        <div class="comment_add">
         <p class="comments_title">Your review</p> 
         {user?<form onSubmit={(e)=>{AddComment(e)}} class="comment_int">
                 <Avatar src={user?.photoURL} style={{backgroundColor:"#fca311"}} >{user?.displayName[0]}</Avatar>  
                 <input type="text" value={comm} onChange={e=>{setcomm(e.target.value)}} placeholder="Leave Comments..." />
                <button type="submit" className="add_comment">Comment</button >
             </form>:<form onSubmit={(e)=>{AddCommentNouser(e)}} class="comment_int_nouser">
             <input type="text" placeholder="Leave Comments..."  value={comm} onChange={e=>{setcomm(e.target.value)}} />
               <div className="comment_info_nouser"> <input type="text"  placeholder="Your Name" value={name} onChange={e=>{setname(e.target.value)}} />
                 <input type="email"  placeholder="Your Email" value={email} onChange={e=>{setemail(e.target.value)}} /></div> 
                <button type="submit" className="add_comment add_nouser">Comment</button >
             </form>}
             
        </div>
       
        
        </Col>
     

      </Row>
      </div>
    )
}

export default Comments
