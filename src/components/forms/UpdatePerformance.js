import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updatePerformance } from "../../actions/performanceDetail.action";

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

const UpdatePerformance = (props) => {
  const classes = useStyles();
  const { updatePerformance, handleClose, carVariant } = props;
  const [performance, setPerformance] = React.useState(props.performance);
  const [toSave, setToSave] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    setToSave(true);
    handleClose();
  };

  const handleChange = (e) => {
    setPerformance({
      ...performance,
      [e.target.id]: e.target.value,
    });
  };

  const validate = () => {
    if (performance.fuelType === "") {
      setPerformance({ ...performance, fuelType: "-" });
    }
    if (performance.power === "") {
      setPerformance({ ...performance, power: "-" });
    }
    if (performance.engineDisplacement === "") {
      setPerformance({ ...performance, engineDisplacement: "-" });
    }
    if (performance.torque === "") {
      setPerformance({ ...performance, torque: "-" });
    }
    if (performance.topSpeed === "") {
      setPerformance({ ...performance, topSpeed: "-" });
    }
    if (performance.acceleration === "") {
      setPerformance({ ...performance, acceleration: "-" });
    }
    if (performance.fuelConsumption === "") {
      setPerformance({ ...performance, fuelConsumption: "-" });
    }
  };

  useEffect(() => {
    if (toSave) {
      validate();
    }
    if (
      toSave &&
      performance.fuelType !== "" &&
      performance.power !== "" &&
      performance.engineDisplacement !== "" &&
      performance.torque !== "" &&
      performance.topSpeed !== "" &&
      performance.acceleration !== "" &&
      performance.fuelConsumption !== ""
    ) {
      updatePerformance(carVariant, performance);
    }
  }, [toSave, performance]);

  React.useEffect(() => {
    if (props.performance) {
      const performanceItem = {
        id: props.performance.id,
        vId: props.performance.vId,
        fuelType:
          props.performance.fuelType === undefined
            ? ""
            : props.performance.fuelType,
        power:
          props.performance.power === undefined ? "" : props.performance.power,
        engineDisplacement:
          props.performance.engineDisplacement === undefined
            ? ""
            : props.performance.engineDisplacement,
        torque:
          props.performance.torque === undefined
            ? ""
            : props.performance.torque,
        topSpeed:
          props.performance.topSpeed === undefined
            ? ""
            : props.performance.topSpeed,
        acceleration:
          props.performance.acceleration === undefined
            ? ""
            : props.performance.acceleration,
        fuelConsumption:
          props.performance.fuelConsumption === undefined
            ? ""
            : props.performance.fuelConsumption,
      };
      setPerformance(performanceItem);
    }
  }, []);

  return (
    <form
      id="addPerformanceForm"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {console.log(performance, "render")}
      <TextField
        id="fuelType"
        type="text"
        onChange={handleChange}
        value={performance.fuelType}
        className={classes.field}
        label="Fuel Type"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="power"
        type="text"
        onChange={handleChange}
        value={performance.power}
        className={classes.field}
        label="Power"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="engineDisplacement"
        type="text"
        onChange={handleChange}
        value={performance.engineDisplacement}
        className={classes.field}
        label="Engine Displacement"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="torque"
        type="text"
        onChange={handleChange}
        value={performance.torque}
        className={classes.field}
        label="Torque"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="topSpeed"
        type="text"
        onChange={handleChange}
        value={performance.topSpeed}
        className={classes.field}
        label="Top Speed "
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="acceleration"
        type="text"
        onChange={handleChange}
        value={performance.acceleration}
        className={classes.field}
        label="Acceleration"
        variant="outlined"
        color="secondary"
        fullWidth
      />
      <TextField
        id="fuelConsumption"
        type="text"
        onChange={handleChange}
        value={performance.fuelConsumption}
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
    updatePerformance: (carVariant, performance) =>
      dispatch(updatePerformance(carVariant, performance)),
  };
};

export default connect(null, mapDispatchToProps)(UpdatePerformance);
