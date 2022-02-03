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
  console.log(carVariant);

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
    setToSave(true);
    handlePriceRange();
    props.handleClose();
  };

  const handleChange = (e) => {
    setCarVariant({
      ...carVariant,
      [e.target.id]: e.target.value,
    });
  };

  React.useEffect(() => {
    console.log(toSave);
    if (toSave && carVariant !== null) {
      props.updateCarVariant(carVariant);
      props.handleRerender(carVariant);
    }
  }, [toSave, carVariant]);

  return (
    <form
      id="updateCarVariantForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {console.log(props)}
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
