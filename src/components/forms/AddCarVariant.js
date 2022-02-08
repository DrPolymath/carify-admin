import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addCarVariant } from "../../actions/carVariant.actions";

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
    loadingcontainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing(10),
      width: "100%",
      height: "80%",
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
    {
      colorName: "",
      colorCode: "",
      errorName: "",
      errorFlagName: false,
      errorCode: "",
      errorFlagCode: false,
    },
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
  const [errors, setErrors] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const [validated, setValidated] = React.useState(false);
  const [initialRender, setInitialRender] = React.useState(true);

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
        colorList,
      });
    }
  }, [carVariantName, cmId, price, priceRange, prId, colorList]);

  useEffect(() => {
    if (toSave && carVariant !== null) {
      addCarVariant(carVariant, cbId);
      handleRerender(carVariant);
      // console.log("added car variant");
      // console.log(carVariant);
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
    setColorList([
      ...colorList,
      {
        colorName: "",
        colorCode: "",
        errorName: "",
        errorFlagName: false,
        errorCode: "",
        errorFlagCode: false,
      },
    ]);
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
    validate();
  };

  React.useEffect(() => {
    if (initialRender === true) {
      setValidated(false);
      setInitialRender(false);
    } else if (Object.values(errors).every((x) => x === "")) {
      let allPass = false;
      colorList.map((item) => {
        if (item.errorName === "" && item.errorCode === "") {
          allPass = true;
        } else {
          allPass = false;
        }
      });
      if (allPass) {
        setValidated(true);
      } else {
        setValidated(false);
      }
    } else {
      setValidated(false);
    }
  }, [errors]);

  React.useEffect(() => {
    if (validated === true) {
      setToSave(true);
      handlePriceRange();
      handleClose();
    }
  }, [validated]);

  const validate = () => {
    let temp = { ...errors };
    let flagTemp = { ...errorFlags };

    temp.cbId = cbId === "" ? "Brand is required" : "";
    temp.cmId = cmId === "" ? "Model is required" : "";
    temp.carVariantName =
      carVariantName === "" ? "Variant name is required" : "";

    if (price === "") {
      temp.price = "Price is required";
    } else if (isNaN(price)) {
      temp.price = "Price must only contain numbers";
    } else if (parseInt(price) < 0) {
      temp.price = "Please enter valid price";
    } else {
      temp.price = "";
    }

    flagTemp = Object.entries(temp).map((item) => {
      if (item[1] === "") {
        return item[0], false;
      } else {
        return item[1], true;
      }
    });

    let colorObjects = colorList;
    colorList.map((item, index) => {
      let tempErrorName = item.errorName;
      let tempErrorCode = item.errorCode;
      let tempErrorFlagName = item.errorFlagName;
      let tempErrorFlagCode = item.errorFlagCode;

      if (item.colorName === "") {
        tempErrorName = "Color name is required";
        tempErrorFlagName = true;
      } else {
        tempErrorName = "";
        tempErrorFlagName = false;
      }

      if (item.colorCode === "") {
        tempErrorCode = "Color code is required";
        tempErrorFlagCode = true;
      } else if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$$/.test(item.colorCode)) {
        tempErrorCode = "Please remove #";
        tempErrorFlagCode = true;
      } else if (!/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$$/.test(item.colorCode)) {
        tempErrorCode = "Color code must be in HEX format";
        tempErrorFlagCode = true;
      } else {
        tempErrorCode = "";
        tempErrorFlagCode = false;
      }

      colorObjects[index] = {
        ...colorObjects[index],
        errorName: tempErrorName,
        errorFlagName: tempErrorFlagName,
        errorCode: tempErrorCode,
        errorFlagCode: tempErrorFlagCode,
      };
    });
    setColorList(colorObjects);

    setErrors({
      ...temp,
    });
    setErrorFlags({
      ...flagTemp,
    });
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
        error={errorFlags[0]}
        helperText={errors.cbId}
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
        error={errorFlags[1]}
        helperText={errors.cmId}
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
        error={errorFlags[2]}
        helperText={errors.carVariantName}
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
        error={errorFlags[3]}
        helperText={errors.price}
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
            error={singleColor.errorFlagName}
            helperText={singleColor.errorName}
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
            error={singleColor.errorFlagCode}
            helperText={singleColor.errorCode}
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
