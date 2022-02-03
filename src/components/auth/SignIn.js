import React, { useState } from "react";
import {
  Grid,
  Card,
  TextField,
  makeStyles,
  Typography,
  Button,
  Box,
  Link,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signIn } from "../../actions/auth.actions";
import { useHistory } from "react-router-dom";
import { signOut } from "../../actions/auth.actions";
import ResetPassword from "./ResetPassword";

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
    title: {
      marginBottom: theme.spacing(6),
    },
  };
});

const SignIn = (props) => {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  const history = useHistory();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorFlags, setErrorFlags] = useState({});
  const [validated, setValidated] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
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

  React.useEffect(() => {
    if (validated === true) {
      props.signIn(creds);
    }
  }, [validated]);

  const validate = () => {
    let temp = { ...errors };
    let flagTemp = { ...errorFlags };

    if (creds.email === "") {
      temp.email = "Email is required";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(creds.email)
    ) {
      temp.email = "Invalid email";
    } else {
      temp.email = "";
    }

    temp.password = creds.password === "" ? "Password is required" : "";

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

  const handleChange = (e) => {
    setCreds({
      ...creds,
      [e.target.id]: e.target.value,
    });
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setForgotPassword(true);
  };

  const view = () => {
    if (!forgotPassword) {
      return (
        <Card className={classes.card}>
          <Typography
            color="primary"
            variant="h3"
            align="center"
            className={classes.title}
          >
            ADMINISTRATION
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              id="email"
              type="email"
              onChange={handleChange}
              value={creds.email}
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
              id="password"
              type="password"
              onChange={handleChange}
              value={creds.password}
              className={classes.field}
              label="Password"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              error={errorFlags[1]}
              helperText={errors.password}
            />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={0}
            >
              <Link href="#" onClick={(e) => handleForgotPasswordClick(e)}>
                Forgot Password?
              </Link>

              <Link href="/signup">Request CARIFY Access</Link>
            </Stack>

            <Box align="center" className={classes.buttonContainer}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={(e) => handleSubmit(e)}
              >
                Login
              </Button>
            </Box>
          </form>
        </Card>
      );
    } else {
      return (
        <ResetPassword
          setForgotPassword={setForgotPassword}
          preventDefault={preventDefault}
        />
      );
    }
  };
  const { auth, profile } = props;

  //Route securing
  if (auth.uid || profile.authorised) return <Redirect to="/" />;

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
            {view()}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
