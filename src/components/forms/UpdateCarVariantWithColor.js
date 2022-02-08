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
  const [errors, setErrors] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const [validated, setValidated] = React.useState(false);
  const [initialRender, setInitialRender] = React.useState(true);
  const [priceConverted, setPriceConverted] = React.useState(
    parseInt(props.carVariant.price.substring(3).replace(",", ""))
  );

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

  const handleChange = (e) => {
    setCarVariant({
      ...carVariant,
      [e.target.id]: e.target.value,
    });
  };

  const addErrorHandling = () => {
    if (
      colorList[0].colorCode &&
      colorList[0].colorName &&
      colorList[0].id &&
      colorList[0].vId
    ) {
      let holdColorList = colorList;
      colorList.map((item, index) => {
        // if(item.colorCode)
        holdColorList[index] = {
          ...holdColorList[index],
          errorName: "",
          errorFlagName: false,
          errorCode: "",
          errorFlagCode: false,
        };
      });
      setColorList(holdColorList);
    }
  };

  React.useEffect(() => {
    if (toSave && carVariant !== null) {
      props.updateCarVariant(carVariant);
      props.updateCarVariantColor(colorList, carVariant);
      props.handleClose();
      // console.log("updateCarVariant");
      // console.log(carVariant);
      // console.log(colorList);
    }
  }, [toSave, carVariant]);

  React.useEffect(() => {
    addErrorHandling();
  }, [colorList]);

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
    }
  }, [validated]);

  const validate = () => {
    let temp = { ...errors };
    let flagTemp = { ...errorFlags };

    temp.carVariantName =
      carVariant.carVariantName === "" ? "Variant name is required" : "";

    if (priceConverted === "") {
      temp.priceConverted = "Price is required";
    } else if (isNaN(priceConverted)) {
      temp.priceConverted = "Price must only contain numbers";
    } else if (parseInt(priceConverted) < 0) {
      temp.priceConverted = "Please enter valid price";
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
    updateCarVariant: (carVariant) => dispatch(updateCarVariant(carVariant)),
    updateCarVariantColor: (carVariant, colorList) =>
      dispatch(updateCarVariantColor(carVariant, colorList)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateCarVariantWithColor);
