import React from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { rejectAdmin } from "../../actions/admin.actions";

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

const RejectRequest = ({ admin, handleClose, rejectAdmin }) => {
  const classes = useStyles();

  const handleSubmit = (e, admin) => {
    e.preventDefault();
    rejectAdmin(admin);
    handleClose();
  };

  return (
    <form id="RejectRequestForm" noValidate autoComplete="off">
      {console.log(admin)}
      <Typography variant="body1" className={classes.field}>
        Reject {admin.email} from accessing CARIFY Admin? The user will be
        removed to Disabled Account.
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
    rejectAdmin: (admin) => dispatch(rejectAdmin(admin)),
  };
};

export default connect(null, mapDispatchToProps)(RejectRequest);
