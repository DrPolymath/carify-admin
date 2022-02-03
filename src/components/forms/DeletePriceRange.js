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
import { deletePriceRange } from "../../actions/priceRange.actions";

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

const DeletePriceRange = ({ priceRange, handleClose, deletePriceRange }) => {
  const classes = useStyles();

  const handleSubmit = (e, priceRange) => {
    e.preventDefault();
    deletePriceRange(priceRange);
    handleClose();
  };

  const priceRangeString = () => {
    return (
      "( RM " + priceRange.minPrice + " < price < RM " + priceRange.maxPrice + ")"
    );
  };

  return (
    <form
      id="deletePriceRangeForm"
      noValidate
      autoComplete="off"
      //   onSubmit={handleSubmit()}
    >
      <Typography variant="body1" className={classes.field}>
        Are you sure to permanently delete this price range {priceRangeString()}{" "}
        from CARIFY? You cannot recover the changes later.
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
          onClick={(e) => handleSubmit(e, priceRange)}
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
    deletePriceRange: (priceRange) => dispatch(deletePriceRange(priceRange)),
  };
};

export default connect(null, mapDispatchToProps)(DeletePriceRange);
