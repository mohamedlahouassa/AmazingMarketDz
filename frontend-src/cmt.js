import Avatar from '@material-ui/core/Avatar';

import React from 'react'
import './Comments.css'

function Cmt(props) {
    return (
        <div className="comment">
            <Avatar style={{backgroundColor:"#fca311"}} src={props?.url}>{props.name[0]}</Avatar>
            <div className="comments_info">
                <p className="comments_title">{props.name}</p>
                <p className="comments_core">{props.body}</p>
            </div>
        </div>
    )
}

export default Cmt
