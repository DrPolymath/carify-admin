import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Drawer from "../layout/Drawer";
import {
  makeStyles,
  Button,
  Box,
  Typography,
  Card,
  TextField,
  Tooltip,
  Avatar,
} from "@material-ui/core";
import { signOut } from "../../actions/auth.actions";
import CircularProgress from "@mui/material/CircularProgress";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FormDialog from "../FormDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  page: {
    background: "#f9f9f9",
    width: "100%",
  },
  header: {
    height: "30%",
    background: theme.palette.primary.main,
    display: "flex",
    color: theme.palette.common.white,
  },
  loadingcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(10),
    width: "100%",
    height: "80%",
  },
  profileImgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
  },
  profileCard: {
    color: theme.palette.common.white,
  },
  profileInfoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "60%",
  },
  logOutContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(3),
    width: "10%",
  },
  content: {
    height: "70%",
    display: "flex",
  },
  cardContent: {
    borderRadius: 10,
    padding: theme.spacing(3),
    margin: theme.spacing(3),
    width: "100%",
  },
  infoContainer: {
    display: "flex",
  },
  labelsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "20%",
    justifyContent: "flex-start",
    paddingLeft: theme.spacing(2),
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "column",
    width: "30%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  labels: {
    margin: theme.spacing(4),
  },
  fields: {
    width: "100%",
    margin: theme.spacing(2.3),
  },
  buttonsContainer: {
    display: "flex",
  },
  buttonContainer: {
    padding: theme.spacing(0.5),
  },
  avatar: {
    width: 180,
    height: 180,
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const { auth, profile } = props;

  const [profileInfo, setProfileInfo] = React.useState({
    ...profile,
    id: auth.uid,
  });

  if (!auth.uid) return <Redirect to="/signin" />;
  //Unauthorised user
  if (auth.uid && profile.authorised === false) return <Redirect to="/" />;

  if (profile.authorised) {
    {console.log(profile)}
    return (
      <div className={classes.root}>
        {console.log(props)}
        <Drawer />
        <div className={classes.page}>
          <Box className={classes.header}>
            <Box className={classes.profileImgContainer}>
              <Box className={classes.profileCard}>
                <Avatar
                  className={classes.avatar}
                  alt="profilePic"
                  src="/profile.png"
                />
              </Box>
            </Box>
            <Box className={classes.profileInfoContainer}>
              <Typography variant="h3">{profile.username}</Typography>
              <Typography variant="body2">{profile.email}</Typography>
              <Typography variant="body1">Admin</Typography>
            </Box>
            <Box className={classes.logOutContainer}>
              {/* <IconButton>
                            
                        </IconButton> */}
              <ExitToAppIcon
                color="inherit"
                fontSize="large"
                onClick={props.signOut}
              />
            </Box>
          </Box>
          <Box className={classes.content}>
            <Card className={classes.cardContent} elevation={3}>
              <Typography variant="h4" color="primary">
                Details
              </Typography>
              <Box className={classes.infoContainer}>
                <Box className={classes.labelsContainer}>
                  <Typography className={classes.labels} variant="subtitle1">
                    First Name
                  </Typography>
                  <Typography className={classes.labels} variant="subtitle1">
                    Last Name
                  </Typography>
                  <Typography className={classes.labels} variant="subtitle1">
                    Email Address
                  </Typography>
                  <Typography className={classes.labels} variant="subtitle1">
                    Phone Number
                  </Typography>
                </Box>
                <Box className={classes.fieldContainer}>
                  <TextField
                    id="firstname"
                    variant="outlined"
                    className={classes.fields}
                    value={profile.firstname}
                    disabled
                  />
                  <TextField
                    id="lastname"
                    variant="outlined"
                    className={classes.fields}
                    value={profile.lastname}
                    disabled
                  />
                  <TextField
                    id="email"
                    variant="outlined"
                    className={classes.fields}
                    value={profile.email}
                    disabled
                  />
                  <TextField
                    id="phonenumber"
                    variant="outlined"
                    className={classes.fields}
                    value={profile.phoneNumber}
                    disabled
                  />
                </Box>
                <Box className={classes.labelsContainer}>
                  <Typography className={classes.labels} variant="subtitle1">
                    Gender
                  </Typography>
                  <Typography className={classes.labels} variant="subtitle1">
                    Role
                  </Typography>
                </Box>
                <Box className={classes.fieldContainer}>
                  <TextField
                    id="gender"
                    variant="outlined"
                    className={classes.fields}
                    value={profile.gender}
                    disabled
                  />
                  <TextField
                    id="Role"
                    variant="outlined"
                    className={classes.fields}
                    value={
                      profile.superAdmin === true ? "Super Admin" : "Admin"
                    }
                    disabled
                  />
                  <Box className={classes.buttonsContainer}>
                    <Box className={classes.buttonContainer}>
                      <FormDialog
                        title="Deactivate Account"
                        profileInfo={profileInfo}
                        user={auth}
                        deactivate="yes"
                      />
                    </Box>
                    <Box className={classes.buttonContainer}>
                      <FormDialog
                        title="Update User Profile"
                        profileInfo={profileInfo}
                        update="yes"
                        profile="yes"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
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
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
