import React from "react";
import {
  Box,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { deleteTransmission } from "../../actions/transmissionDetail.action";

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

const DeleteTransmission = ({deleteTransmission, carVariant, transmission, handleClose,}) => {
    const classes = useStyles();

    const handleSubmit = (e, carVariant) => {
      e.preventDefault();
      deleteTransmission(carVariant, transmission);
      handleClose();
    };

    return (
        <form
          id="deleteTransmissionForm"
          noValidate
          autoComplete="off"
        >
          <Typography variant="body1" className={classes.field}>
            Are you sure to permanently delete {carVariant.carBrandName} {carVariant.carModelName} {carVariant.carVariantName} transmission details?
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
    deleteTransmission: (carVariant, engine) =>
      dispatch(deleteTransmission(carVariant, engine)),
  };
};

export default connect(null, mapDispatchToProps)(DeleteTransmission);
