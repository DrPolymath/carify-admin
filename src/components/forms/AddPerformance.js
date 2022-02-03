import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addPerformance } from "../../actions/performanceDetail.action";

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

const AddPerformance = ({ addPerformance, handleClose, carVariant }) => {
  const classes = useStyles();
  const [fuelType, setFuelType] = React.useState("");
  const [power, setPower] = React.useState("");
  const [engineDisplacement, setEngineDisplacement] = React.useState("");
  const [torque, setTorque] = React.useState("");
  const [topSpeed, setTopSpeed] = React.useState("");
  const [acceleration, setAcceleration] = React.useState("");
  const [fuelConsumption, setFuelConsumption] = React.useState("");

  const [performances, setPerformances] = React.useState(null);
  const [toSave, setToSave] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    setToSave(true);
    handleClose();
  };

  const validate = () => {
    if (fuelType === "") {
      setFuelType("-");
    }
    if (power === "") {
      setPower("-");
    }
    if (engineDisplacement === "") {
      setEngineDisplacement("-");
    }
    if (torque === "") {
      setTorque("-");
    }
    if (topSpeed === "") {
      setTopSpeed("-");
    }
    if (acceleration === "") {
      setAcceleration("-");
    }
    if (fuelConsumption === "") {
      setFuelConsumption("-");
    }
  };

  useEffect(() => {
    if (fuelType && power && engineDisplacement && torque && topSpeed && acceleration && fuelConsumption) {
      setPerformances({
        fuelType,
        power,
        engineDisplacement,
        torque,
        topSpeed,
        acceleration,
        fuelConsumption,
      });
    }
  }, [
    fuelType,
    power,
    engineDisplacement,
    torque,
    topSpeed,
    acceleration,
    fuelConsumption,
  ]);

  useEffect(() => {
    if (toSave && performances !== null) {
      addPerformance(carVariant, performances);
      console.log(carVariant, performances);
    }
  }, [toSave, performances]);

  return (
    <form
      id="addPerformanceForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="fuelType"
        type="text"
        onChange={(e) => setFuelType(e.target.value)}
        value={fuelType}
        className={classes.field}
        label="Fuel Type"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="power"
        type="text"
        onChange={(e) => setPower(e.target.value)}
        value={power}
        className={classes.field}
        label="Power"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="engineDisplacement"
        type="text"
        onChange={(e) => setEngineDisplacement(e.target.value)}
        value={engineDisplacement}
        className={classes.field}
        label="Engine Displacement"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="torque"
        type="text"
        onChange={(e) => setTorque(e.target.value)}
        value={torque}
        className={classes.field}
        label="Torque"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="topSpeed"
        type="text"
        onChange={(e) => setTopSpeed(e.target.value)}
        value={topSpeed}
        className={classes.field}
        label="Top Speed "
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="acceleration"
        type="text"
        onChange={(e) => setAcceleration(e.target.value)}
        value={acceleration}
        className={classes.field}
        label="Acceleration"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="fuelConsumption"
        type="text"
        onChange={(e) => setFuelConsumption(e.target.value)}
        value={fuelConsumption}
        className={classes.field}
        label="Fuel Consumption"
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
    addPerformance: (carVariant, performances) =>
      dispatch(addPerformance(carVariant, performances)),
  };
};

export default connect(null, mapDispatchToProps)(AddPerformance);
