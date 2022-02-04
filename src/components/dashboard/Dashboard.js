import React from "react";
import {
  makeStyles,
  Grid,
  Card,
  Typography,
  Box,
  Button,
  Tooltip,
} from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import Drawer from "../layout/Drawer";
import BarChart from "../charts/BarChart";
import PieChart from "../charts/PieChart";
import { signOut } from "../../actions/auth.actions";
import CircularProgress from "@mui/material/CircularProgress";
// import { Box as Box2 } from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  page: {
    background: "#f9f9f9",
    width: "100%",
  },
  upperContent: {
    padding: theme.spacing(2),
    justifyContent: "center",
  },
  cardContainer: {
    background: theme.palette.primary.main,
  },
  gridContainer: {
    padding: theme.spacing(2),
    justifyContent: "space-between",
  },
  upperTitle: {
    color: theme.palette.common.white,
  },
  mfcContainer: {
    background: theme.palette.common.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: 5,
    height: 57,
    width: "90%",
  },
  lowerContent: {
    padding: theme.spacing(2),
  },
  lowerTitle: {
    color: theme.palette.primary.main,
    padding: theme.spacing(2),
  },
  chartCard: {
    // padding: theme.spacing(3),
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f9f9f9",
  },
  loadingcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(10),
    width: "100%",
    height: "80%",
  },
  logo: {
    padding: theme.spacing(3),
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    padding: theme.spacing(7),
  },
  card: {
    padding: theme.spacing(8),
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  buttonContainer: {
    paddingTop: theme.spacing(3),
  },
  requestedTextContainer: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    //   width: "60%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const { auth, profile, signOut, users, carVariants, carBrands, carModels } =
    props;
  const [isAuthorised, setIsAuthorised] = React.useState(null);
  const [carVariantsArr, setCarVariantsArr] = React.useState();
  const [usersArr, setUsersArr] = React.useState();
  const [groupByModelArr, setGroupByModelArr] = React.useState([]);
  const [groupByBrandArr, setGroupByBrandArr] = React.useState([]);

  React.useEffect(() => {
    if (carBrands && carModels && carVariants) {
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
        .sort(function (a, b) {
          return b.totalClick - a.totalClick;
        });
      setCarVariantsArr(temp);
    }
    if (users) {
      let temp = Object.entries(users).map((key) => ({
        ...key[1],
        id: key[0],
      }));
      setUsersArr(temp);
    }
  }, [carModels, carVariants, users]);

  React.useEffect(() => {
    if (carVariantsArr) {
      groupByModel();
      groupByBrand();
    }
  }, [carVariantsArr]);

  const groupByModel = () => {
    var result = [];
    carVariantsArr.reduce(function (res, value) {
      if (!res[value.carModelName]) {
        res[value.carModelName] = {
          carBrandName: value.carBrandName,
          carModelName: value.carModelName,
          totalClick: 0,
          maleClick: 0,
          femaleClick: 0,
          cmId: value.cmId,
          url: value.url,
        };
        result.push(res[value.carModelName]);
      }
      res[value.carModelName].totalClick += value.totalClick;
      res[value.carModelName].maleClick += value.maleClick;
      res[value.carModelName].femaleClick += value.femaleClick;
      return res;
    }, {});

    result = result.sort(function (a, b) {
      return b.totalClick - a.totalClick;
    });
    setGroupByModelArr(result);
  };

  const groupByBrand = () => {
    var result = [];
    carVariantsArr.reduce(function (res, value) {
      if (!res[value.carBrandName]) {
        res[value.carBrandName] = {
          carBrandName: value.carBrandName,
          totalClick: 0,
          maleClick: 0,
          femaleClick: 0,
          cbId: value.cbId,
        };
        result.push(res[value.carBrandName]);
      }
      res[value.carBrandName].totalClick += value.totalClick;
      res[value.carBrandName].maleClick += value.maleClick;
      res[value.carBrandName].femaleClick += value.femaleClick;
      return res;
    }, {});

    result = result
      .sort(function (a, b) {
        return b.totalClick - a.totalClick;
      })
      .map((item) => {
        return {
          ...item,
          cbUrl: carBrands.find((o) => o.id === item.cbId).url,
        };
      });

    setGroupByBrandArr(result);
  };

  const view = () => {
    if (isAuthorised === null) {
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
    } else if (isAuthorised === true || isAuthorised === false) {
      if (!isAuthorised) {
        return (
          <div className={classes.container}>
            <div className="content">
              <Box className={classes.logo}>
                <img src="/Logo.png" alt="Logo" width="150" />
              </Box>
              <Grid container className={classes.gridContainer}>
                <Grid className={classes.section} item md={6}>
                  <img src="/Admin.png" alt="illustration" />
                </Grid>
                <Grid className={classes.section} item md={6}>
                  <Card className={classes.card}>
                    <Typography color="primary" variant="h3" align="center">
                      REQUEST CARIFY ACCESS
                    </Typography>
                    <Box className={classes.requestedTextContainer}>
                      <Typography variant="subtitle1" align="center">
                        Your request has been sent. You will receive an email
                        once your request has been approved.
                      </Typography>
                    </Box>
                    <Box align="center" className={classes.buttonContainer}>
                      <Button
                        type="submit"
                        color="primary"
                        onClick={() => signOut()}
                        variant="contained"
                        href="/signin"
                      >
                        Login
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </div>
        );
      } else if (isAuthorised) {
        if (
          usersArr &&
          carVariantsArr &&
          carBrands &&
          carModels &&
          carVariants &&
          groupByBrandArr[0] &&
          groupByModelArr[0]
        ) {
          return (
            <div className={classes.root}>
              <Drawer />
              <div className={classes.page}>
                <Grid container>
                  <Grid className={classes.upperContent} item md={6} lg={3}>
                    <Card className={classes.cardContainer}>
                      <Grid container className={classes.gridContainer}>
                        <Grid item md={7}>
                          <Typography
                            className={classes.upperTitle}
                            variant="h6"
                          >
                            Most Favorite Car
                          </Typography>
                        </Grid>
                        <Grid item md={5}>
                          <Box className={classes.mfcContainer}>
                            <Tooltip title={groupByModelArr[0].carBrandName + " " + groupByModelArr[0].carModelName} placement="bottom">
                              <img
                                src={groupByModelArr[0].url}
                                alt="MFC"
                                height="100%"
                              />
                            </Tooltip>
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid className={classes.upperContent} item md={6} lg={3}>
                    <Card className={classes.cardContainer}>
                      <Grid container className={classes.gridContainer}>
                        <Grid item md={7}>
                          <Typography
                            className={classes.upperTitle}
                            variant="h6"
                          >
                            Most Favorite Brand
                          </Typography>
                        </Grid>
                        <Grid item md={5}>
                          <Box className={classes.mfcContainer}>
                            <Tooltip
                              title={groupByBrandArr[0].carBrandName}
                              placement="bottom"
                            >
                              <img
                                src={groupByBrandArr[0].cbUrl}
                                alt="MFB"
                                height="100%"
                              />
                            </Tooltip>
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid className={classes.upperContent} item md={6} lg={3}>
                    <Card className={classes.cardContainer}>
                      <Grid container className={classes.gridContainer}>
                        <Grid item md={7}>
                          <Typography
                            className={classes.upperTitle}
                            variant="h5"
                          >
                            {usersArr.length}
                          </Typography>
                          <Typography
                            className={classes.upperTitle}
                            variant="h6"
                          >
                            Total Users
                          </Typography>
                        </Grid>
                        <Grid item md={5}>
                          <Box className={classes.mfcContainer}>
                            <img src="/TU.png" alt="TU" height="100%" />
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid className={classes.upperContent} item md={6} lg={3}>
                    <Card className={classes.cardContainer}>
                      <Grid container className={classes.gridContainer}>
                        <Grid item md={7}>
                          <Typography
                            className={classes.upperTitle}
                            variant="h5"
                          >
                            {carVariantsArr.length}
                          </Typography>
                          <Typography
                            className={classes.upperTitle}
                            variant="h6"
                          >
                            Total Cars
                          </Typography>
                        </Grid>
                        <Grid item md={5}>
                          <Box className={classes.mfcContainer}>
                            <img src="/hatchback.png" alt="TC" height="100%" />
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid className={classes.lowerContent} item md={8}>
                    <Grid style={{ height: "100%" }}>
                      <Card
                        style={{ height: "100%" }}
                        className={classes.chartCard}
                      >
                        <Typography className={classes.lowerTitle} variant="h4">
                          Top Favorite Car
                        </Typography>
                        <BarChart carModel={groupByModelArr}/>
                      </Card>
                    </Grid>
                  </Grid>
                  <Grid className={classes.lowerContent} item md={4}>
                    <Grid style={{ height: "100%" }}>
                      <Card
                        style={{ height: "100%" }}
                        className={classes.chartCard}
                      >
                        <Typography className={classes.lowerTitle} variant="h6">
                          Top Favorite Brand
                        </Typography>
                        <PieChart carBrand={groupByBrandArr}/>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          );
        } else {
          return (
            <div className={classes.root}>
              <Drawer />
              <div className={classes.pageRoot}>
                <Typography
                  className={classes.title}
                  color="primary"
                  variant="h3"
                >
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
      }
    }
  };

  React.useEffect(() => {
    if (auth.uid && profile.authorised) {
      setIsAuthorised(true);
    } else if (auth.uid && profile.authorised === false) {
      setIsAuthorised(false);
    }
  }, [auth, profile]);

  React.useEffect(() => {
    view();
  }, [isAuthorised]);

  //Route securing
  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }

  return view();
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    carVariants: state.firestore.data.carVariant,
    carBrands: state.firestore.ordered.carBrand,
    carModels: state.firestore.data.carModel,
    users: state.firestore.data.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: "users",
    },
    {
      collection: "carBrand",
    },
    {
      collectionGroup: "carModel",
    },
    {
      collectionGroup: "carVariant",
    },
  ])
)(Dashboard);
