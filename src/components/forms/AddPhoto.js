import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { addPhoto } from "../../actions/carPhoto.actions";
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
      width: 300,
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

const AddPhoto = ({ addPhoto, handleClose, carVariant }) => {
  const classes = useStyles();
  const [photos, setPhotos] = React.useState({
    cmId: "",
    image: null,
  });
  const [preview, setPreview] = React.useState(undefined);
  const [errors, setErrors] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const [validated, setValidated] = React.useState(false);
  const [initialRender, setInitialRender] = React.useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  const handleChange = (e) => {
    setPhotos({
      ...photos,
    });
  };

  const handleImgChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      // setImage(undefined)
      setPhotos({
        ...photos,
        image: undefined,
      });
      return;
    }
    setPhotos({
      ...photos,
      [e.target.id]: e.target.files[0],
    });
  };

  React.useEffect(() => {
    if (!photos.image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(photos.image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [photos]);

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
      if (photos.image) {
        const uploadTask = storage
          .ref(
            "images/carPhotos/" +
              carVariant.carBrandName +
              "/" +
              carVariant.carModelName +
              "/" +
              photos.image.name
          )
          .put(photos.image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              // console.log(url)
              let photosWithUrl = {
                cmId: carVariant.cmId,
                carPhoto: url,
              };
              addPhoto(carVariant, photosWithUrl);
              handleClose();
            });
          }
        );
      }
    }
  }, [validated]);

  const validate = () => {
    let temp = { ...errors };
    let flagTemp = { ...errorFlags };

    temp.image =
    photos.image === null || undefined ? "Image is required" : "";

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
      id="addPhotoForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
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
          {photos.image ? (
            <img src={preview} alt="carPhoto" width="150" />
          ) : (
            <img src="/ImgPlaceholder.png" alt="ImgPlaceholder" />
          )}
        </label>
      </Box>
      
      {errorFlags[0] && (
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
    addPhoto: (carVariant, photo) => dispatch(addPhoto(carVariant, photo)),
  };
};

export default connect(null, mapDispatchToProps)(AddPhoto);
