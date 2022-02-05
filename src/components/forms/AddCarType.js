import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { addCarType } from "../../actions/carType.actions";
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

const AddCarType = (props) => {
  const classes = useStyles();

  const [carType, setCarType] = React.useState({
    carTypeName: "",
    image: null,
  });
  const [errors, setErrors] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const [validated, setValidated] = React.useState(false);
  const [initialRender, setInitialRender] = React.useState(true);
  const [preview, setPreview] = React.useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  const handleChange = (e) => {
    setCarType({
      ...carType,
      [e.target.id]: e.target.value,
    });
  };

  const handleImgChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setCarType({
        ...carType,
        image: undefined,
      });
      return;
    }
    setCarType({
      ...carType,
      [e.target.id]: e.target.files[0],
    });
  };

  React.useEffect(() => {
    if (!carType.image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(carType.image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [carType]);

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
      if (carType.image) {
        const uploadTask = storage
          .ref("images/carTypeLogo/" + carType.image.name)
          .put(carType.image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              let carTypeWithUrl = {
                carTypeName: carType.carTypeName,
                image: carType.image,
                url: url,
              };
              props.addCarType(carTypeWithUrl);
              props.handleClose();
            });
          }
        );
      }
    }
  }, [validated]);

  const validate = () => {
    let temp = { ...errors };
    let flagTemp = { ...errorFlags };

    temp.carTypeName =
      carType.carTypeName === "" ? "Body Type is required" : "";
    temp.image =
      carType.image === null || undefined ? "Image is required" : "";

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
      id="addCarTypeForm"
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
          {carType.image ? (
            <img src={preview} alt="carTypeLogo" width="150" />
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
    addCarType: (carType) => dispatch(addCarType(carType)),
  };
};

export default connect(null, mapDispatchToProps)(AddCarType);
