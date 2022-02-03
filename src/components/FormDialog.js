import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import FloatingActionBtn from "./FloatingActionBtn";
import EditIcon from "@material-ui/icons/Edit";
import { Button, Link } from "@material-ui/core";
import AddCarBrand from "./forms/AddCarBrand";
import UpdateCarBrand from "./forms/UpdateCarBrand";
import UpdateCarType from "./forms/UpdateCarType";
import AddCarType from "./forms/AddCarType";
import CreatePriceRange from "./forms/CreatePriceRange";
import UpdatePriceRange from "./forms/UpdatePriceRange";
import UpdateProfile from "./forms/UpdateProfile";
import AddCarModel from "./forms/AddCarModel";
import UpdateCarModel from "./forms/UpdateCarModel";
import DeleteCarModel from "./forms/DeleteCarModel";
import AddCarVariant from "./forms/AddCarVariant";
import UpdateCarVariant from "./forms/UpdateCarVariant";
import DeleteCarVariant from "./forms/DeleteCarVariant";
import DeleteCarBrand from "./forms/DeleteCarBrand";
import DeletePriceRange from "./forms/DeletePriceRange";
import AddPhoto from "./forms/AddPhoto";
import DeletePhoto from "./forms/DeletePhoto";
import Chip from "@mui/material/Chip";
import AddEngine from "./forms/AddEngine";
import UpdateEngine from "./forms/UpdateEngine";
import DeleteEngine from "./forms/DeleteEngine";
import AddPerformance from "./forms/AddPerformance";
import UpdatePerformance from "./forms/UpdatePerformance";
import DeletePerformance from "./forms/DeletePerformance";
import AddTransmission from "./forms/AddTransmission";
import UpdateTransmission from "./forms/UpdateTransmission";
import DeleteTransmission from "./forms/DeleteTransmission";
import UpdateAdmin from "./forms/UpdateAdmin";
import DeleteAdmin from "./forms/DeleteAdmin";
import ApproveRequest from "./forms/ApproveRequest";
import EnableAccount from "./forms/EnableAccount";
import DisableAccount from "./forms/DisableAccount";
import RejectRequest from "./forms/RejectRequest";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
}))(MuiDialogContent);

