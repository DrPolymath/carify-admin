import React from "react";
import { Redirect } from "react-router-dom";
import Drawer from "../layout/Drawer";
import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Search from "../Search";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import LogTable from "../tables/LogTable";
import moment from "moment";

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
  const [filterResult, setFilterResult] = React.useState();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activityList, setActivityList] = React.useState();
  const filterSearch = (activityList, query) => {
    if (query === "") {
      return activityList;
    }

    return activityList.filter((item) => {
      var lowerCased = item.list.toLowerCase();
      return lowerCased.includes(query);
    });
  };
  const filteredSearch = filterSearch(activityList, searchQuery);
  React.useEffect(() => {
    setFilterResult(filteredSearch);
  }, [searchQuery]);

  React.useEffect(() => {
    getList();
  }, [activitylogs]);
  React.useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    if (activitylogs) {
      let activitylogsTemp = activitylogs.map((item) => {
        return {
          ...item,
          list:
            item.username +
            " " +
            item.email +
            " " +
            moment(item.timestamp.toDate()).format("L") +
            " " +
            moment(item.timestamp.toDate()).format("HH:mm:ss") +
            " " +
            item.activity +
            " " +
            item.description,
        };
      });
      setActivityList(activitylogsTemp)
      setFilterResult(activitylogsTemp);
    }
  };
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
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Typography className={classes.title} color="primary" variant="h3">
            Admin Log
          </Typography>
          <LogTable activitylogs={filterResult} />
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
