import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { Link } from "react-router-dom";
import { firestoreConnect, useFirestoreConnect } from "react-redux-firebase";
import { Button } from "@material-ui/core";
import FormDialog from "../FormDialog";
import { Stack } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  table: {
    minWidth: 500,
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

function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const CarVariantTable = ({ carVariants, handleRerender, priceRanges }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableRender, setTableRender] = React.useState("");

  const handleTableRerender = (val) => {
    setTableRender(val);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (carVariants) {
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, carVariants.length - page * rowsPerPage);

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Brand</StyledTableCell>
              <StyledTableCell>Model</StyledTableCell>
              <StyledTableCell>Variant</StyledTableCell>
              <StyledTableCell>Body Type</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carVariants &&
              (rowsPerPage > 0
                ? carVariants.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : carVariants
              ).map((carVariant) => (
                <TableRow key={carVariant.id}>
                  <TableCell component="th" scope="row">
                    <Link
                      style={{ color: "inherit", textDecoration: "inherit" }}
                      to={"/cardetail/" + carVariant.cmId + "/" + carVariant.id}
                    >
                      <img
                        src={carVariant.url}
                        style={{
                          maxHeight: 50,
                          maxWidth: 100,
                          objectFit: "contain",
                        }}
                        alt=""
                      />
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link
                      style={{ color: "inherit", textDecoration: "inherit" }}
                      to={"/cardetail/" + carVariant.cmId + "/" + carVariant.id}
                    >
                      {carVariant.carBrandName}
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link
                      style={{ color: "inherit", textDecoration: "inherit" }}
                      to={"/cardetail/" + carVariant.cmId + "/" + carVariant.id}
                    >
                      {carVariant.carModelName}
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link
                      style={{ color: "inherit", textDecoration: "inherit" }}
                      to={"/cardetail/" + carVariant.cmId + "/" + carVariant.id}
                    >
                      {carVariant.carVariantName}
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link
                      style={{ color: "inherit", textDecoration: "inherit" }}
                      to={"/cardetail/" + carVariant.cmId + "/" + carVariant.id}
                    >
                      {carVariant.carTypeName}
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link
                      style={{ color: "inherit", textDecoration: "inherit" }}
                      to={"/cardetail/" + carVariant.cmId + "/" + carVariant.id}
                    >
                      {carVariant.price}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={2} direction="row">
                      <FormDialog
                        title="Update Car Variant"
                        carVariant={carVariant}
                        priceRanges={priceRanges}
                        handleRerender={handleRerender}
                        update="yes"
                      />
                      <FormDialog
                        title="Delete Car Variant"
                        carVariant={carVariant}
                        handleRerender={handleRerender}
                        handleTableRerender={handleTableRerender}
                        toDelete="yes"
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={4} //
                count={carVariants.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading car variant list...</p>
      </div>
    );
  }
};

export default CarVariantTable;
