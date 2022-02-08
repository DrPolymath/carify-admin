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
import { storage } from "../../config/fbConfig";

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
  const [profilePicture, setProfilePicture] = React.useState("");
  const [preview, setPreview] = React.useState(undefined);
  const [role, setRole] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const [validated, setValidated] = React.useState(false);
  const [initialRender, setInitialRender] = React.useState(true);

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

    validate();
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

  const checkProfilePicture = () => {
    if (!profilePicture) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(profilePicture);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  };

  React.useEffect(() => {
    checkProfilePicture();
  }, [profilePicture]);

  const handleImgChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setProfilePicture(undefined);
      return;
    }
    setProfilePicture(e.target.files[0]);
  };

  React.useEffect(() => {
    if (initialRender === true) {
      setValidated(false);
      setInitialRender(false);
    } else if (Object.values(errors).every((x) => x === "")) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [errors]);

  const uploadImage = () => {
    const uploadTask = storage
      .ref("images/adminProfile/" + profilePicture.name)
      .put(profilePicture);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((url) => {
            updateProfile(url);
          })
          .then(() => {
            props.handleClose();
          });
      }
    );
  };

  React.useEffect(() => {
    if (validated === true) {
      if (preview === undefined) {
        if (profile.url === "") {
          updateProfile("");
          props.handleClose();
        } else {
          updateProfile(profile.url);
          props.handleClose();
        }
      } else {
        if (profile.url !== "") {
          var fileRef = storage.refFromURL(profile.url);
          fileRef.delete().then(() => {
            uploadImage();
          });
        } else {
          uploadImage();
        }
      }
    }
  }, [validated]);

  const updateProfile = (url) => {
    props.updateProfile(profile, role, url);
  };

  const validate = () => {
    let temp = { ...errors };
    let flagTemp = { ...errorFlags };

    temp.username = profile.username === "" ? "Username is required" : "";

    if (profile.firstname === "") {
      temp.firstname = "First name is required";
    } else if (!/^[a-zA-Z]+$/.test(profile.firstname)) {
      temp.firstname = "Invalid first name";
    } else {
      temp.firstname = "";
    }

    if (profile.lastname === "") {
      temp.lastname = "Last name is required";
    } else if (!/^[a-zA-Z]+$/.test(profile.lastname)) {
      temp.lastname = "Invalid last name";
    } else {
      temp.lastname = "";
    }

    if (profile.email === "") {
      temp.email = "Email is required";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(profile.email)
    ) {
      temp.email = "Invalid email";
    } else {
      temp.email = "";
    }

    if (profile.phoneNumber === "") {
      temp.phoneNumber = "Phone number is required";
    } else if (isNaN(profile.phoneNumber)) {
      temp.phoneNumber = "Phone number must only contain numbers";
    } else if (
      !(profile.phoneNumber.length >= 10 && profile.phoneNumber.length < 12)
    ) {
      temp.phoneNumber = "Please insert valid phone number";
    } else {
      temp.phoneNumber = "";
    }

    temp.gender = profile.gender === "" ? "Gender is required" : "";

    temp.role = role === "" ? "Role is required" : "";

    flagTemp = Object.entries(temp).map((item) => {
      if (item[1] === "") {
        return item[0], false;
      } else {
        return item[1], true;
      }
    });

    setErrors({
      ...temp,
    });
    setErrorFlags({
      ...flagTemp,
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
            {
              profilePicture ? (
                <img src={preview} alt="profilePicture" width="150" />
              ) : profile.url !== "" ? (
                <img src={profile.url} alt="profilePicture" width="150" />
              ) : (
                <img src="/TU.png" alt="profilePicture" />
              )
              //change
              //url
              //undefined
            }
            {/* {profile.url === "" && !profilePicture ? (
              <img src="/TU.png" alt="profilePicture" />
            ) : (
              <img src={profile.url} alt="defaultProfilePicture" width="150" />
            )} */}
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
          error={errorFlags[0]}
          helperText={errors.username}
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
          error={errorFlags[1]}
          helperText={errors.firstname}
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
          error={errorFlags[2]}
          helperText={errors.lastname}
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
          error={errorFlags[3]}
          helperText={errors.email}
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
          error={errorFlags[4]}
          helperText={errors.phoneNumber}
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
          error={errorFlags[5]}
          helperText={errors.gender}
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
            error={errorFlags[6]}
            helperText={errors.role}
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
    updateProfile: (profile, role, url) =>
      dispatch(updateProfile(profile, role, url)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateProfile);
