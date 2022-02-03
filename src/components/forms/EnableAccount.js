import React from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { enableAdmin } from "../../actions/admin.actions";

const useStyles = makeStyles((theme) => {
  return {
    field: {
      marginTop: 20,
      marginBottom: 20,
      width: 500,
      display: "block",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 40,
    },
    button: {
      paddingLeft: 20,
      paddingRight: 20,
      width: 85,
      marginLeft: 20,
    },
  };
});

const EnableAccount = ({ admin, handleClose, enableAdmin }) => {
  const classes = useStyles();

  const handleSubmit = (e, admin) => {
    e.preventDefault();
    enableAdmin(admin);
    handleClose();
  };

  return (
    <form id="EnableAccountForm" noValidate autoComplete="off">
      {console.log(admin)}
      <Typography variant="body1" className={classes.field}>
        You are about to enable a disabled admin's account. Give access to
        CARIFY Admin for {admin.firstname} {admin.lastname}, username:{" "}
        {admin.username}?
      </Typography>
      <Box align="center" className={classes.buttonContainer}>
        <Button
          className={classes.button}
          onClick={() => handleClose()}
          color="primary"
          variant="contained"
        >
          NO
        </Button>
        <Button
          className={classes.button}
          onClick={(e) => handleSubmit(e, admin)}
          color="primary"
          variant="outlined"
        >
          YES
        </Button>
      </Box>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    enableAdmin: (admin) => dispatch(enableAdmin(admin)),
  };
};

export default connect(null, mapDispatchToProps)(EnableAccount);
