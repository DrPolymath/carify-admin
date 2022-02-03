import React from "react";
import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { updateCarBrand } from "../../actions/carBrand.actions";
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
  };
});

const UpdateCarBrand = (props) => {
  const classes = useStyles();

  const [carBrand, setCarBrand] = React.useState(props.carBrand);
  const [image, setImage] = React.useState("");
  const [preview, setPreview] = React.useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image === "") {
      props.updateCarBrand(carBrand, carBrand.url);
      props.handleClose();
    } else {
      const uploadTask = storage
        .ref("images/brandLogo/" + image.name)
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
              props.updateCarBrand(carBrand, url);
            })
            .then(() => {
              var fileRef = storage.refFromURL(carBrand.url);
              fileRef.delete().then(() => {
                props.handleClose();
              });
            });
        }
      );
    }
  };

  const handleChange = (e) => {
    setCarBrand({
      ...carBrand,
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

  return (
    <form
      id="updateCarBrandForm"
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
        // error={titleError}
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
            <img src={carBrand.url} alt="ImgPlaceholder" width="150" />
          )}
        </label>
      </Box>

      <Box align="center" className={classes.buttonContainer}>
        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
      </Box>

      {/* <div className="red-text center">
                { authError ? <p>{ authError }</p> : null }
            </div> */}
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCarBrand: (carBrand, url) => dispatch(updateCarBrand(carBrand,url)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateCarBrand);
