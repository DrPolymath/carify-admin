import React from "react";
import {
  Box,
  Button,
  makeStyles,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/profile.actions";

const useStyles = makeStyles((theme) => {
  return {
    field: {
      marginTop: 20,
      marginBottom: 20,
      width: 300,
      display: "block",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    imageInputContainer: {
      display: "inline",
      flexDirection: "column",
      alignItems: "center",
    },
    input: {
      display: "none",
    },
    formField: {
      display: "inline",
    },
  };
});

const gender = [
  {
    value: "Male",
  },
  {
    value: "Female",
  },
];

const UpdateProfile = (props) => {
  const classes = useStyles();

  const [profile, setProfile] = React.useState(props.profileInfo);
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [role, setRole] = React.useState("");

  const roleList = [
    {
      value: "Super Admin",
    },
    {
      value: "Admin",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateProfile(profile, role);
    props.handleClose();
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };

  React.useEffect(() => {
    if (profile) {
      if (profile.superAdmin) {
        setRole("Super Admin");
      } else {
        setRole("Admin");
      }
    }
  }, [profile]);

  // React.useEffect(() => {
  //   if (role === "Super Admin" && !profile.superAdmin) {
  //     setProfile({ ...profile, superAdmin: true });
  //   } else if (role === "Admin" && profile.superAdmin) {
  //     setProfile({ ...profile, superAdmin: false });
  //   }
  // }, [role]);

  const handleImgChange = (e) => {
    if (!e.target.files) {
      // setImage(undefined)
      setProfilePicture({
        profilePicture: undefined,
      });
      return;
    }
    // setImage(e.target.files[0])
    console.log("img set");
    setProfilePicture({
      profilePicture: e.target.files[0],
    });
  };

  return (
    <form
      id="updateProfileForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {console.log(profile)}
      <Box className={classes.formField}>
        <input
          accept="image/*"
          className={classes.input}
          id="image"
          multiple
          type="file"
          onChange={handleImgChange}
        />
        <label htmlFor="image" className={classes.chooseImgBtnContainer}>
          {profilePicture ? (
            <img src={profilePicture} alt="profilePicture" width="150" />
          ) : (
            <img src="/TU.png" alt="defaultProfilePicture" />
          )}
        </label>
        <TextField
          name="username"
          type="text"
          onChange={handleChange}
          value={profile.username}
          className={classes.field}
          label="User Name"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          // error={titleError}
        />
        <TextField
          name="firstname"
          type="text"
          onChange={handleChange}
          value={profile.firstname}
          className={classes.field}
          label="First Name"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          // error={titleError}
        />
        <TextField
          name="lastname"
          type="text"
          onChange={handleChange}
          value={profile.lastname}
          className={classes.field}
          label="Last Name"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          // error={titleError}
        />
        <TextField
          name="email"
          type="text"
          onChange={handleChange}
          value={profile.email}
          className={classes.field}
          label="Email"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          // error={titleError}
        />
        <TextField
          name="phoneNumber"
          type="number"
          onChange={handleChange}
          value={profile.phoneNumber}
          className={classes.field}
          label="Phone Number"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          // error={titleError}
        />

        <TextField
          name="gender"
          select
          label="Gender"
          className={classes.field}
          value={profile.gender}
          onChange={handleChange}
          color="secondary"
          fullWidth
          variant="outlined"
        >
          {gender.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>

        {profile.superAdmin === true && (
          <TextField
            name="role"
            select
            onChange={handleChangeRole}
            value={role}
            className={classes.field}
            label="Role"
            variant="outlined"
            color="secondary"
            fullWidth
          >
            {roleList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Box>

      <Box align="center" className={classes.buttonContainer}>
        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
      </Box>

      {/* <div className="red-text center">
                { authError ? <p>{ authError }</p> : null }
            </div> */}
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (profile, role) => dispatch(updateProfile(profile, role)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateProfile);
