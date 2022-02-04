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
import { deleteCarType } from "../../actions/carType.actions";

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

const DeleteCarType = ({
  carType,
  handleClose,
  handleCloseMoreMenu,
  deleteCarType,
}) => {
  const classes = useStyles();

  const handleSubmit = (e, carType) => {
    e.preventDefault();
    deleteCarType(carType);
    handleClose();
    handleCloseMoreMenu();
  };

  return (
    <form id="deleteCarTypeForm" noValidate autoComplete="off">
      <Typography variant="body1" className={classes.field}>
        Are you sure to permanently delete {carType.carTypeName} from CARIFY?
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
          onClick={(e) => handleSubmit(e, carType)}
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
    deleteCarType: (carType) => dispatch(deleteCarType(carType)),
  };
};

export default connect(null, mapDispatchToProps)(DeleteCarType);
