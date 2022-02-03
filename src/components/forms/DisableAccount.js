import React from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { disableAdmin } from "../../actions/admin.actions";

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

const DisableAccount = ({ admin, handleClose, disableAdmin }) => {
  const classes = useStyles();

  const handleSubmit = (e, admin) => {
    e.preventDefault();
    disableAdmin(admin);
    handleClose();
  };

  return (
    <form id="DisableAccountForm" noValidate autoComplete="off">
      {console.log(admin)}
      <Typography variant="body1" className={classes.field}>
        You are about to disable an admin's account. The user will not be able
        to access CARIFY Admin later. Disable CARIFY Admin access for{" "}
        {admin.firstname} {admin.lastname}, username: {admin.username}?
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
    disableAdmin: (admin) => dispatch(disableAdmin(admin)),
  };
};

export default connect(null, mapDispatchToProps)(DisableAccount);
