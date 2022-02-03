import React from "react";
import { Redirect } from "react-router-dom";
import Drawer from "../../layout/Drawer";
import { Box, CircularProgress, makeStyles, Typography } from "@material-ui/core";
import Search from "../../Search";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import CarVariantTable from "../../tables/CarVariantTable";
import FormDialog from "../../FormDialog";

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

const CarVariant = (props) => {
  const classes = useStyles();
  const { auth, carBrands, carModels, carVariants, carTypes, priceRanges, profile } =
    props;
  const [rerender, setRerender] = React.useState("");

  const handleRerender = (val) => {
    setRerender(val);
  };

  console.log(rerender);
  //Route securing
  if (!auth.uid) return <Redirect to="/signin" />;
  //Unauthorised user
  if(auth.uid && profile.authorised===false) return <Redirect to="/" />;

  if (carBrands && carModels && carVariants && carTypes && priceRanges) {
    let priceRangesArr = Object.entries(priceRanges).map((key) => ({
      ...key[1],
      id: key[0],
    }));

    let carModelsArr = Object.entries(carModels).map((key) => ({
      ...key[1],
      id: key[0],
    }));

    let carVariantsArr = Object.entries(carVariants).map((key) => ({
      ...key[1],
      id: key[0],
    }));

    let carTypesArr = Object.entries(carTypes).map((key) => ({
      ...key[1],
      id: key[0],
    }));

    carModelsArr = carModelsArr.map((item) => {
      return {
        ...item,
        carTypeName: carTypesArr.find((o) => o.id === item.btId).carTypeName,
      };
    });

    carVariantsArr = carVariantsArr.map((item) => {
      return {
        ...item,
        cbId: carBrands.find(
          (o) => o.id === carModelsArr.find((o) => o.id === item.cmId).cbId
        ).id,
        carBrandName: carBrands.find(
          (o) => o.id === carModelsArr.find((o) => o.id === item.cmId).cbId
        ).carBrandName,
        carModelName: carModelsArr.find((o) => o.id === item.cmId).carModelName,
        carTypeName: carModelsArr.find((o) => o.id === item.cmId).carTypeName,
        bodyType: carModelsArr.find((o) => o.id === item.cmId).bodyType,
        url: carModelsArr.find((o) => o.id === item.cmId).url,
      };
    });

    return (
      <div className={classes.root}>
        <Drawer />
        <div className={classes.page}>
          <Search />
          <Typography className={classes.title} color="primary" variant="h3">
            Car Variant
          </Typography>
          <CarVariantTable
            carVariants={carVariantsArr}
            priceRanges={priceRangesArr}
            handleRerender={handleRerender}
          />
          <FormDialog
            title="New Car Variant"
            carBrands={carBrands}
            carModels={carModelsArr}
            priceRanges={priceRangesArr}
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
  // console.log(state);
  return {
    auth: state.firebase.auth,
    carBrands: state.firestore.ordered.carBrand,
    carModels: state.firestore.data.carModel,
    carVariants: state.firestore.data.carVariant,
    carTypes: state.firestore.data.carType,
    priceRanges: state.firestore.data.priceRange,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "carBrand",
    },
    {
      collection: "priceRange",
    },
    {
      collection: "carType",
    },
    {
      collectionGroup: "carModel",
    },
    {
      collectionGroup: "carVariant",
    },
  ])
)(CarVariant);
