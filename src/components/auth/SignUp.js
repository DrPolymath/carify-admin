import React, { useState } from "react";
import {
  Grid,
  Card,
  TextField,
  makeStyles,
  Typography,
  Button,
  Box,
  MenuItem,
  Link,
  Paper,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { signUp } from "../../actions/auth.actions";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#f9f9f9",
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
  };
});

const SignUp = ({ auth, signUp }) => {
  const classes = useStyles();
  const history = useHistory();

  const [creds, setCreds] = useState({});
  const [errors, setErrors] = useState({});
  const [errorFlags, setErrorFlags] = useState({});
  const [validated, setValidated] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");

  const genderValue = [
    {
      value: "Male",
    },
    {
      value: "Female",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  const validate = () => {
    let temp = { ...errors };
    let flagTemp = { ...errorFlags };

    if (email === "") {
      temp.email = "Email is required";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      temp.email = "Invalid email";
    } else {
      temp.email = "";
    }

    temp.password = password === "" ? "Password is required" : "";
    temp.username = username === "" ? "Username is required" : "";

    if (firstname === "") {
      temp.firstname = "First name is required";
    } else if (!/^[a-zA-Z]+$/.test(firstname)) {
      temp.firstname = "Invalid first name";
    } else {
      temp.firstname = "";
    }

    if (lastname === "") {
      temp.lastname = "Last name is required";
    } else if (!/^[a-zA-Z]+$/.test(lastname)) {
      temp.lastname = "Invalid last name";
    } else {
      temp.lastname = "";
    }

    if (phoneNumber === "") {
      temp.phoneNumber = "Phone number is required";
    } else if (isNaN(phoneNumber)) {
      temp.phoneNumber = "Phone number must only contain numbers";
    } else if (!(phoneNumber.length >= 10 && phoneNumber.length < 12)) {
      temp.phoneNumber = "Please insert valid phone number";
    } else {
      temp.phoneNumber = "";
    }

    temp.gender = gender === "" ? "Gender is required" : "";

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

  React.useEffect(() => {
    if (initialRender === true) {
      setValidated(false);
      setInitialRender(false)
    } else if (Object.values(errors).every((x) => x === "")) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [errors]);

  React.useEffect(() => {
    if (validated === true) {
      signUp(creds, password);
      // console.log("signed up", creds);
    }
  }, [validated]);

  React.useEffect(() => {
    if (
      email &&
      password &&
      username &&
      firstname &&
      lastname &&
      phoneNumber &&
      gender
    ) {
      setCreds({
        email,
        username,
        firstname,
        lastname,
        phoneNumber,
        gender,
      });
    }
  }, [email, password, username, firstname, lastname, phoneNumber, gender]);

  //Route securing
  if (auth.uid) return <Redirect to="/" />;

  return (
    <div className={classes.container}>
      <div className="content">
        <Box className={classes.logo} onClick={() => history.push("/")}>
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
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={classes.field}
                  label="Email"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  error={errorFlags[0]}
                  helperText={errors.email}
                />
                <TextField
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className={classes.field}
                  label="Password"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  error={errorFlags[1]}
                  helperText={errors.password}
                />
                <TextField
                  name="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className={classes.field}
                  label="User Name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  error={errorFlags[2]}
                  helperText={errors.username}
                />
                <TextField
                  name="firstname"
                  type="text"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                  className={classes.field}
                  label="First Name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  error={errorFlags[3]}
                  helperText={errors.firstname}
                />
                <TextField
                  name="lastname"
                  type="text"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  className={classes.field}
                  label="Last Name"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  error={errorFlags[4]}
                  helperText={errors.lastname}
                />
                <TextField
                  name="phoneNumber"
                  type="text"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  className={classes.field}
                  label="Phone Number"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  error={errorFlags[5]}
                  helperText={errors.phoneNumber}
                />
                <TextField
                  name="gender"
                  select
                  label="Gender"
                  className={classes.field}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  color="secondary"
                  fullWidth
                  variant="outlined"
                  error={errorFlags[6]}
                  helperText={errors.gender}
                >
                  {genderValue.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>

                <Box align="center" className={classes.buttonContainer}>
                  <Button type="submit" color="primary" variant="contained">
                    Request Access
                  </Button>
                </Box>
              </form>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds, password) => dispatch(signUp(creds, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
