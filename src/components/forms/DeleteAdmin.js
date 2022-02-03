import React from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { deleteProfileAdmin } from "../../actions/admin.actions";

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

const DeleteAdmin = ({ deleteProfileAdmin, profileInfo, handleClose }) => {
  const classes = useStyles();

  const handleSubmit = (e, profileInfo) => {
    e.preventDefault();
    deleteProfileAdmin(profileInfo);
    handleClose();
  };

  return (
    <form id="deleteAdminForm" noValidate autoComplete="off">
      <Typography variant="body1" className={classes.field}>
        Are you sure to permanently deactivate your CARIFY Admin account? You
        account will be deleted and will not be able to make future changes to
        the system.
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
          onClick={(e) => handleSubmit(e, profileInfo)}
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
    deleteProfileAdmin: (profileInfo) =>
      dispatch(deleteProfileAdmin(profileInfo)),
  };
};

export default connect(null, mapDispatchToProps)(DeleteAdmin);
