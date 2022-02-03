import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateTransmission } from "../../actions/transmissionDetail.action";

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

const UpdateTransmission = (props) => {
  const classes = useStyles();
  const { updateTransmission, handleClose, carVariant } = props;
  const [transmission, setTransmission] = React.useState(props.transmission);
  const [toSave, setToSave] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    setToSave(true);
    handleClose();
  };

  const handleChange = (e) => {
    setTransmission({
      ...transmission,
      [e.target.id]: e.target.value,
    });
  };

  const validate = () => {
    if (transmission.driveType === "") {
      setTransmission({ ...transmission, driveType: "-" });
    }
    if (transmission.transmissionType === "") {
      setTransmission({ ...transmission, transmissionType: "-" });
    }
    if (transmission.gearBox === "") {
      setTransmission({ ...transmission, gearBox: "-" });
    }
  };

  useEffect(() => {
    if (
      toSave &&
      transmission.driveType !== "" &&
      transmission.transmissionType !== "" &&
      transmission.gearBox !== ""
    ) {
      updateTransmission(carVariant, transmission);
    }
  }, [toSave, transmission]);

  return (
    <form
      id="addTransmissionForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="driveType"
        type="text"
        onChange={handleChange}
        value={transmission.driveType}
        className={classes.field}
        label="Drive Type"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="transmissionType"
        type="text"
        onChange={handleChange}
        value={transmission.transmissionType}
        className={classes.field}
        label="Transmission Type"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="gearBox"
        type="text"
        onChange={handleChange}
        value={transmission.gearBox}
        className={classes.field}
        label="Gear Box"
        variant="outlined"
        color="secondary"
        fullWidth
      />

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
    updateTransmission: (carVariant, transmission) =>
      dispatch(updateTransmission(carVariant, transmission)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateTransmission);
