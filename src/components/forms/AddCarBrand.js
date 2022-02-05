import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { addCarBrand } from "../../actions/carBrand.actions";
import { storage } from "../../config/fbConfig";

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

const AddCarBrand = (props) => {
  const classes = useStyles();
  const [errors, setErrors] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const [validated, setValidated] = React.useState(false);
  const [initialRender, setInitialRender] = React.useState(true);
  const [carBrand, setCarBrand] = React.useState({
    carBrandName: "",
    image: null,
  });

  const [preview, setPreview] = React.useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
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
      if (carBrand.image) {
        const uploadTask = storage
          .ref("images/brandLogo/" + carBrand.image.name)
          .put(carBrand.image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              // console.log(url)
              let carBrandWithUrl = {
                carBrandName: carBrand.carBrandName,
                image: carBrand.image,
                url: url,
              };
              props.addCarBrand(carBrandWithUrl);
              props.handleClose();
            });
          }
        );
      }
    }
  }, [validated]);

  React.useEffect(() => {
    if (!carBrand.image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(carBrand.image);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [carBrand]);

  const validate = () => {
    let temp = { ...errors };
    let flagTemp = { ...errorFlags };

    temp.carBrandName =
      carBrand.carBrandName === "" ? "Brand name is required" : "";
    temp.image =
      carBrand.image === null || undefined ? "Brand logo is required" : "";

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

  const handleChange = (e) => {
    setCarBrand({
      ...carBrand,
      carBrandName: e.target.value,
    });
  };

  const handleImgChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setCarBrand({
        ...carBrand,
        image: undefined,
      });
      return;
    }
    setCarBrand({
      ...carBrand,
      [e.target.id]: e.target.files[0],
    });
  };

  return (
    <form
      id="addCarBrandForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="carBrandName"
        type="text"
        onChange={handleChange}
        value={carBrand.carBrandName}
        className={classes.field}
        label="Brand Name"
        variant="outlined"
        color="secondary"
        fullWidth
        required
        error={errorFlags[0]}
        helperText={errors.carBrandName}
      />

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
          {carBrand.image ? (
            <img src={preview} alt="brandLogo" width="150" />
          ) : (
            <img src="/ImgPlaceholder.png" alt="ImgPlaceholder" />
          )}
        </label>
      </Box>

      {errorFlags[1] && (
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
    addCarBrand: (carBrand) => dispatch(addCarBrand(carBrand)),
  };
};

export default connect(null, mapDispatchToProps)(AddCarBrand);
