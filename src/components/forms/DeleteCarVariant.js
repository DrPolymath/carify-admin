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
import { deleteCarVariant } from "../../actions/carVariant.actions";

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

const DeleteCarVariant = ({ carVariant, handleClose, deleteCarVariant, handleRerender, handleTableRerender }) => {
  const classes = useStyles();

  const handleSubmit = (e, carVariant) => {
    e.preventDefault();
    deleteCarVariant(carVariant);
    handleClose();
    // handleTableRerender(carVariant)
    // handleRerender(carVariant)
  };

  return (
    <form
      id="deleteCarVariantForm"
      noValidate
      autoComplete="off"
      //   onSubmit={handleSubmit()}
    >
      <Typography variant="body1" className={classes.field}>
        Are you sure to permanently delete {carVariant.carBrandName} {carVariant.carModelName} {carVariant.carVariantName} from CARIFY?
        You cannot recover the changes later.
      </Typography>
      <Box align="center" className={classes.buttonContainer}>
      {console.log(carVariant)}
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
          onClick={(e) => handleSubmit(e, carVariant)}
          color="primary"
          variant="outlined"
        >
          YES
        </Button>
      </Box>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCarVariant: (carVariant) => dispatch(deleteCarVariant(carVariant)),
  };
};

export default connect(null, mapDispatchToProps)(DeleteCarVariant);
