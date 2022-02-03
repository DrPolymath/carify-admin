import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { Box, CircularProgress } from "@material-ui/core";
import { Stack } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  pageRoot: {
    background: "#f9f9f9",
    width: "100%",
    margin: theme.spacing(3),
  },
  table: {
    minWidth: 300,
    background: theme.palette.common.white,
  },
  TableContainer: {
    background: "#f9f9f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(10),
    width: "100%",
    height: "80%",
  },
  page: {
    padding: theme.spacing(5),
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

const OverviewTable = ({ carVariantsArr, variantValue, colors, newVId }) => {
  const classes = useStyles();
  const [tableRender, setTableRender] = React.useState("");
  const [color, setColor] = React.useState();

  React.useEffect(() => {
    if (colors && newVId) {
      let temp = Object.entries(colors)
        .map((key) => ({
          ...key[1],
          id: key[0],
        }))
        .filter((item) => item.vId === newVId)
        .sort(function (a, b) {
          var x = a.colorCode.toLowerCase();
          var y = b.colorCode.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
      if (temp.length !== 0) {
        setColor(temp);
      } else {
        setColor();
      }
    }
  }, [colors, newVId]);

  const calculateInstallment = () => {
    // total interest = interest rate/100 x loan amount x loan period
    // installment = (loan amount + total interest) / (loan period x 12)

    var price = carVariantsArr[variantValue].price.slice(
      2,
      carVariantsArr[variantValue].price.length
    );
    price = price.replace(/\,/g, "");
    price = parseInt(price, 10);
    let installment = (price + 0.03 * price * 9) / (9 * 12);
    installment = installment.toFixed(2).toLocaleString();
    installment = "RM " + installment;
    return installment;
  };

  const handleTableRerender = (val) => {
    setTableRender(val);
  };

  if (color) {
    return (
      <Box className={classes.pageRoot}>
        <TableContainer className={classes.TableContainer}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell>OVERVIEW</StyledTableCell>
                <StyledTableCell>
                  {carVariantsArr[variantValue].carBrandName}{" "}
                  {carVariantsArr[variantValue].carModelName}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Brand
                </TableCell>
                <TableCell component="th" scope="row">
                  {carVariantsArr[variantValue].carBrandName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Starting Price
                </TableCell>
                <TableCell component="th" scope="row">
                  {carVariantsArr[variantValue].price}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Installment Estimation
                  <Tooltip
                    title="Zero downpayment with 3% interest rate for 9 years"
                    placement="top"
                  >
                    <Button>*</Button>
                  </Tooltip>
                </TableCell>
                <TableCell component="th" scope="row">
                  {calculateInstallment()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Available Colour(s)
                </TableCell>
                <TableCell component="th" scope="row">
                  <Stack direction="row" spacing={2}>
                    {color.map((item) => {
                      return (
                        <div key={item.id}>
                          <Tooltip title={item.colorName} placement="top">
                            <div
                              style={{
                                display: "inline-block",
                                width: "20px",
                                height: "20px",
                                backgroundColor: "#" + item.colorCode,
                                borderRadius: "50%",
                                border: "1px solid #262a2c",
                              }}
                            />
                          </Tooltip>
                        </div>
                      );
                    })}
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Vehicle Type
                </TableCell>
                <TableCell component="th" scope="row">
                  {carVariantsArr[variantValue].bodyType}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  } else {
    return (
      <div className={classes.page}>
        <Box className={classes.loadingcontainer}>
          <CircularProgress />
        </Box>
      </div>
    );
  }
};

export default OverviewTable;
