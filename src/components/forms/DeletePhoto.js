import React, { useState } from "react";
import {
  Box,
  Button,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { deleteCarPhoto } from "../../actions/carPhoto.actions";

const useStyles = makeStyles((theme) => {
    return {
      field: {
        marginTop: 20,
        marginBottom: 20,
        width: 500,
        display: "block",
      },
      buttonContainer: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 40,
      },
      button: {
        paddingLeft: 20,
        paddingRight: 20,
        width: 85,
        marginLeft: 20,
      },
    };
  });

  const DeletePhoto = ({carVariant, photo, handleClose, deleteCarPhoto, selectedPhoto }) => {
    const classes = useStyles();
    console.log(carVariant)
    console.log(photo)
    const handleSubmit = (e) => {
      e.preventDefault();
      deleteCarPhoto(carVariant, photo);
      handleClose();
    };

    if(selectedPhoto){
        return (
        <form
          id="deletePhotoForm"
          noValidate
          autoComplete="off"
          //   onSubmit={handleSubmit()}
        >
          <Typography variant="body1" className={classes.field}>
          Are you sure to permanently delete selected photo from photo list?
          </Typography>
          <Box align="center" className={classes.buttonContainer}>
            <Button
              className={classes.button}
              onClick={() => handleClose()}
              color="primary"
              variant="contained"
            >
              NO
            </Button>
            <Button
              className={classes.button}
              onClick={(e) => handleSubmit(e)}
              color="primary"
              variant="outlined"
            >
              YES
            </Button>
          </Box>
        </form>
      );
    } else{
        return (
            <form
              id="deletePhotoForm2"
              noValidate
              autoComplete="off"
              //   onSubmit={handleSubmit()}
            >
              <Typography variant="body1" className={classes.field}>
              Please select a photo to delete.
              </Typography>
              <Box align="center" className={classes.buttonContainer}>
                <Button
                  className={classes.button}
                  onClick={() => handleClose()}
                  color="primary"
                  variant="contained"
                >
                  OK
                </Button>
              </Box>
            </form>
        )
    }
    
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        deleteCarPhoto: (carVariant, photo) => dispatch(deleteCarPhoto(carVariant, photo)),
    };
  };
  
  export default connect(null, mapDispatchToProps)(DeletePhoto);