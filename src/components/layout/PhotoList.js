import React, { useState, useCallback } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { CardActionArea } from "@mui/material";
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery from "react-photo-gallery";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Box, Card, Paper } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FormDialog from "../FormDialog";
import Checkbox from "@mui/material/Checkbox";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    padding: theme.spacing(3),
  },
  cardContainer: {
    display: "flex",
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
    minWidth: 200,
    minHeight: 100,
    background: "#f9f9f9",
  },
  clickedcardContainer: {
    display: "flex",
    margin: theme.spacing(1),
    padding: theme.spacing(0.5),
    minWidth: 200,
    minHeight: 100,
    background: "#000000",
  },
  unclickBackground: {
    background: "#f9f9f9",
  },
}));

const PhotoList = ({ carVariantsArr, photos }) => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(0);
  const [select, setSelect] = useState();
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState({ background: "#dddddd" });
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const unclick = "#f9f9f9";
  const clicked = "#000000";
  const [cardBackground, setCardBackground] = useState(classes.cardContainer);
  // { backgroundColor: clicked }

  const [currentSelect, setCurrentSelect] = useState(null);
  const [prevSelect, setPrevSelect] = useState(null);
  const [photo, setPhoto] = useState();
  const [photosFinal, setPhotosFinal] = useState();
  let photosArr = null
  // let photo = photos;

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    // setViewerIsOpen(true);
  }, []);

  const handleSelect = (e, item) => {
    setPrevSelect(currentSelect);
    setCurrentSelect(item);
    // setSelect(item);
  };

  React.useEffect(() => {
    if (
      currentSelect === prevSelect &&
      currentSelect !== null &&
      prevSelect !== null
    ) {
      setCurrentSelect(null);
      setPrevSelect(null);
    }
    // console.log(prevSelect, "prevSelect");
    // console.log(currentSelect, "currentSelect");
    if (photosArr !== null) {
      setPhoto(photosArr.filter((photo) => photo.id === currentSelect));
      console.log(photo)
      console.log(carVariantsArr)
    }
  }, [prevSelect, currentSelect]);

  // React.useEffect(() => {
  //   console.log(photo);
  // }, [photo]);

  // console.log(photos);
  // console.log(carVariantsArr);

  if (photos && carVariantsArr) {
    photosArr = Object.entries(photos).map((key) => ({
      ...key[1],
      id: key[0],
    }));
    photosArr = photosArr.filter(
      (item) => item.cmId === carVariantsArr[0].cmId
    );
    // console.log(photosArr);

    return (
      <Box className={classes.container}>
        <ImageList cols={3}>
          {photosArr.map((item) => (
            <div>
              <Card
                key={item.id}
                onClick={(e) => handleSelect(e, item.id)}
                className={classes.cardContainer}
              >
                <CardActionArea>
                  <ImageListItem>
                    <img
                      src={`${item.carPhoto}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.carPhoto}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      loading="lazy"
                    />
                    {/* <Checkbox {...label} /> */}
                  </ImageListItem>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </ImageList>
        <FormDialog title="Add Car Photo" carVariant={carVariantsArr[0]} />
        <FormDialog
          title="Delete Car Photo"
          photo={photo}
          carVariant={carVariantsArr[0]}
          floatDelete="yes"
          selectedPhoto={currentSelect}
        />
      </Box>
    );
  } else {
    return <div>Loading Photos...</div>;
  }
};

const mapStateToProps = (state) => {
  return {
    photos: state.firestore.data.photos,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collectionGroup: "photos",
    },
  ])
)(PhotoList);
