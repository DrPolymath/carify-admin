import React from "react";
import {
  Box,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { deleteEngine } from "../../actions/engineDetail.action";

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

const DeleteEngine = ({deleteEngine, carVariant, engine, handleClose,}) => {
    const classes = useStyles();

    const handleSubmit = (e, carVariant) => {
      e.preventDefault();
      deleteEngine(carVariant, engine);
      handleClose();
    };

    return (
        <form
          id="deleteEngineForm"
          noValidate
          autoComplete="off"
        >
          <Typography variant="body1" className={classes.field}>
            Are you sure to permanently delete {carVariant.carBrandName} {carVariant.carModelName} {carVariant.carVariantName} engine details?
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
    deleteEngine: (carVariant, engine) =>
      dispatch(deleteEngine(carVariant, engine)),
  };
};

export default connect(null, mapDispatchToProps)(DeleteEngine);
