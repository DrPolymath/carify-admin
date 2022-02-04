import React, { useState } from "react";
import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { updateCarVariant } from "../../actions/carVariant.actions";
import { updateCarVariantColor } from "../../actions/carVariant.actions";
import { Stack } from "@mui/material";

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

const UpdateCarVariantWithColor = (props) => {
  const classes = useStyles();
  const [carVariant, setCarVariant] = useState(props.carVariant);
  const [colorList, setColorList] = useState(props.colors);
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

  const handleColorChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...colorList];
    list[index][name] = value;
    setColorList(list);
  };

  const getColorNameLabel = (index) => {
    return "Color Name " + (index + 1);
  };

  const getColorCodeLabel = (index) => {
    return "Color Code " + (index + 1);
  };

  const handleColorAdd = () => {
    setColorList([...colorList, { colorName: "", colorCode: "" }]);
  };

  const handleColorDelete = () => {
    const list = [...colorList];
    list.splice(colorList.length - 1, 1);
    setColorList(list);
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
      props.updateCarVariantColor(colorList, carVariant)
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
      {colorList.map((singleColor, index) => (
        <div key={index}>
          <TextField
            name="colorName"
            type="text"
            onChange={(e) => handleColorChange(e, index)}
            value={singleColor.colorName}
            className={classes.field}
            label={getColorNameLabel(index)}
            variant="outlined"
            color="secondary"
            fullWidth
            required
          />

          <TextField
            name="colorCode"
            type="text"
            onChange={(e) => handleColorChange(e, index)}
            value={singleColor.colorCode}
            className={classes.field}
            label={getColorCodeLabel(index)}
            variant="outlined"
            color="secondary"
            fullWidth
            required
          />
          {colorList.length === index + 1 && (
            <Stack spacing={2} direction="row">
              <Button
                color="primary"
                variant="outlined"
                onClick={() => handleColorAdd()}
              >
                Add
              </Button>
              {colorList.length > 1 && (
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => handleColorDelete()}
                >
                  Remove
                </Button>
              )}
            </Stack>
          )}
        </div>
      ))}

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
    updateCarVariantColor: (carVariant, colorList) =>
      dispatch(updateCarVariantColor(carVariant, colorList)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateCarVariantWithColor);
