import React from "react";
import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Drawer from "../layout/Drawer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import OverviewTable from "../tables/OverviewTable";
import TechnicalSpecsTable from "../tables/TechnicalSpecsTable";
import PhotoList from "../layout/PhotoList";
import CarDetailSummary from "../layout/CarDetailSummary";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  pageRoot: {
    background: "#f9f9f9",
    width: "100%",
    padding: theme.spacing(3),
  },
  page: {
    padding: theme.spacing(5),
  },
  title: {
    marginBottom: 20,
  },
  buttonContainer: {
    display: "block",
    margin: 10,
  },
  colorList: {
    borderColor: "#141411",
    border: 1,
    width: "20px",
    height: "20px",
    borderRadius: "50%",
  },
  tabContainer: {
    display: "flex",
    justifyContent: "flex-start",
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

const CarDetail = (props) => {
  const classes = useStyles();
  const {
    auth,
    carModels,
    carBrands,
    carVariants,
    cmId,
    vId,
    engines,
    performances,
    transmissions,
    colors,
    priceRanges,
    profile,
  } = props;

  const [tabValue, setTabValue] = React.useState(0);
  const [variantValue, setVariantValue] = React.useState(0);
  const [carVariantsArr, setCarVariantsArr] = React.useState();
  const [priceRangesArr, setPriceRangesArr] = React.useState();
  const [newVId, setNewVId] = React.useState(vId);

  const handleChangeVariant = (event, newValue) => {
    handleVariantPageTab(newValue);
  };

  React.useEffect(() => {
    handleVariantPageTab(newVId);
  },[]);

  const handleVariantPageTab = (newValue) => {
    let id;
    let vIdIndex;
    let findVId = Object.entries(carVariants)
      .map((key) => ({
        ...key[1],
        id: key[0],
      }))
      .filter((carVariant) => carVariant.cmId === cmId);
    if (Number.isInteger(newValue)) {
      findVId = findVId.map((item, index) => {
        if (index === newValue) {
          id = item.id;
        }
      });
      setVariantValue(newValue);
      setNewVId(id);
    } else {
      findVId = findVId.map((item, index) => {
        if (item.id === newVId) {
          vIdIndex = index;
        }
      });
      setVariantValue(vIdIndex);
    }
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const viewTab = () => {
    if (tabValue === 0) {
      return 0;
    } else {
      return 1;
    }
  };

  const tabMenu = () => {
    return (
      <Box className={classes.tabContainer}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab
            label={<Typography variant="subtitle1">Car Details</Typography>}
            value={0}
          />
          <Tab
            label={<Typography variant="subtitle1">Photos</Typography>}
            value={1}
          />
        </Tabs>
      </Box>
    );
  };

  React.useEffect(() => {
    viewTab();
  }, [tabValue]);

  React.useEffect(() => {
    if (carBrands && carModels && carVariants && priceRanges) {
      let priceRangesArrTemp = Object.entries(priceRanges).map((key) => ({
        ...key[1],
        id: key[0],
      }));

      let carModelsArr = Object.entries(carModels).map((key) => ({
        ...key[1],
        id: key[0],
      }));

      let temp = Object.entries(carVariants)
        .map((key) => ({
          ...key[1],
          id: key[0],
        }))
        .map((item) => {
          return {
            ...item,
            carBrandName: carBrands.find(
              (o) => o.id === carModelsArr.find((o) => o.id === item.cmId).cbId
            ).carBrandName,
            cbId: carBrands.find(
              (o) => o.id === carModelsArr.find((o) => o.id === item.cmId).cbId
            ).id,
            carModelName: carModelsArr.find((o) => o.id === item.cmId)
              .carModelName,
            bodyType: carModelsArr.find((o) => o.id === item.cmId).bodyType,
            url: carModelsArr.find((o) => o.id === item.cmId).url,
          };
        })
        .filter((carVariant) => carVariant.cmId === cmId);
      setPriceRangesArr(priceRangesArrTemp);
      setCarVariantsArr(temp);
    }
  }, [carModels, carVariants, priceRanges]);

  //Route securing
  if (!auth.uid) return <Redirect to="/signin" />;
  //Unauthorised user
  if (auth.uid && profile.authorised === false) return <Redirect to="/" />;

  if (carVariantsArr && priceRanges) {
    return (
      <div className={classes.root}>
        <Drawer />
        <div className={classes.pageRoot}>
          <Typography className={classes.title} color="primary" variant="h3">
            Car Details
          </Typography>
          <div className={classes.page}>
            <CarDetailSummary
              carVariantsArr={carVariantsArr}
              handleChangeVariant={handleChangeVariant}
              colors={colors}
              variantValue={variantValue}
              priceRanges={priceRangesArr}
              newVId={newVId}
            />
            <Divider />
            {tabMenu()}
            {viewTab() === 0 && (
              <OverviewTable
                carVariantsArr={carVariantsArr}
                handleChangeVariant={handleChangeVariant}
                variantValue={variantValue}
                colors={colors}
                newVId={newVId}
              />
            )}
            {viewTab() === 0 && (
              <TechnicalSpecsTable
                engines={engines}
                performances={performances}
                transmissions={transmissions}
                carVariantsArr={carVariantsArr}
                variantValue={variantValue}
                newVId={newVId}
              />
            )}

            {viewTab() === 1 && <PhotoList carVariantsArr={carVariantsArr} />}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Drawer />
        <div className={classes.pageRoot}>
          <Typography className={classes.title} color="primary" variant="h3">
            Car Details
          </Typography>
          <div className={classes.page}>
            <Box className={classes.loadingcontainer}>
              <CircularProgress />
            </Box>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const cmId = ownProps.match.params.cmId;
  const vId = ownProps.match.params.vId;
  return {
    carModels: state.firestore.data.carModel,
    auth: state.firebase.auth,
    carBrands: state.firestore.ordered.carBrand,
    carVariants: state.firestore.data.carVariant,
    engines: state.firestore.data.engine,
    performances: state.firestore.data.performance,
    transmissions: state.firestore.data.transmission,
    colors: state.firestore.data.colors,
    cmId: cmId,
    vId: vId,
    profile: state.firebase.profile,
    priceRanges: state.firestore.data.priceRange,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "carBrand",
    },
    {
      collectionGroup: "carModel",
    },
    {
      collectionGroup: "carVariant",
    },
    {
      collectionGroup: "engine",
    },
    {
      collectionGroup: "performance",
    },
    {
      collectionGroup: "transmission",
    },
    {
      collectionGroup: "colors",
    },
  ])
)(CarDetail);
