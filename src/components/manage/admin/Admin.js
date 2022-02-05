import React from "react";
import { Redirect } from "react-router-dom";
import Drawer from "../../layout/Drawer";
import {
  Box,
  Chip,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Search from "../../Search";
import AdminTable from "../../tables/AdminTable";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import FloatingActionBtn from "../../FloatingActionBtn";
import AdminRequestTable from "../../tables/AdminRequestTable";
import Stack from "@mui/material/Stack";
import DisabledAdminTable from "../../tables/DisabledAdminTable";

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
  chip: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));

const Admin = (props) => {
  const classes = useStyles();
  const { auth, admin, profile } = props;
  const [toView, setToView] = React.useState(0);

  const handleClick = (e, index) => {
    console.log(index);
    setToView(index);
  };

  //Route securing
  if (!auth.uid) return <Redirect to="/signin" />;
  //Unauthorised user
  if (auth.uid && profile.authorised === false && profile.disabled === true)
    return <Redirect to="/" />;

  if (admin) {
    const authorisedAdmin = admin.filter((item) => item.authorised === true && item.disabled == false);
    const unauthorisedAdmin = admin.filter((item) => item.authorised === false && item.disabled === false);
    const disabledAdmin = admin.filter((item) => item.disabled === true);
    let newRequestCount = unauthorisedAdmin.length.toString() + " New Request";
    return (
      <div className={classes.root}>
        <Drawer />
        <div className={classes.page}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography className={classes.title} color="primary" variant="h3">
              Admin
            </Typography>
            <Chip
              label="Admin Details"
              variant="outlined"
              onClick={(e) => handleClick(e, 0)}
              color="primary"
              className={classes.chip}
            />
            <Chip
              label={newRequestCount}
              variant="outlined"
              onClick={(e) => handleClick(e, 1)}
              color="primary"
              className={classes.chip}
            />
            <Chip
              label="Disabled Account"
              variant="outlined"
              onClick={(e) => handleClick(e, 2)}
              color="primary"
              className={classes.chip}
            />
          </Grid>
          {toView === 0 && (
            <AdminTable data={authorisedAdmin} profile={profile} />
          )}
          {toView === 1 && <AdminRequestTable data={unauthorisedAdmin} />}
          {toView === 2 && <DisabledAdminTable data={disabledAdmin} />}
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
    admin: state.firestore.ordered.admin,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "admin" }])
)(Admin);
