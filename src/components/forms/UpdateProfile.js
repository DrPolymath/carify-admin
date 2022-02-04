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
    input: {
      display: "none",
    },
    imageInputContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    chooseImgBtnContainer: {
      display: "flex",
      justifyContent: "center",
      padding: theme.spacing(2),
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
  const [preview, setPreview] = React.useState(undefined);
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
    
    //upload image
    // if no image if image dont change
    //  dont upload or delete
    // else if image change
    // delete and upload
    // create storage directory 

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

  React.useEffect(() => {
    if (!profilePicture) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(profilePicture);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [profilePicture]);

  const handleImgChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setProfilePicture(undefined);
      return;
    }
    setProfilePicture(e.target.files[0]);
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
        <Box className={classes.imageInputContainer}>
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
              <img src={preview} alt="profilePicture" width="150" />
            ) : (
              <img src="/TU.png" alt="defaultProfilePicture" />
            )}
          </label>
        </Box>
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
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (profile, role) => dispatch(updateProfile(profile, role)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateProfile);
