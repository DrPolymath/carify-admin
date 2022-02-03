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
import FormDialog from "../FormDialog";
import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  container: {
    marginBottom: theme.spacing(3),
  },
  table: {
    minWidth: 500,
  },
  title: {
    marginBottom: 20,
  },
  loadingcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(10),
    width: "100%",
    height: "80%",
  },
  paperContainer: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(10),
    marginRight: theme.spacing(1.2),
    height: "100%",
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

const AdminRequestTable = ({ data }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const requestTable = () => {
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    if (data.length === 0) {
      return (
        <div>
          <Typography className={classes.title} color="primary" variant="h5">
            New Admin Request
          </Typography>
          <Paper className={classes.paperContainer}>
            <Typography className={classes.title} variant="subtitle1">
              No new admin request
            </Typography>
          </Paper>
        </div>
      );
    } else {
      return (
        <div>
          <Typography className={classes.title} color="primary" variant="h5">
            New Admin Request
          </Typography>
          <TableContainer component={Paper} className={classes.container}>
            <Table
              className={classes.table}
              aria-label="custom pagination table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>First Name</StyledTableCell>
                  <StyledTableCell>Last Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Phone Number</StyledTableCell>
                  <StyledTableCell>Gender</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  (rowsPerPage > 0
                    ? data.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : data
                  ).map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell>{admin.firstname}</TableCell>
                      <TableCell>{admin.lastname}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>{admin.phoneNumber}</TableCell>
                      <TableCell>{admin.gender}</TableCell>
                      <TableCell>
                        <Stack spacing={2} direction="row">
                          <FormDialog
                            title="Approve Admin Request"
                            admin={admin}
                            approve="yes"
                          />
                          <FormDialog
                            title="Reject Admin Request"
                            admin={admin}
                            reject="yes"
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={8} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={8} //
                    count={data.length}
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
        </div>
      );
    }
  };

  if (data) {
    return <div>{requestTable()}</div>;
  } else {
    return (
      <div className="container center">
        <Box className={classes.loadingcontainer}>
          <CircularProgress />
        </Box>
      </div>
    );
  }
};

export default AdminRequestTable;
