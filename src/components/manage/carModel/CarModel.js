import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Drawer from "../../layout/Drawer";
import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
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
  const { auth, carBrands, carModels, carTypes, profile } = props;
  const [carModelsArr, setCarModelsArr] = useState();
  const [rerender, setRerender] = useState(carBrands);
  const [filterResult, setFilterResult] = React.useState();
  const [searchQuery, setSearchQuery] = React.useState("");
  const filterSearch = (carModelsArr, query) => {
    if (query === "") {
      return carModelsArr;
    }

    return carModelsArr.filter((item) => {
      var lowerCased = item.list.toLowerCase();
      return lowerCased.includes(query);
    });
  };
  const filteredSearch = filterSearch(carModelsArr, searchQuery);

  React.useEffect(() => {
    setFilterResult(filteredSearch);
  }, [searchQuery]);

  const handleRerender = (val) => {
    setRerender(val);
  };

  React.useEffect(() => {
    if (carBrands && carModels && carTypes) {
      let carModelsArrTemp = Object.entries(carModels).map((key) => ({
        ...key[1],
        id: key[0],
      }));

      carModelsArrTemp = carModelsArrTemp.map((item) => {
        return {
          ...item,
          carBrandName: carBrands.find((o) => o.id === item.cbId).carBrandName,
          bodyTypeName: carTypes.find((o) => o.id === item.btId).carTypeName,
        };
      });
      carModelsArrTemp = carModelsArrTemp.map((item) => {
        return {
          ...item,
          list:
            item.carBrandName +
            " " +
            item.bodyTypeName +
            " " +
            item.carModelName,
        };
      });
      setCarModelsArr(carModelsArrTemp);
      setFilterResult(carModelsArrTemp)
    }
  }, [carBrands, carModels, carTypes]);

  //Route securing
  if (!auth.uid) return <Redirect to="/signin" />;
  //Unauthorised user
  if (auth.uid && profile.authorised === false) return <Redirect to="/" />;

  if (carBrands && carModels) {
    return (
      <div className={classes.root}>
        <Drawer />
        <div className={classes.page}>
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Typography className={classes.title} color="primary" variant="h3">
            Car Model
          </Typography>
          <CarModelTable
            carTypes={carTypes}
            carModels={filterResult}
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
    carModels: state.firestore.data.carModel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCarModel: (carModel) => dispatch(deleteCarModel(carModel)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: "carBrand",
    },
    {
      collection: "carType",
    },
    {
      collectionGroup: "carModel",
    },
  ])
)(CarModel);
