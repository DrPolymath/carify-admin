import {
  Box,
  Button,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateAdmin } from "../../actions/admin.actions";

const useStyles = makeStyles((theme) => {
  return {
    field: {
      marginTop: 20,
      marginBottom: 20,
      width: 300,
      display: "flex",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    input: {
      display: "none",
    },
  };
});

const UpdateAdmin = (props) => {
  const classes = useStyles();
  const { updateAdmin, handleClose } = props;
  const [admin, setAdmin] = React.useState(props.admin);
  const [role, setRole] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [errorFlags, setErrorFlags] = React.useState({});
  const [validated, setValidated] = React.useState(false);
  const [initialRender, setInitialRender] = React.useState(true);
  const [toSave, setToSave] = React.useState(false);
  const genderList = [
    {
      value: "Male",
    },
    {
      value: "Female",
    },
  ];

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
    setToSave(true);
  };

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };

  React.useEffect(() => {
    if (admin) {
      if (admin.superAdmin) {
        setRole("Super Admin");
      } else {
        setRole("Admin");
      }
    }
  }, [admin]);

  React.useEffect(() => {
    if (role === "Super Admin" && !admin.superAdmin) {
      setAdmin({ ...admin, superAdmin: true });
    } else if (role === "Admin" && admin.superAdmin) {
      setAdmin({ ...admin, superAdmin: false });
    }
  }, [role]);

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

  useEffect(() => {
    console.log("toSave");
    console.log(toSave);
    console.log("validated");
    console.log(validated);
    if (toSave === true) {
      if (validated === true) {
        updateAdmin(admin);
        // console.log("updated");
        // console.log(admin);
        handleClose();
      }
    }
  }, [toSave, admin, validated]);

  const validate = () => {
    let temp = { ...errors };
    let flagTemp = { ...errorFlags };

    temp.username = admin.username === "" ? "Username is required" : "";

    if (admin.firstname === "") {
      temp.firstname = "First name is required";
    } else if (!/^[a-zA-Z]+$/.test(admin.firstname)) {
      temp.firstname = "Invalid first name";
    } else {
      temp.firstname = "";
    }

    if (admin.lastname === "") {
      temp.lastname = "Last name is required";
    } else if (!/^[a-zA-Z]+$/.test(admin.lastname)) {
      temp.lastname = "Invalid last name";
    } else {
      temp.lastname = "";
    }

    if (admin.email === "") {
      temp.email = "Email is required";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(admin.email)
    ) {
      temp.email = "Invalid email";
    } else {
      temp.email = "";
    }

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
      name="updateAdminForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        name="username"
        type="text"
        onChange={handleChange}
        value={admin.username}
        className={classes.field}
        label="Username"
        variant="outlined"
        color="secondary"
        fullWidth
        error={errorFlags[0]}
        helperText={errors.username}
      />
      <TextField
        name="firstname"
        type="text"
        onChange={handleChange}
        value={admin.firstname}
        className={classes.field}
        label="First Name"
        variant="outlined"
        color="secondary"
        fullWidth
        error={errorFlags[1]}
        helperText={errors.firstname}
      />
      <TextField
        name="lastname"
        type="text"
        onChange={handleChange}
        value={admin.lastname}
        className={classes.field}
        label="Last Name"
        variant="outlined"
        color="secondary"
        fullWidth
        error={errorFlags[2]}
        helperText={errors.lastname}
      />
      <TextField
        name="email"
        type="email"
        onChange={handleChange}
        value={admin.email}
        className={classes.field}
        label="Email Address"
        variant="outlined"
        color="secondary"
        fullWidth
        error={errorFlags[3]}
        helperText={errors.email}
      />
      <TextField
        name="gender"
        select
        onChange={handleChange}
        value={admin.gender}
        className={classes.field}
        label="Gender"
        variant="outlined"
        color="secondary"
        fullWidth
      >
        {genderList.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
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
    updateAdmin: (admin) => dispatch(updateAdmin(admin)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateAdmin);
