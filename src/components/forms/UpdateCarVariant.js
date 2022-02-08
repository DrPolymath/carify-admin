import React, { useState } from "react";
import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { updateCarVariant } from "../../actions/carVariant.actions";

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

const UpdateCarVariant = (props) => {
  const classes = useStyles();
  const [carVariant, setCarVariant] = useState(props.carVariant);
  const [toSave, setToSave] = React.useState(false);
  const [priceConverted, setPriceConverted] = React.useState(
    parseInt(props.carVariant.price.substring(3).replace(",", ""))
  );
  const [errors, setErrors] = useState({});
  const [errorFlags, setErrorFlags] = useState({});
  const [validated, setValidated] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const handlePriceRange = () => {
    let priceTemp = parseInt(priceConverted).toLocaleString();
    priceTemp = "RM " + priceTemp;
    let priceRangeTemp = props.priceRanges.map((item) => {
      if (
        priceConverted > parseInt(item.minPrice, 10) &&
        priceConverted < parseInt(item.maxPrice, 10)
      )
        return {
          prId: item.id,
          priceRange: item.minPrice + "<" + item.maxPrice,
        };
    });
    priceRangeTemp = priceRangeTemp.filter((a) => a);
    priceRangeTemp.map((item) => {
      setCarVariant({
        ...carVariant,
        priceRange: item.priceRange,
        prId: item.prId,
        price: priceTemp,
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  const handleChange = (e) => {
    setCarVariant({
      ...carVariant,
      [e.target.id]: e.target.value,
    });
  };

  React.useEffect(() => {
    if (toSave && carVariant !== null) {
      props.updateCarVariant(carVariant);
      props.handleRerender(carVariant);
    }
  }, [toSave, carVariant]);

  React.useEffect(() => {
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
      setToSave(true);
      handlePriceRange();
      props.handleClose();
    }
  }, [validated]);

  const validate = () => {
    let temp = { ...errors };
    let flagTemp = { ...errorFlags };

    temp.carVariantName =
    carVariant.carVariantName === "" ? "Variant name is required" : "";
    console.log("carVariant.priceConverted")
    console.log(priceConverted)
    if (priceConverted === "") {
      temp.priceConverted = "Price is required";
    } else if (isNaN(priceConverted)) {
      temp.priceConverted = "Price must only contain numbers";
    } else if (parseInt(priceConverted) < 0) {
      temp.priceConverted = "Please insert valid price";
    } else {
      temp.priceConverted = "";
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
      id="updateCarVariantForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="carVariantName"
        type="text"
        onChange={handleChange}
        value={carVariant.carVariantName}
        className={classes.field}
        label="Variant Name"
        variant="outlined"
        color="secondary"
        fullWidth
        required
        error={errorFlags[0]}
        helperText={errors.carVariantName}
      />

      <TextField
        id="carPrice"
        type="number"
        onChange={(e) => setPriceConverted(e.target.value)}
        value={priceConverted}
        className={classes.field}
        label="Price"
        variant="outlined"
        color="secondary"
        fullWidth
        required
        error={errorFlags[1]}
        helperText={errors.priceConverted}
      />

      <Box align="center" className={classes.buttonContainer}>
        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
      </Box>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCarVariant: (carVariant) => dispatch(updateCarVariant(carVariant)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateCarVariant);
