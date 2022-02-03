import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";
import FormDialog from "../FormDialog";

const useStyles = makeStyles((theme) => ({
  pageRoot: {
    background: "#f9f9f9",
    width: "100%",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  table: {
    minWidth: 300,
  },
  stack: {
    marginBottom: theme.spacing(3),
  },
  TableContainer: {
    background: theme.palette.common.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableCell2 = withStyles((theme) => ({
  body: {
    fontSize: 14,
    color: theme.palette.primary.main,
  },
}))(TableCell);

const TechnicalSpecsTable = (props) => {
  const classes = useStyles();
  const {
    engines,
    performances,
    transmissions,
    carVariantsArr,
    variantValue,
    newVId,
  } = props;
  const [engine, setEngine] = useState();
  const [performance, setPerformance] = useState();
  const [transmission, setTransmission] = useState();

  const clickableEngines = () => {
    if (engine) {
      return false;
    } else {
      return true;
    }
  };
  const clickablePerformances = () => {
    if (performance) {
      return false;
    } else {
      return true;
    }
  };
  const clickableTransmissions = () => {
    if (transmission) {
      return false;
    } else {
      return true;
    }
  };

  React.useEffect(() => {
    if (engines) {
      let temp = Object.entries(engines)
        .map((key) => ({
          ...key[1],
          id: key[0],
        }))
        .filter((item) => item.vId === newVId);
      if (temp.length !== 0) {
        setEngine(temp);
      } else {
        setEngine();
      }
    }
    if (performances) {
      let temp = Object.entries(performances)
        .map((key) => ({
          ...key[1],
          id: key[0],
        }))
        .filter((item) => item.vId === newVId);
      if (temp.length !== 0) {
        setPerformance(temp);
      } else {
        setPerformance();
      }
    }
    if (transmissions) {
      let temp = Object.entries(transmissions)
        .map((key) => ({
          ...key[1],
          id: key[0],
        }))
        .filter((item) => item.vId === newVId);
      if (temp.length !== 0) {
        setTransmission(temp);
      } else {
        setTransmission();
      }
    }
  }, [engines, performances, transmissions, newVId]);

  const viewChip = () => {
    if (!engine || !performance || !transmission) {
      return (
        <Stack direction="row" spacing={1} className={classes.stack}>
          <FormDialog
            chip
            title="Add Engine Details"
            clickable={clickableEngines}
            carVariant={carVariantsArr[variantValue]}
          />
          <FormDialog
            chip
            title="Add Performance Details"
            clickable={clickablePerformances}
            carVariant={carVariantsArr[variantValue]}
          />
          <FormDialog
            chip
            title="Add Transmission Details"
            clickable={clickableTransmissions}
            carVariant={carVariantsArr[variantValue]}
          />
        </Stack>
      );
    }
  };

  const engineDetails = () => {
    if (engine && engine.length !== 0) {
      return (
        <TableBody>
          <TableRow>
            <StyledTableCell2 component="th" scope="row">
              Engine Details
            </StyledTableCell2>
            <StyledTableCell2>
              <Stack spacing={2} direction="row">
                <FormDialog
                  title="Update Engine Details"
                  update="yes"
                  engine={engine[0]}
                  carVariant={carVariantsArr[variantValue]}
                />
                <FormDialog
                  title="Delete Engine Details"
                  toDelete="yes"
                  engine={engine[0]}
                  carVariant={carVariantsArr[variantValue]}
                />
              </Stack>
            </StyledTableCell2>
          </TableRow>
          {engine[0].valvesPerCylinder && engine[0].valvesPerCylinder !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                Valves Per Cylinder
              </TableCell>
              <TableCell component="th" scope="row">
                {engine[0].valvesPerCylinder}
              </TableCell>
            </TableRow>
          )}
          {engine[0].valveConfiguration &&
            engine[0].valveConfiguration !== "-" && (
              <TableRow>
                <TableCell component="th" scope="row">
                  Valve Configuration
                </TableCell>
                <TableCell component="th" scope="row">
                  {engine[0].valveConfiguration}
                </TableCell>
              </TableRow>
            )}
          {engine[0].noOfCylinder && engine[0].noOfCylinder !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                Number Of Cylinders
              </TableCell>
              <TableCell component="th" scope="row">
                {engine[0].noOfCylinder}
              </TableCell>
            </TableRow>
          )}
          {engine[0].compressionRatio && engine[0].compressionRatio !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                Compression Ratio
              </TableCell>
              <TableCell component="th" scope="row">
                {engine[0].compressionRatio}
              </TableCell>
            </TableRow>
          )}
          {engine[0].fuelSupplySystem && engine[0].fuelSupplySystem !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                Fuel Supply System
              </TableCell>
              <TableCell component="th" scope="row">
                {engine[0].fuelSupplySystem}
              </TableCell>
            </TableRow>
          )}
          {engine[0].engine && engine[0].engine !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                Engine
              </TableCell>
              <TableCell component="th" scope="row">
                {engine[0].engine}
              </TableCell>
            </TableRow>
          )}
          {engine[0].batteryType && engine[0].batteryType !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                Battery Type
              </TableCell>
              <TableCell component="th" scope="row">
                {engine[0].batteryType}
              </TableCell>
            </TableRow>
          )}
          {engine[0].motorType && engine[0].motorType !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                Motor Type
              </TableCell>
              <TableCell component="th" scope="row">
                {engine[0].motorType}
              </TableCell>
            </TableRow>
          )}
          {engine[0].acCharging && engine[0].acCharging !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                AC Charging
              </TableCell>
              <TableCell component="th" scope="row">
                {engine[0].acCharging}
              </TableCell>
            </TableRow>
          )}
          {engine[0].estimatedFastChargingTime &&
            engine[0].estimatedFastChargingTime !== "-" && (
              <TableRow>
                <TableCell component="th" scope="row">
                  Estimated Fast Charging Time
                </TableCell>
                <TableCell component="th" scope="row">
                  {engine[0].estimatedFastChargingTime}
                </TableCell>
              </TableRow>
            )}
          {engine[0].batteryCapacity && engine[0].batteryCapacity !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                Battery Capacity
              </TableCell>
              <TableCell component="th" scope="row">
                {engine[0].batteryCapacity}
              </TableCell>
            </TableRow>
          )}
          {engine[0].dcCharging && engine[0].dcCharging !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                DC Charging
              </TableCell>
              <TableCell component="th" scope="row">
                {engine[0].dcCharging}
              </TableCell>
            </TableRow>
          )}
          {engine[0].estimatedRegularChargingTime &&
            engine[0].estimatedRegularChargingTime !== "-" && (
              <TableRow>
                <TableCell component="th" scope="row">
                  Estimated Regular Charging Time
                </TableCell>
                <TableCell component="th" scope="row">
                  {engine[0].estimatedRegularChargingTime}
                </TableCell>
              </TableRow>
            )}
          {engine[0].acCharging && engine[0].acCharging !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                AC Charging
              </TableCell>
              <TableCell component="th" scope="row">
                {engine[0].acCharging}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      );
    } else {
      return (
        <TableBody>
          <TableRow>
            <StyledTableCell2 component="th" scope="row">
              Engine Details
            </StyledTableCell2>
            <StyledTableCell2></StyledTableCell2>
          </TableRow>
        </TableBody>
      );
    }
  };

  const performanceDetails = () => {
    if (performance && performance.length !== 0) {
      return (
        <TableBody>
          <TableRow>
            <StyledTableCell2 component="th" scope="row">
              Performance Details
            </StyledTableCell2>
            <StyledTableCell2>
              <Stack spacing={2} direction="row">
                <FormDialog
                  title="Update Performance Details"
                  update="yes"
                  performance={performance[0]}
                  carVariant={carVariantsArr[variantValue]}
                />
                <FormDialog
                  title="Delete Performance Details"
                  toDelete="yes"
                  performance={performance[0]}
                  carVariant={carVariantsArr[variantValue]}
                />
              </Stack>
            </StyledTableCell2>
          </TableRow>
          {performance[0].fuelType && performance[0].fuelType !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                Fuel Type
              </TableCell>
              <TableCell component="th" scope="row">
                {performance[0].fuelType}
              </TableCell>
            </TableRow>
          )}
          {performance[0].power && performance[0].power !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                Power
              </TableCell>
              <TableCell component="th" scope="row">
                {performance[0].power}
              </TableCell>
            </TableRow>
          )}
          {performance[0].engineDisplacement &&
            performance[0].engineDisplacement !== "-" && (
              <TableRow>
                <TableCell component="th" scope="row">
                  Engine Displacement
                </TableCell>
                <TableCell component="th" scope="row">
                  {performance[0].engineDisplacement}
                </TableCell>
              </TableRow>
            )}
          {performance[0].torque && performance[0].torque !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                Torque
              </TableCell>
              <TableCell component="th" scope="row">
                {performance[0].torque}
              </TableCell>
            </TableRow>
          )}
          {performance[0].topSpeed && performance[0].topSpeed !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                Top Speed
              </TableCell>
              <TableCell component="th" scope="row">
                {performance[0].topSpeed}
              </TableCell>
            </TableRow>
          )}
          {performance[0].acceleration && performance[0].acceleration !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                Acceleration
              </TableCell>
              <TableCell component="th" scope="row">
                {performance[0].acceleration}
              </TableCell>
            </TableRow>
          )}
          {performance[0].fuelConsumption &&
            performance[0].fuelConsumption !== "-" && (
              <TableRow>
                <TableCell component="th" scope="row">
                  Fuel Consumption
                </TableCell>
                <TableCell component="th" scope="row">
                  {performance[0].fuelConsumption}
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      );
    } else {
      return (
        <TableBody>
          <TableRow>
            <StyledTableCell2 component="th" scope="row">
              Performance Details
            </StyledTableCell2>
            <StyledTableCell2></StyledTableCell2>
          </TableRow>
        </TableBody>
      );
    }
  };

  const transmissionDetails = () => {
    if (transmission && transmission.length !== 0) {
      return (
        <TableBody>
          <TableRow>
            <StyledTableCell2 component="th" scope="row">
              Transmission Details
            </StyledTableCell2>
            <StyledTableCell2>
              <Stack spacing={2} direction="row">
                <FormDialog
                  title="Update Transmission Details"
                  update="yes"
                  transmission={transmission[0]}
                  carVariant={carVariantsArr[variantValue]}
                />
                <FormDialog
                  title="Delete Transmission Details"
                  toDelete="yes"
                  transmission={transmission[0]}
                  carVariant={carVariantsArr[variantValue]}
                />
              </Stack>
            </StyledTableCell2>
          </TableRow>
          {transmission[0].driveType && transmission[0].driveType !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                Drive Type
              </TableCell>
              <TableCell component="th" scope="row">
                {transmission[0].driveType}
              </TableCell>
            </TableRow>
          )}
          {transmission[0].transmissionType &&
            transmission[0].transmissionType !== "-" && (
              <TableRow>
                <TableCell component="th" scope="row">
                  Transmission Type
                </TableCell>
                <TableCell component="th" scope="row">
                  {transmission[0].transmissionType}
                </TableCell>
              </TableRow>
            )}
          {transmission[0].gearBox && transmission[0].gearBox !== "-" && (
            <TableRow>
              <TableCell component="th" scope="row">
                Gear Box
              </TableCell>
              <TableCell component="th" scope="row">
                {transmission[0].gearBox}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      );
    } else {
      return (
        <TableBody>
          <TableRow>
            <StyledTableCell2 component="th" scope="row">
              Transmission Details
            </StyledTableCell2>
            <StyledTableCell2></StyledTableCell2>
          </TableRow>
        </TableBody>
      );
    }
  };

  return (
    <Box className={classes.pageRoot}>
      {viewChip()}
      <TableContainer className={classes.TableContainer}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>TECHNICAL SPECIFICATIONS</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          {engineDetails()}
          {performanceDetails()}
          {transmissionDetails()}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TechnicalSpecsTable;
