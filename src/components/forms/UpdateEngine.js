import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateEngine } from "../../actions/engineDetail.action";

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

const UpdateEngine = (props) => {
  const classes = useStyles();
  const { updateEngine, handleClose, carVariant } = props;
  const [engine, setEngine] = React.useState(props.engine);
  const [toSave, setToSave] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    setToSave(true);
    handleClose();
  };

  const handleChange = (e) => {
    setEngine({
      ...engine,
      [e.target.id]: e.target.value,
    });
  };

  const validate = () => {
    if (engine.valvesPerCylinder === "") {
      setEngine({ ...engine, valvesPerCylinder: "-" });
    }
    if (engine.valveConfiguration === "") {
      setEngine({ ...engine, valveConfiguration: "-" });
    }
    if (engine.noOfCylinder === "") {
      setEngine({ ...engine, noOfCylinder: "-" });
    }
    if (engine.compressionRatio === "") {
      setEngine({ ...engine, compressionRatio: "-" });
    }
    if (engine.fuelSupplySystem === "") {
      setEngine({ ...engine, fuelSupplySystem: "-" });
    }
    if (engine.engine === "") {
      setEngine({ ...engine, engine: "-" });
    }
    if (engine.batteryType === "") {
      setEngine({ ...engine, batteryType: "-" });
    }
    if (engine.motorType === "") {
      setEngine({ ...engine, motorType: "-" });
    }
    if (engine.acCharging === "") {
      setEngine({ ...engine, acCharging: "-" });
    }
    if (engine.estimatedFastChargingTime === "") {
      setEngine({ ...engine, estimatedFastChargingTime: "-" });
    }
    if (engine.batteryCapacity === "") {
      setEngine({ ...engine, batteryCapacity: "-" });
    }
    if (engine.batteryVoltage === "") {
      setEngine({ ...engine, batteryVoltage: "-" });
    }
    if (engine.dcCharging === "") {
      setEngine({ ...engine, dcCharging: "-" });
    }
    if (engine.estimatedRegularChargingTime === "") {
      setEngine({ ...engine, estimatedRegularChargingTime: "-" });
    }
  };

  useEffect(() => {
    if (toSave) {
      validate();
    }
    if (
      toSave &&
      engine.valvesPerCylinder !== "" &&
      engine.valveConfiguration !== "" &&
      engine.noOfCylinder !== "" &&
      engine.compressionRatio !== "" &&
      engine.fuelSupplySystem !== "" &&
      engine.engine !== "" &&
      engine.batteryType !== "" &&
      engine.motorType !== "" &&
      engine.acCharging !== "" &&
      engine.estimatedFastChargingTime !== "" &&
      engine.batteryCapacity !== "" &&
      engine.batteryVoltage !== "" &&
      engine.dcCharging !== "" &&
      engine.estimatedRegularChargingTime !== ""
    ) {
      updateEngine(carVariant, engine);
    }
  }, [toSave, engine]);

  useEffect(() => {
    if (props.engine) {
      const engineItem = {
        id: props.engine.id,
        vId: props.engine.vId,
        valvesPerCylinder:
          props.engine.valvesPerCylinder === undefined
            ? ""
            : props.engine.valvesPerCylinder,
        valveConfiguration:
          props.engine.valveConfiguration === undefined
            ? ""
            : props.engine.valveConfiguration,
        noOfCylinder:
          props.engine.noOfCylinder === undefined
            ? ""
            : props.engine.noOfCylinder,
        compressionRatio:
          props.engine.compressionRatio === undefined
            ? ""
            : props.engine.compressionRatio,
        fuelSupplySystem:
          props.engine.fuelSupplySystem === undefined
            ? ""
            : props.engine.fuelSupplySystem,
        engine: props.engine.engine === undefined ? "" : props.engine.engine,
        batteryType:
          props.engine.batteryType === undefined
            ? ""
            : props.engine.batteryType,
        motorType:
          props.engine.motorType === undefined ? "" : props.engine.motorType,
        acCharging:
          props.engine.acCharging === undefined ? "" : props.engine.acCharging,
        estimatedFastChargingTime:
          props.engine.estimatedFastChargingTime === undefined
            ? ""
            : props.engine.estimatedFastChargingTime,
        batteryCapacity:
          props.engine.batteryCapacity === undefined
            ? ""
            : props.engine.batteryCapacity,
        batteryVoltage:
          props.engine.batteryVoltage === undefined
            ? ""
            : props.engine.batteryVoltage,
        dcCharging:
          props.engine.dcCharging === undefined ? "" : props.engine.dcCharging,
        estimatedRegularChargingTime:
          props.engine.estimatedRegularChargingTime === undefined
            ? ""
            : props.engine.estimatedRegularChargingTime,
      };
      setEngine(engineItem)
    }
  }, []);

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
        onChange={handleChange}
        value={engine.valvesPerCylinder}
        className={classes.field}
        label="Valves Per Cylinder"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="valveConfiguration"
        type="text"
        onChange={handleChange}
        value={engine.valveConfiguration}
        className={classes.field}
        label="Valves Configuration"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="noOfCylinder"
        type="text"
        onChange={handleChange}
        value={engine.noOfCylinder}
        className={classes.field}
        label="Number of Cylinder"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="compressionRatio"
        type="text"
        onChange={handleChange}
        value={engine.compressionRatio}
        className={classes.field}
        label="Compression Ratio"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="fuelSupplySystem"
        type="text"
        onChange={handleChange}
        value={engine.fuelSupplySystem}
        className={classes.field}
        label="Fuel Supply System"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="engine"
        type="text"
        onChange={handleChange}
        value={engine.engine}
        className={classes.field}
        label="Engine"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="batteryType"
        type="text"
        onChange={handleChange}
        value={engine.batteryType}
        className={classes.field}
        label="Battery Type"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="motorType"
        type="text"
        onChange={handleChange}
        value={engine.motorType}
        className={classes.field}
        label="Motor Type"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="acCharging"
        type="text"
        onChange={handleChange}
        value={engine.acCharging}
        className={classes.field}
        label="AC Charging"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="estimatedFastChargingTime"
        type="text"
        onChange={handleChange}
        value={engine.estimatedFastChargingTime}
        className={classes.field}
        label="Estimated Fast Charging Time"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="batteryCapacity"
        type="text"
        onChange={handleChange}
        value={engine.batteryCapacity}
        className={classes.field}
        label="Battery Capacity"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="batteryVoltage"
        type="text"
        onChange={handleChange}
        value={engine.batteryVoltage}
        className={classes.field}
        label="Battery Voltage"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="dcCharging"
        type="text"
        onChange={handleChange}
        value={engine.dcCharging}
        className={classes.field}
        label="DC Charging"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="estimatedRegularChargingTime"
        type="text"
        onChange={handleChange}
        value={engine.estimatedRegularChargingTime}
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
    updateEngine: (carVariant, engine) =>
      dispatch(updateEngine(carVariant, engine)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateEngine);
