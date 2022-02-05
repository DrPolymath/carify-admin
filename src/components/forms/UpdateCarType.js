import React from "react";
import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { updateCarType } from "../../actions/carType.actions";
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

const UpdateCarType = (props) => {
  const classes = useStyles();

  const [carType, setCarType] = React.useState(props.carType);
  const [image, setImage] = React.useState("");
  const [preview, setPreview] = React.useState(undefined);
  const [errors, setErrors] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const [validated, setValidated] = React.useState(false);
  const [initialRender, setInitialRender] = React.useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  const uploadImage = () => {
    const uploadTask = storage
      .ref("images/carTypeLogo/" + image.name)
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
            props.updateCarType(carType, url);
          })
          .then(() => {
            props.handleClose();
            props.handleCloseMoreMenu();
          });
      }
    );
  };

  const handleChange = (e) => {
    setCarType({
      ...carType,
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
        props.updateCarType(carType, "");
        props.handleClose();
        props.handleCloseMoreMenu();
      } else if (image === "") {
        props.updateCarType(carType, carType.url);
        props.handleClose();
        props.handleCloseMoreMenu();
      } else {
        if (carType.url) {
          var fileRef = storage.refFromURL(carType.url);
          fileRef.delete().then(() => {
            uploadImage();
          });
        } else {
          uploadImage();
        }
      }
    }
  }, [validated]);

  const validate = () => {
    let temp = { ...errors };
    let flagTemp = { ...errorFlags };

    temp.carTypeName =
      carType.carTypeName === "" ? "Body Type is required" : "";
    temp.image =
      carType.image === null || undefined ? "Body Type is required" : "";

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
      id="updateCarTypeForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="carTypeName"
        type="text"
        onChange={handleChange}
        value={carType.carTypeName}
        className={classes.field}
        label="Body Type Name"
        variant="outlined"
        color="secondary"
        fullWidth
        required
        error={errorFlags[0]}
        helperText={errors.carTypeName}
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
          {image ? (
            <img src={preview} alt="brandLogo" width="150" />
          ) : (
            <img src={carType.url} alt="ImgPlaceholder" width="150" />
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
    updateCarType: (carType, url) => dispatch(updateCarType(carType, url)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateCarType);
