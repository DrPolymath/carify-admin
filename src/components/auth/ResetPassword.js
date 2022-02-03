import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
  Card,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { passwordReset } from "../../actions/auth.actions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
    card: {
      padding: theme.spacing(8),
    },
    field: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      display: "block",
    },
    buttonContainer: {
      paddingTop: theme.spacing(3),
    },
    title: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    content: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
    },
  };
});

const ResetPassword = ({
  passwordReset,
  setForgotPassword,
  preventDefault,
}) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = useState({});
  const [errorFlags, setErrorFlags] = useState({});
  const [validated, setValidated] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
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
      passwordReset(email);
    }
  }, [validated]);

  const handleClick = (e) => {
    setForgotPassword(false);
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
    <Card className={classes.card}>
      <ArrowBackIcon onClick={(e) => handleClick(e)} />
      <Typography
        color="primary"
        variant="h3"
        align="center"
        className={classes.title}
      >
        Password Reset
      </Typography>
      <Typography variant="subtitle1" className={classes.content}>
        Forgotten your password? Enter your email address below, and we will
        email instructions for setting a new one.
      </Typography>
      <form
        id="resetPasswordForm"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={classes.field}
          label="Email Address"
          variant="outlined"
          color="secondary"
          fullWidth
          error={errorFlags[0]}
          helperText={errors.email}
        />

        <Box align="center" className={classes.buttonContainer}>
          <Button type="submit" color="primary" variant="contained">
            Reset Password
          </Button>
        </Box>
      </form>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    passwordReset: (email) => dispatch(passwordReset(email)),
  };
};

export default connect(null, mapDispatchToProps)(ResetPassword);
