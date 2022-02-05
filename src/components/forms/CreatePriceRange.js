import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { createPriceRange } from "../../actions/priceRange.actions";

const useStyles = makeStyles((theme) => {
  return {
    field: {
      marginTop: 20,
      marginBottom: 20,
      width: 300,
      display: "block",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
  };
});

const CreatePriceRange = (props) => {
  const classes = useStyles();

  const [priceRange, setPriceRange] = React.useState({
    maxPrice: "",
    minPrice: "",
  });
  const [errors, setErrors] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const [validated, setValidated] = React.useState(false);
  const [initialRender, setInitialRender] = React.useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  const handleChange = (e) => {
    setPriceRange({
      ...priceRange,
      [e.target.id]: e.target.value,
    });
  };

  React.useEffect(() => {
    console.log(errors);
    if (initialRender === true) {
      setValidated(false);
      setInitialRender(false);
    } else if (Object.values(errors).every((x) => x === "")) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [errors]);

  React.useEffect(() => {
    if (validated === true) {
      props.createPriceRange(priceRange);
      props.handleClose();
    }
  }, [validated]);

  const validate = () => {
    let temp = { ...errors };
    let flagTemp = { ...errorFlags };

    if (parseInt(priceRange.maxPrice) < parseInt(priceRange.minPrice)) {
      temp.maxPrice = "Invalid price pair";
      temp.minPrice = "Invalid price pair";
    } else if (
      parseInt(priceRange.maxPrice) === parseInt(priceRange.minPrice)
    ) {
      temp.maxPrice = "Invalid price pair";
      temp.minPrice = "Invalid price pair";
    } else {
      if (priceRange.maxPrice === "") {
        temp.maxPrice = "Maximum price is required";
      } else if (isNaN(priceRange.maxPrice)) {
        temp.maxPrice = "Maximum price must only contain numbers";
      } else if (parseInt(priceRange.maxPrice) < 0) {
        temp.maxPrice = "Please insert valid maximum price";
      } else {
        temp.maxPrice = "";
      }

      if (priceRange.minPrice === "") {
        temp.minPrice = "Minimum price is required";
      } else if (isNaN(priceRange.minPrice)) {
        temp.minPrice = "Minimum price must only contain numbers";
      } else if (parseInt(priceRange.minPrice < 0)) {
        temp.minPrice = "Please insert valid Minimum price";
      } else {
        temp.minPrice = "";
      }
    }

    flagTemp = Object.entries(temp).map((item) => {
      if (item[1] === "") {
        return item[0], false;
      } else {
        return item[1], true;
      }
    });

    setErrors({
      ...temp,
    });
    setErrorFlags({
      ...flagTemp,
    });
  };

  return (
    <form
      id="createPriceRangeForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="maxPrice"
        type="number"
        onChange={handleChange}
        value={priceRange.maxPrice}
        className={classes.field}
        label="Maximum Price"
        variant="outlined"
        color="secondary"
        fullWidth
        required
        error={errorFlags[0]}
        helperText={errors.maxPrice}
      />
      <TextField
        id="minPrice"
        type="number"
        onChange={handleChange}
        value={priceRange.minPrice}
        className={classes.field}
        label="Minimum Price"
        variant="outlined"
        color="secondary"
        fullWidth
        required
        error={errorFlags[1]}
        helperText={errors.minPrice}
      />

      <Box align="center" className={classes.buttonContainer}>
        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
      </Box>

      {/* <div className="red-text center">
                { authError ? <p>{ authError }</p> : null }
            </div> */}
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPriceRange: (priceRange) => dispatch(createPriceRange(priceRange)),
  };
};

export default connect(null, mapDispatchToProps)(CreatePriceRange);
