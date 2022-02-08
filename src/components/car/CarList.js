import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import { Redirect } from "react-router-dom";
import Drawer from "../layout/Drawer";
import Search from "../Search";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import { useFirestore } from 'react-redux-firebase'
import { useFirestoreConnect } from "react-redux-firebase";
import CarVariantTable from "../tables/CarVariantTable";
import FilterCard from "../cards/FilterCard";
import FormDialog from "../FormDialog";

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
  loadingcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(10),
    width: "100%",
    height: "80%",
  },
}));

const CarList = (props) => {
  const classes = useStyles();
  const {
    auth,
    carBrands,
    carModels,
    carVariants,
    carTypes,
    priceRanges,
    profile,
  } = props;
  const [brandFilter, setBrandFilter] = React.useState("");
  const [rerender, setRerender] = React.useState("");
  const [carVariantsArr, setCarVariantsArr] = React.useState();
  const [carModelsArr, setCarModelsArr] = React.useState();
  const [priceRangesArr, setPriceRangesArr] = React.useState();
  const [filterResult, setFilterResult] = React.useState();
  const [searchQuery, setSearchQuery] = React.useState("");
  const filterSearch = (carVariantsArr, query) => {
    if (query === "") {
      return carVariantsArr;
    }

    return carVariantsArr.filter((item) => {
      var lowerCased = item.list.toLowerCase();
      return lowerCased.includes(query);
    });
  };
  const filteredSearch = filterSearch(carVariantsArr, searchQuery);

  React.useEffect(() => {
    setFilterResult(filteredSearch);
  }, [searchQuery]);

  const handleFilter = (carBrand) => {
    if (brandFilter === carBrand.carBrandName) {
      setBrandFilter("");
    } else {
      setBrandFilter(carBrand.carBrandName);
    }
  };

  const handleRerender = (val) => {
    setRerender(val);
  };

  useFirestoreConnect([
    {
      collection: "carVariant",
    },
  ]);

  React.useEffect(() => {
    if (carBrands && carModels && carVariants && carTypes && priceRanges) {
      let priceRangesArrTemp = Object.entries(priceRanges).map((key) => ({
        ...key[1],
        id: key[0],
      }));

      let carModelsArrTemp = Object.entries(carModels).map((key) => ({
        ...key[1],
        id: key[0],
      }));

      let carVariantsArrTemp = Object.entries(carVariants).map((key) => ({
        ...key[1],
        id: key[0],
      }));

      let carTypesArr = Object.entries(carTypes).map((key) => ({
        ...key[1],
        id: key[0],
      }));

      carModelsArrTemp = carModelsArrTemp.map((item) => {
        return {
          ...item,
          carTypeName: carTypesArr.find((o) => o.id === item.btId).carTypeName,
        };
      });

      carVariantsArrTemp = carVariantsArrTemp.map((item) => {
        return {
          ...item,
          cbId: carBrands.find(
            (o) =>
              o.id === carModelsArrTemp.find((o) => o.id === item.cmId).cbId
          ).id,
          carBrandName: carBrands.find(
            (o) =>
              o.id === carModelsArrTemp.find((o) => o.id === item.cmId).cbId
          ).carBrandName,
          carModelName: carModelsArrTemp.find((o) => o.id === item.cmId)
            .carModelName,
          carTypeName: carModelsArrTemp.find((o) => o.id === item.cmId)
            .carTypeName,
          bodyType: carModelsArrTemp.find((o) => o.id === item.cmId).bodyType,
          url: carModelsArrTemp.find((o) => o.id === item.cmId).url,
        };
      });

      carVariantsArrTemp = carVariantsArrTemp.map((item) => {
        return {
          ...item,
          list:
            item.carBrandName +
            " " +
            item.carModelName +
            " " +
            item.carVariantName +
            " " +
            item.bodyType +
            " " +
            item.price,
        };
      });

      if (brandFilter !== "") {
        carVariantsArrTemp = carVariantsArrTemp.filter(
          (carVariant) => carVariant.carBrandName === brandFilter
        );
      }
      setPriceRangesArr(priceRangesArrTemp);
      setCarModelsArr(carModelsArrTemp);
      setCarVariantsArr(carVariantsArrTemp);
      setFilterResult(carVariantsArrTemp);
    }
  }, [carBrands, carModels, carVariants, carTypes, priceRanges, brandFilter]);

  //Route securing
  if (!auth.uid) return <Redirect to="/signin" />;

  //Unauthorised user
  if (auth.uid && profile.authorised === false) return <Redirect to="/" />;

  if (carVariantsArr && carModelsArr && priceRangesArr) {
    return (
      <div className={classes.root}>
        <Drawer />
        <div className={classes.page}>
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div>
            <FilterCard carBrands={carBrands} handleFilter={handleFilter} />
          </div>
          <CarVariantTable
            carVariants={filterResult}
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
)(CarList);
