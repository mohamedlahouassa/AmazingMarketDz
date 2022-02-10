import React, { useState } from 'react'
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
function Blob(props) {
    const [open, setopen] = useState(true);
    
    return (
        <div>
            <Dialog open={open}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.in.tit}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {props.in.message}
          </DialogContentText>
        </DialogContent>
      
     
          <div onClick={props.onClick} className="shp mx-auto my-3">
            OK
          </div>
      
      </Dialog>
        </div>
    )
}

export default Blob
