import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Drawer from "../../layout/Drawer";
import { Box, CircularProgress, makeStyles, Typography } from "@material-ui/core";
import Search from "../../Search";
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import { firestoreConnect, useFirestoreConnect } from "react-redux-firebase";
import CarModelTable from "../../tables/CarModelTable";
import FormDialog from "../../FormDialog";
import { deleteCarModel } from "../../../actions/carModel.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  page: {
    background: "#f9f9f9",
    width: "100%",
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: 20,
  },
  loadingcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(10),
    width: "100%",
    height: "80%",
  },
}));

const CarModel = (props) => {
  const classes = useStyles();
  const { auth, carBrands, deleteCarModel, carTypes, profile } = props;
  const [rerender, setRerender] = useState(carBrands);

  const handleRerender = (val) => {
    setRerender(val);
  };

  useFirestoreConnect([
    {
      collection: "carBrand",
    },
    {
      collectionGroup: "carModel",
    },
  ]); // sync todos collection from Firestore into redux

  const carModels = useSelector((state) => state.firestore.data.carModel);

  //Route securing
  if (!auth.uid) return <Redirect to="/signin" />;
  //Unauthorised user
  if (auth.uid && profile.authorised === false) return <Redirect to="/" />;

  if (carBrands && carModels) {
    let carModelsArr = Object.entries(carModels).map((key) => ({
      ...key[1],
      id: key[0],
    }));

    carModelsArr = carModelsArr.map((item) => {
      return {
        ...item,
        carBrandName: carBrands.find((o) => o.id === item.cbId).carBrandName,
        bodyTypeName: carTypes.find((o) => o.id === item.btId).carTypeName,
      };
    });

    return (
      <div className={classes.root}>
        <Drawer />
        <div className={classes.page}>
          <Search />
          <Typography className={classes.title} color="primary" variant="h3">
            Car Model
          </Typography>
          <CarModelTable
            carTypes={carTypes}
            carModels={carModelsArr}
            rerender={rerender}
            handleRerender={handleRerender}
          />
          <FormDialog
            title="New Car Model"
            carTypes={carTypes}
            carBrands={carBrands}
            rerender={rerender}
            handleRerender={handleRerender}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Drawer />
        <div className={classes.page}>
          <Box className={classes.loadingcontainer}>
            <CircularProgress />
          </Box>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    carBrands: state.firestore.ordered.carBrand,
    carTypes: state.firestore.ordered.carType,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCarModel: (carModel) => dispatch(deleteCarModel(carModel)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    {
      collection: "carBrand",
    },
    {
      collection: "carType",
    },
  ])
)(CarModel);
