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
import { updateCarModel } from "../../actions/carModel.actions";
import { storage } from "../../config/fbConfig";

const useStyles = makeStyles((theme) => {
  return {
    field: {
      marginTop: 20,
      marginBottom: 20,
      width: 300,
      display: "block",
    },
    input: {
      display: "none",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
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

const UpdateCarModel = (props) => {
  const classes = useStyles();
  const [carModel, setCarModel] = useState(props.carModel);
  const [carType, setCarType] = useState(props.carModel.btId);
  const [image, setImage] = React.useState("");
  const [preview, setPreview] = React.useState(undefined);
  const [errors, setErrors] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const [validated, setValidated] = React.useState(false);
  const [initialRender, setInitialRender] = React.useState(true);

  const processedCarTypes = props.carTypes.map((item) => {
    return {
      label: item.carTypeName,
      value: item.id,
    };
  });
  console.log(carModel);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  const handleChange = (e) => {
    setCarModel({
      ...carModel,
      [e.target.id]: e.target.value,
    });
  };

  const handleImgChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }
    setImage(e.target.files[0]);
  };

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
      if (preview === undefined) {
        props.updateCarModel(carModel, carType, props.carModel.url);
        props.handleClose();
      } else {
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
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then((url) => {
                props.updateCarModel(carModel, carType, url);
              })
              .then(() => {
                var fileRef = storage.refFromURL(props.carModel.url);
                fileRef.delete().then(() => {
                  props.handleClose();
                });
              });
          }
        );
      }
    }
  }, [validated]);

  const validate = () => {
    let temp = { ...errors };
    let flagTemp = { ...errorFlags };

    temp.carModelName =
      carModel.carModelName === "" ? "Model name is required" : "";
    temp.carType = carType === "" ? "Body Type is required" : "";
    temp.image = image === null || undefined ? "Image is required" : "";

    flagTemp = Object.entries(temp).map((item) => {
      if (item[1] === "") {
        return item[0], false;
      } else {
        return item[1], true;
      }
    });
    console.log(temp);
    console.log(flagTemp);
    setErrors({
      ...temp,
    });
    setErrorFlags({
      ...flagTemp,
    });
  };

  return (
    <form
      id="updateCarModelForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="carModelName"
        type="text"
        onChange={handleChange}
        value={carModel.carModelName}
        className={classes.field}
        label="Model Name"
        variant="outlined"
        color="secondary"
        fullWidth
        required
        error={errorFlags[0]}
        helperText={errors.carModelName}
      />
      <TextField
        id="carType"
        select
        label="Body Type"
        value={carType}
        onChange={(e) => setCarType(e.target.value)}
        className={classes.field}
        variant="outlined"
        fullWidth
        required
        error={errorFlags[1]}
        helperText={errors.carType}
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
            <img src={props.carModel.url} alt="ImgPlaceholder" width="150" />
          )}
        </label>
      </Box>

      {errorFlags[2] && (
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
    updateCarModel: (carModel, carType, url) =>
      dispatch(updateCarModel(carModel, carType, url)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateCarModel);
