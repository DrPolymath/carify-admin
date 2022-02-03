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
import { deleteCarBrand } from "../../actions/carBrand.actions";

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

const DeleteCarBrand = ({carBrand, handleClose, deleteCarBrand}) => {
  const classes = useStyles();

  const handleSubmit = (e, carBrand) => {
    e.preventDefault();
    deleteCarBrand(carBrand);
    handleClose();
  };

  return (
    <form
      id="deleteCarBrandForm"
      noValidate
      autoComplete="off"
      //   onSubmit={handleSubmit()}
    >
      <Typography variant="body1" className={classes.field}>
        Are you sure to permanently delete {carBrand.carBrandName} from CARIFY? You cannot recover
        the changes later.
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
          onClick={(e) => handleSubmit(e, carBrand)}
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
    deleteCarBrand: (carBrand) => dispatch(deleteCarBrand(carBrand)),
  };
};

export default connect(null, mapDispatchToProps)(DeleteCarBrand);
