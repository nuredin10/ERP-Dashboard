import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Card,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText ,
} from "@mui/material";
const ConfirmDialog = ({dialogOpen,handleClose,title,message,confirmAction}) => {

    console.log(dialogOpen)
//    dialogOpen ? console.log("asasasas") : console.log("BOoooooooooooooommmmmmmmmmmmm");
  return (
    
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>No</Button>
          <Button onClick={confirmAction} autoFocus variant='contained'>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    
  );
};

export default ConfirmDialog;
