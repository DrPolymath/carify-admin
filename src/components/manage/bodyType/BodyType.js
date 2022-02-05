import React from "react";
import { Redirect } from "react-router-dom";
import Drawer from "../../layout/Drawer";
import { Box, CircularProgress, makeStyles, Typography } from "@material-ui/core";
import Search from "../../Search";
import CarTypeCard from "../../cards/CarTypeCard";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
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
  loadingcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(10),
    width: "100%",
    height: "80%",
  },
}));

const BodyType = (props) => {
  const classes = useStyles();
  const { auth, carTypes, profile } = props;
  //Route securing
  if (!auth.uid) return <Redirect to="/signin" />;
  //Unauthorised user
  if (auth.uid && profile.authorised === false) return <Redirect to="/" />;

  if (profile.authorised == null) {
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
          <Typography color="primary" variant="h3">
            Body Type
          </Typography>
          <CarTypeCard carTypes={carTypes} />
          <FormDialog title="New Body Type" />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    carTypes: state.firestore.ordered.carType,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "carType" }])
)(BodyType);