const FormDialog = (props) => {
  const {
    title,
    update,
    toDelete,
    profile,
    carBrand,
    carType,
    priceRange,
    profileInfo,
    carBrands,
    handleRerender,
    handleTableRerender,
    carModel,
    carTypes,
    carModels,
    priceRanges,
    carVariant,
    moreMenu,
    handleCloseMoreMenu,
    floatDelete,
    photo,
    selectedPhoto,
    chip,
    clickable,
    engine,
    performance,
    transmission,
    approve,
    reject,
    admin,
    enable,
    disable,
    deactivate,
  } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const btn = () => {
    if (update) {
      if (profile) {
        return (
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Update Details
          </Button>
        );
      } else if (moreMenu) {
        return <div onClick={handleClickOpen}>Edit</div>;
      } else {
        return (
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Edit
          </Button>
        );
      }
    } else if (toDelete) {
      if (moreMenu) {
        return <div onClick={handleClickOpen}>Delete</div>;
      } else {
        return (
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Delete
          </Button>
        );
      }
    } else if (chip) {
      return (
        <Chip
          label={title}
          clickable={clickable()}
          variant="outlined"
          disabled={!clickable()}
          color="primary"
          onClick={handleClickOpen}
        />
      );
    } else if (approve) {
      return (
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Approve
        </Button>
      );
    } else if (reject) {
      return (
        <Button variant="outlined" color="error" onClick={handleClickOpen}>
          Reject
        </Button>
      );
    } else if (enable) {
      return (
        <Button variant="outlined" color="error" onClick={handleClickOpen}>
          Enable
        </Button>
      );
    } else if (disable) {
      return (
        <Button variant="outlined" color="error" onClick={handleClickOpen}>
          Disable
        </Button>
      );
    } else if (deactivate) {
      return (
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Deactivate Account
        </Button>
      );
    } else {
      if (floatDelete) {
        return (
          <FloatingActionBtn
            handleClickOpen={handleClickOpen}
            floatDelete={floatDelete}
          />
        );
      } else {
        return <FloatingActionBtn handleClickOpen={handleClickOpen} />;
      }
    }
  };

  return (
    <div>
      {btn()}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          {title === "New Brand" ? (
            <AddCarBrand handleClose={handleClose} />
          ) : null}
          {title === "Update Car Brand" ? (
            <UpdateCarBrand
              carBrand={carBrand}
              handleClose={handleCloseMoreMenu}
            />
          ) : null}
          {title === "Delete Car Brand" ? (
            <DeleteCarBrand
              carBrand={carBrand}
              handleClose={handleCloseMoreMenu}
            />
          ) : null}
          {title === "New Car Type" ? (
            <AddCarType handleClose={handleClose} />
          ) : null}
          {title === "Update Car Type" ? (
            <UpdateCarType carType={carType} handleClose={handleClose} />
          ) : null}
          {title === "New Price Range" ? (
            <CreatePriceRange handleClose={handleClose} />
          ) : null}
          {title === "Update Price Range" ? (
            <UpdatePriceRange
              priceRange={priceRange}
              handleClose={handleClose}
            />
          ) : null}
          {title === "Delete Price Range" ? (
            <DeletePriceRange
              priceRange={priceRange}
              handleClose={handleClose}
            />
          ) : null}
          {title === "New Car Model" ? (
            <AddCarModel
              carBrands={carBrands}
              carTypes={carTypes}
              handleClose={handleClose}
              handleRerender={handleRerender}
            />
          ) : null}
          {title === "Update Car Model" ? (
            <UpdateCarModel
              carModel={carModel}
              carTypes={carTypes}
              carType={carType}
              handleClose={handleClose}
            />
          ) : null}
          {title === "Delete Car Model" ? (
            <DeleteCarModel
              carModel={carModel}
              handleClose={handleClose}
              handleRerender={handleRerender}
              handleTableRerender={handleTableRerender}
            />
          ) : null}
          {title === "New Car Variant" ? (
            <AddCarVariant
              carBrands={carBrands}
              carModels={carModels}
              priceRanges={priceRanges}
              handleClose={handleClose}
              handleRerender={handleRerender}
            />
          ) : null}
          {title === "Update Car Variant" ? (
            <UpdateCarVariant
              carVariant={carVariant}
              priceRanges={priceRanges}
              handleClose={handleClose}
              handleRerender={handleRerender}
            />
          ) : null}
          {title === "Delete Car Variant" ? (
            <DeleteCarVariant
              carVariant={carVariant}
              handleClose={handleClose}
              handleRerender={handleRerender}
              handleTableRerender={handleTableRerender}
            />
          ) : null}
          {title === "Update User Profile" ? (
            <UpdateProfile
              profileInfo={profileInfo}
              handleClose={handleClose}
            />
          ) : null}
          {title === "Add Car Photo" ? (
            <AddPhoto handleClose={handleClose} carVariant={carVariant} />
          ) : null}
          {title === "Delete Car Photo" ? (
            <DeletePhoto
              handleClose={handleClose}
              carVariant={carVariant}
              photo={photo}
              selectedPhoto={selectedPhoto}
            />
          ) : null}
          {title === "Add Engine Details" ? (
            <AddEngine handleClose={handleClose} carVariant={carVariant} />
          ) : null}
          {title === "Update Engine Details" ? (
            <UpdateEngine
              handleClose={handleClose}
              carVariant={carVariant}
              engine={engine}
            />
          ) : null}
          {title === "Delete Engine Details" ? (
            <DeleteEngine
              handleClose={handleClose}
              carVariant={carVariant}
              engine={engine}
            />
          ) : null}
          {title === "Add Performance Details" ? (
            <AddPerformance handleClose={handleClose} carVariant={carVariant} />
          ) : null}
          {title === "Update Performance Details" ? (
            <UpdatePerformance
              handleClose={handleClose}
              carVariant={carVariant}
              performance={performance}
            />
          ) : null}
          {title === "Delete Performance Details" ? (
            <DeletePerformance
              handleClose={handleClose}
              carVariant={carVariant}
              performance={performance}
            />
          ) : null}
          {title === "Add Transmission Details" ? (
            <AddTransmission
              handleClose={handleClose}
              carVariant={carVariant}
            />
          ) : null}
          {title === "Update Transmission Details" ? (
            <UpdateTransmission
              handleClose={handleClose}
              carVariant={carVariant}
              transmission={transmission}
            />
          ) : null}
          {title === "Delete Transmission Details" ? (
            <DeleteTransmission
              handleClose={handleClose}
              carVariant={carVariant}
              transmission={transmission}
            />
          ) : null}
          {title === "Update Admin Details" ? (
            <UpdateAdmin handleClose={handleClose} admin={admin} />
          ) : null}
          {title === "Approve Admin Request" ? (
            <ApproveRequest handleClose={handleClose} admin={admin} />
          ) : null}
          {title === "Reject Admin Request" ? (
            <RejectRequest handleClose={handleClose} admin={admin} />
          ) : null}
          {title === "Enable Admin Account" ? (
            <EnableAccount handleClose={handleClose} admin={admin} />
          ) : null}
          {title === "Disable Admin Account" ? (
            <DisableAccount handleClose={handleClose} admin={admin} />
          ) : null}
          {title === "Deactivate Account" ? (
            <DeleteAdmin handleClose={handleClose} profileInfo={profileInfo} />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
