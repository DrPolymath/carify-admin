import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addTransmission } from "../../actions/transmissionDetail.action";

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
  };
});

const AddTransmission = ({ addTransmission, handleClose, carVariant }) => {
  const classes = useStyles();
  const [driveType, setDriveType] = React.useState("");
  const [transmissionType, setTransmissionType] = React.useState("");
  const [gearBox, setGearBox] = React.useState("");

  const [transmissions, setTransmissions] = React.useState(null);
  const [toSave, setToSave] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    setToSave(true);
    handleClose();
  };

  const validate = () => {
    if (driveType === "") {
      setDriveType("-");
    }
    if (transmissionType === "") {
      setTransmissionType("-");
    }
    if (gearBox === "") {
      setGearBox("-");
    }
  };

  useEffect(() => {
    if (driveType && transmissionType && gearBox) {
      setTransmissions({
        driveType,
        transmissionType,
        gearBox,
      });
    }
  }, [driveType, transmissionType, gearBox]);

  useEffect(() => {
    if (toSave && transmissions !== null) {
      addTransmission(carVariant, transmissions);
      console.log(carVariant, transmissions);
    }
  }, [toSave, transmissions]);

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
        onChange={(e) => setDriveType(e.target.value)}
        value={driveType}
        className={classes.field}
        label="Drive Type"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="transmissionType"
        type="text"
        onChange={(e) => setTransmissionType(e.target.value)}
        value={transmissionType}
        className={classes.field}
        label="Transmission Type"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="gearBox"
        type="text"
        onChange={(e) => setGearBox(e.target.value)}
        value={gearBox}
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
    addTransmission: (carVariant, transmissions) =>
      dispatch(addTransmission(carVariant, transmissions)),
  };
};

export default connect(null, mapDispatchToProps)(AddTransmission);
