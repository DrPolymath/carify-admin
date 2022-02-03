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
import { deleteCarModel } from "../../actions/carModel.actions";

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

const DeleteCarModel = ({ carModel, handleClose, deleteCarModel, handleRerender, handleTableRerender }) => {
  const classes = useStyles();

  const handleSubmit = (e, carModel) => {
    e.preventDefault();
    deleteCarModel(carModel);
    handleClose();
    handleTableRerender(carModel)
    handleRerender(carModel)
  };

  return (
    <form
      id="deleteCarModelForm"
      noValidate
      autoComplete="off"
      //   onSubmit={handleSubmit()}
    >
      <Typography variant="body1" className={classes.field}>
        Are you sure to permanently delete {carModel.carModelName} from CARIFY?
        You cannot recover the changes later.
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
          onClick={(e) => handleSubmit(e, carModel)}
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
    deleteCarModel: (carModel) => dispatch(deleteCarModel(carModel)),
  };
};

export default connect(null, mapDispatchToProps)(DeleteCarModel);
