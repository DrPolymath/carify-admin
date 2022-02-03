import {
  Box,
  Button,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addCarVariant } from "../../actions/carVariant.actions";
import { storage } from "../../config/fbConfig";

const useStyles = makeStyles((theme) => {
  return {
    field: {
      marginTop: 20,
      marginBottom: 20,
      width: 300,
      display: "flex",
    },
    buttonContainer: {
      paddingTop: theme.spacing(2),
      display: "flex",
      justifyContent: "flex-end",
    },
  };
});

const AddCarVariant = ({
  carBrands,
  carModels,
  handleClose,
  handleRerender,
  priceRanges,
  addCarVariant,
}) => {
  const classes = useStyles();

  const [carVariantName, setCarVariantName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [cbId, setCbId] = React.useState("");
  const [cmId, setCmId] = React.useState("");
  const [prId, setPrId] = React.useState("");
  const [priceRange, setPriceRange] = React.useState("");
  const [colorList, setColorList] = React.useState([
    { colorName: "", colorCode: "" },
  ]);
  const [carVariant, setCarVariant] = React.useState(null);
  const [toSave, setToSave] = React.useState(false);
  const [processedCarBrands, setProcessedCarBrands] = React.useState(
    carBrands.map((item) => {
      return {
        label: item.carBrandName,
        value: item.id,
      };
    })
  );
  const [processedCarModels, setProcessedCarModels] = React.useState(
    carModels.map((item) => {
      return {
        cbId: item.cbId,
        label: item.carModelName,
        value: item.id,
      };
    })
  );
  // let carVariant = null;

  useEffect(() => {
    setProcessedCarModels(
      carModels
        .filter((item) => item.cbId === cbId)
        .map((item) => {
          return {
            cbId: item.cbId,
            label: item.carModelName,
            value: item.id,
          };
        })
    );
  }, [cbId]);

  useEffect(() => {
    if (
      carVariantName !== "" &&
      cmId !== "" &&
      price !== "" &&
      priceRange !== "" &&
      prId !== ""
    ) {
      let priceTemp = parseInt(price).toLocaleString();
      priceTemp = "RM " + priceTemp;
      setCarVariant({
        carVariantName,
        cmId,
        price: priceTemp,
        priceRange,
        prId,
        colorList
      });
    }
  }, [carVariantName, cmId, price, priceRange, prId, colorList]);

  useEffect(() => {
    if (toSave && carVariant !== null) {
      addCarVariant(carVariant, cbId);
      handleRerender(carVariant);
    }
  }, [toSave, carVariant]);

  const handleBrandSelection = (e) => {
    setCbId(e.target.value);
  };

  const handlePriceRange = () => {
    let priceRangeTemp = priceRanges.map((item) => {
      if (
        price > parseInt(item.minPrice, 10) &&
        price < parseInt(item.maxPrice, 10)
      )
        return {
          prId: item.id,
          priceRange: item.minPrice + "<" + item.maxPrice,
        };
    });
    priceRangeTemp = priceRangeTemp.filter((a) => a);
    priceRangeTemp.map((item) => {
      setPriceRange(item.priceRange);
      setPrId(item.prId);
    });
  };

  const handleColorChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...colorList];
    list[index][name] = value;
    setColorList(list);
  };

  const handleColorAdd = () => {
    setColorList([...colorList, { colorName: "", colorCode: "" }]);
  };

  const handleColorDelete = () => {
    const list = [...colorList];
    list.splice(colorList.length - 1, 1);
    setColorList(list);
  };

  const getColorNameLabel = (index) => {
    return "Color Name " + (index + 1);
  };

  const getColorCodeLabel = (index) => {
    return "Color Code " + (index + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToSave(true);
    handlePriceRange();
    handleClose();
  };

  return (
    <form
      id="addCarModelForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="carBrandName"
        select
        label="Brand Name"
        value={cbId}
        onChange={(e) => handleBrandSelection(e)}
        className={classes.field}
        variant="outlined"
        required
      >
        {processedCarBrands.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="carModelName"
        select
        label="Model Name"
        value={cmId}
        onChange={(e) => setCmId(e.target.value)}
        className={classes.field}
        variant="outlined"
        required
      >
        {processedCarModels.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="carVariantName"
        type="text"
        onChange={(e) => setCarVariantName(e.target.value)}
        value={carVariantName}
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
        onChange={(e) => setPrice(e.target.value)}
        value={price}
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
    addCarVariant: (carVariant, cbId) =>
      dispatch(addCarVariant(carVariant, cbId)),
  };
};

export default connect(null, mapDispatchToProps)(AddCarVariant);
