import { Box, Button, makeStyles, TextField } from "@material-ui/core";
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
  };
});

const AddPhoto = ({ addPhoto, handleClose, carVariant }) => {
  const classes = useStyles();
  const [photos, setPhotos] = React.useState({
    cmId: '',
    image: null,
  });
  const [preview, setPreview] = React.useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();

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

  return (
    <form
      id="addPhotoForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {/* <TextField
        id="test"
        type="text"
        onChange={handleChange}
        value={photos.cmId}
        className={classes.field}
        label="Test Name"
        variant="outlined"
        color="secondary"
        fullWidth
        required
        // error={titleError}
      /> */}
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
      {console.log(carVariant)}
      {console.log(photos)}
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
