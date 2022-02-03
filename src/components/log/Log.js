import React from "react";
import { Redirect } from "react-router-dom";
import Drawer from "../layout/Drawer";
import { Box, CircularProgress, makeStyles, Typography } from "@material-ui/core";
import Search from "../Search";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import LogTable from "../tables/LogTable";

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

const Log = (props) => {
  const classes = useStyles();
  const { auth, activitylogs, profile } = props;
  //Route securing
  if (!auth.uid) return <Redirect to="/signin" />;
  //Unauthorised user
  if (auth.uid && profile.authorised === false) return <Redirect to="/" />;

  if (profile.authorised === null) {
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
  } else {
    return (
      <div className={classes.root}>
        <Drawer />
        <div className={classes.page}>
          <Search />
          <Typography className={classes.title} color="primary" variant="h3">
            Admin Log
          </Typography>
          <LogTable activitylogs={activitylogs} />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    activitylogs: state.firestore.ordered.activityLog,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "activityLog",
      orderBy: [["timestamp", "desc"]],
    },
  ])
)(Log);
