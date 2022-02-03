import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addEngine } from "../../actions/engineDetail.action";

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

const AddEngine = ({ addEngine, handleClose, carVariant }) => {
  const classes = useStyles();
  const [valvesPerCylinder, setValvesPerCylinder] = React.useState("");
  const [valveConfiguration, setValveConfiguration] = React.useState("");
  const [noOfCylinder, setNoOfCylinder] = React.useState("");
  const [compressionRatio, setCompressionRatio] = React.useState("");
  const [engine, setEngine] = React.useState("");
  const [fuelSupplySystem, setFuelSupplySystem] = React.useState("");
  const [motorType, setMotorType] = React.useState("");
  const [acCharging, setAcCharging] = React.useState("");
  const [estimatedFastChargingTime, setEstimatedFastChargingTime] =
    React.useState("");
  const [batteryCapacity, setBatteryCapacity] = React.useState("");
  const [batteryVoltage, setBatteryVoltage] = React.useState("");
  const [dcCharging, setDcCharging] = React.useState("");
  const [estimatedRegularChargingTime, setEstimatedRegularChargingTime] =
    React.useState("");
  const [batteryType, setBatteryType] = React.useState("");
  const [engines, setEngines] = React.useState(null);
  const [toSave, setToSave] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    setToSave(true);
    handleClose();
  };

  const validate = () => {
    if (valvesPerCylinder === "") {
      setValvesPerCylinder("-");
    }
    if (valveConfiguration === "") {
      setValveConfiguration("-");
    }
    if (noOfCylinder === "") {
      setNoOfCylinder("-");
    }
    if (compressionRatio === "") {
      setCompressionRatio("-");
    }
    if (fuelSupplySystem === "") {
      setFuelSupplySystem("-");
    }
    if (engine === "") {
      setEngine("-");
    }
    if (batteryType === "") {
      setBatteryType("-");
    }
    if (motorType === "") {
      setMotorType("-");
    }
    if (acCharging === "") {
      setAcCharging("-");
    }
    if (estimatedFastChargingTime === "") {
      setEstimatedFastChargingTime("-");
    }
    if (batteryCapacity === "") {
      setBatteryCapacity("-");
    }
    if (batteryVoltage === "") {
      setBatteryVoltage("-");
    }
    if (dcCharging === "") {
      setDcCharging("-");
    }
    if (estimatedRegularChargingTime === "") {
      setEstimatedRegularChargingTime("-");
    }
  };

  useEffect(() => {
    if (
      valvesPerCylinder !== "" &&
      valveConfiguration !== "" &&
      noOfCylinder !== "" &&
      compressionRatio !== "" &&
      fuelSupplySystem !== "" &&
      engine !== "" &&
      batteryType !== "" &&
      motorType !== "" &&
      acCharging !== "" &&
      estimatedFastChargingTime !== "" &&
      batteryCapacity !== "" &&
      batteryVoltage !== "" &&
      dcCharging !== "" &&
      estimatedRegularChargingTime !== ""
    ) {
      setEngines({
        valvesPerCylinder,
        valveConfiguration,
        noOfCylinder,
        compressionRatio,
        fuelSupplySystem,
        engine,
        batteryType,
        motorType,
        acCharging,
        estimatedFastChargingTime,
        batteryCapacity,
        batteryVoltage,
        dcCharging,
        estimatedRegularChargingTime,
      });
    }
  }, [
    valvesPerCylinder,
    valveConfiguration,
    noOfCylinder,
    compressionRatio,
    fuelSupplySystem,
    engine,
    batteryType,
    motorType,
    acCharging,
    estimatedFastChargingTime,
    batteryCapacity,
    batteryVoltage,
    dcCharging,
    estimatedRegularChargingTime,
  ]);

  useEffect(() => {
    if (toSave && engines !== null) {
      addEngine(carVariant, engines);
      console.log(carVariant, engines);
    }
  }, [toSave, engines]);

  return (
    <form
      id="addEngineForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="valvesPerCylinder"
        type="text"
        onChange={(e) => setValvesPerCylinder(e.target.value)}
        value={valvesPerCylinder}
        className={classes.field}
        label="Valves Per Cylinder"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="valveConfiguration"
        type="text"
        onChange={(e) => setValveConfiguration(e.target.value)}
        value={valveConfiguration}
        className={classes.field}
        label="Valves Configuration"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="noOfCylinder"
        type="text"
        onChange={(e) => setNoOfCylinder(e.target.value)}
        value={noOfCylinder}
        className={classes.field}
        label="Number of Cylinder"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="compressionRatio"
        type="text"
        onChange={(e) => setCompressionRatio(e.target.value)}
        value={compressionRatio}
        className={classes.field}
        label="Compression Ratio"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="fuelSupplySystem"
        type="text"
        onChange={(e) => setFuelSupplySystem(e.target.value)}
        value={fuelSupplySystem}
        className={classes.field}
        label="Fuel Supply System"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="engine"
        type="text"
        onChange={(e) => setEngine(e.target.value)}
        value={engine}
        className={classes.field}
        label="Engine"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="batteryType"
        type="text"
        onChange={(e) => setBatteryType(e.target.value)}
        value={batteryType}
        className={classes.field}
        label="Battery Type"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="motorType"
        type="text"
        onChange={(e) => setMotorType(e.target.value)}
        value={motorType}
        className={classes.field}
        label="Motor Type"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="acCharging"
        type="text"
        onChange={(e) => setAcCharging(e.target.value)}
        value={acCharging}
        className={classes.field}
        label="AC Charging"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="estimatedFastChargingTime"
        type="text"
        onChange={(e) => setEstimatedFastChargingTime(e.target.value)}
        value={estimatedFastChargingTime}
        className={classes.field}
        label="Estimated Fast Charging Time"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="batteryCapacity"
        type="text"
        onChange={(e) => setBatteryCapacity(e.target.value)}
        value={batteryCapacity}
        className={classes.field}
        label="Battery Capacity"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="batteryVoltage"
        type="text"
        onChange={(e) => setBatteryVoltage(e.target.value)}
        value={batteryVoltage}
        className={classes.field}
        label="Battery Voltage"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="dcCharging"
        type="text"
        onChange={(e) => setDcCharging(e.target.value)}
        value={dcCharging}
        className={classes.field}
        label="DC Charging"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="estimatedRegularChargingTime"
        type="text"
        onChange={(e) => setEstimatedRegularChargingTime(e.target.value)}
        value={estimatedRegularChargingTime}
        className={classes.field}
        label="Estimated Regular Charging Time"
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
    addEngine: (carVariant, engines) =>
      dispatch(addEngine(carVariant, engines)),
  };
};

export default connect(null, mapDispatchToProps)(AddEngine);
