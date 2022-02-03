import React from "react";
import {
  makeStyles,
  Grid,
  Card,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
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
    padding: theme.spacing(3),
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
  const { auth, profile, signOut } = props;
  const [isAuthorised, setIsAuthorised] = React.useState(null);
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
        return (
          <div className={classes.root}>
            <Drawer />
            <div className={classes.page}>
              <Grid container>
                <Grid
                  className={classes.upperContent}
                  item
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Card className={classes.cardContainer}>
                    <Grid container className={classes.gridContainer}>
                      <Grid item md={7}>
                        <Typography className={classes.upperTitle} variant="h6">
                          Most Favorite Car
                        </Typography>
                      </Grid>
                      <Grid item md={5}>
                        <Box className={classes.mfcContainer}>
                          <img src="/MFC.png" alt="MFC" height="100%" />
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid
                  className={classes.upperContent}
                  item
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Card className={classes.cardContainer}>
                    <Grid container className={classes.gridContainer}>
                      <Grid item md={7}>
                        <Typography className={classes.upperTitle} variant="h6">
                          Most Favorite Brand
                        </Typography>
                      </Grid>
                      <Grid item md={5}>
                        <Box className={classes.mfcContainer}>
                          <img src="/honda.png" alt="MFB" height="100%" />
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid
                  className={classes.upperContent}
                  item
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Card className={classes.cardContainer}>
                    <Grid container className={classes.gridContainer}>
                      <Grid item md={7}>
                        <Typography className={classes.upperTitle} variant="h5">
                          153
                        </Typography>
                        <Typography className={classes.upperTitle} variant="h6">
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
                <Grid
                  className={classes.upperContent}
                  item
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Card className={classes.cardContainer}>
                    <Grid container className={classes.gridContainer}>
                      <Grid item md={7}>
                        <Typography className={classes.upperTitle} variant="h5">
                          33
                        </Typography>
                        <Typography className={classes.upperTitle} variant="h6">
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
              <Grid container className={classes.container}>
                <Grid className={classes.lowerContent} item md={9}>
                  <Grid style={{ height: "100%" }}>
                    <Card
                      style={{ height: "100%" }}
                      className={classes.chartCard}
                    >
                      <Typography className={classes.lowerTitle} variant="h4">
                        Top Favorite Car
                      </Typography>
                      <BarChart />
                    </Card>
                  </Grid>
                </Grid>
                <Grid className={classes.lowerContent} item md={3}>
                  <Grid container spacing={3} style={{ height: "100%" }}>
                    <Grid item md={12}>
                      <Card className={classes.chartCard}>
                        <Typography className={classes.lowerTitle} variant="h6">
                          Top Favorite Brand
                        </Typography>
                        {/* <Grid container>
                                        <Grid item md={12}>
                                            <PieChart />
                                        </Grid>
                                    </Grid> */}
                        <PieChart />
                      </Card>
                    </Grid>
                    <Grid item md={12}>
                      <Card className={classes.chartCard}>
                        <Typography className={classes.lowerTitle} variant="h6">
                          Salary Based Favorite Car
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        );
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
