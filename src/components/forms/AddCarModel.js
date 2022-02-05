import {
  Box,
  Button,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { addCarModel } from "../../actions/carModel.actions";
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
      display: "flex",
      justifyContent: "flex-end",
    },
    input: {
      display: "none",
    },
    imageInputContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    chooseImgBtnContainer: {
      display: "flex",
      justifyContent: "center",
      padding: theme.spacing(2),
    },
    helperText: {
      paddingLeft: theme.spacing(1.5),
      color: "#FF0000",
    },
  };
});

const AddCarModel = ({
  carBrands,
  addCarModel,
  handleClose,
  carTypes,
  handleRerender,
}) => {
  const classes = useStyles();

  const [carModelName, setCarModelName] = React.useState("");
  const [carBrandName, setCarBrandName] = React.useState("");
  const [cbId, setCbId] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(undefined);
  const [btId, setBtId] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const [validated, setValidated] = React.useState(false);
  const [initialRender, setInitialRender] = React.useState(true);

  const processedCarBrands = carBrands.map((item) => {
    return {
      label: item.carBrandName,
      value: item.id,
    };
  });
  const processedCarTypes = carTypes.map((item) => {
    return {
      label: item.carTypeName,
      value: item.id,
    };
  });

  const handleImgChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  React.useEffect(() => {
    let carBrandsTemp = carBrands.map((item) => {
      if (item.id === cbId) {
        return item.carBrandName;
      }
    });
    carBrandsTemp = carBrandsTemp.filter((a) => a);
    setCarBrandName(carBrandsTemp[0]);
  }, [cbId]);

  React.useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

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
      const uploadTask = storage
        .ref("images/modelLogo/" + image.name)
        .put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            let carModelWithUrl = {
              carModelName: carModelName,
              cbId: cbId,
              btId: btId,
              url: url,
            };
            addCarModel(carModelWithUrl, carBrandName);
            handleClose();
            handleRerender(cbId);
          });
        }
      );
    }
  }, [validated]);

  const validate = () => {
    let temp = { ...errors };
    let flagTemp = { ...errorFlags };

    temp.cbId = cbId === "" ? "Brand is required" : "";
    temp.carModelName = carModelName === "" ? "Model Name is required" : "";
    temp.btId = btId === "" ? "Body Type is required" : "";
    temp.image = image === null || undefined ? "Image is required" : "";

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
        onChange={(e) => setCbId(e.target.value)}
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
        type="text"
        onChange={(e) => setCarModelName(e.target.value)}
        value={carModelName}
        className={classes.field}
        label="Model Name"
        variant="outlined"
        color="secondary"
        fullWidth
        required
        error={errorFlags[1]}
        helperText={errors.carModelName}
      />

      <TextField
        id="carBrandName"
        select
        label="Body Type"
        value={btId}
        onChange={(e) => setBtId(e.target.value)}
        className={classes.field}
        variant="outlined"
        required
        error={errorFlags[2]}
        helperText={errors.btId}
      >
        {processedCarTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Box className={classes.imageInputContainer}>
        <input
          accept="image/*"
          className={classes.input}
          id="image"
          multiple
          type="file"
          onChange={handleImgChange}
        />
        <label htmlFor="image" className={classes.chooseImgBtnContainer}>
          {image ? (
            <img src={preview} alt="modelLogo" width="150" />
          ) : (
            <img src="/ImgPlaceholder.png" alt="ImgPlaceholder" />
          )}
        </label>
      </Box>

      {errorFlags[3] && (
        <Typography variant="caption" className={classes.helperText}>
          {errors.image}
        </Typography>
      )}

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
    addCarModel: (carModel, carBrandName) =>
      dispatch(addCarModel(carModel, carBrandName)),
  };
};

export default connect(null, mapDispatchToProps)(AddCarModel);
