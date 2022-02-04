import { TextField, makeStyles, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

const useStyles = makeStyles((theme) => ({
  field: {
    marginBottom: 20,
    display: "block",
  },
  filter: {
    marginRight: theme.spacing(1),
  },
}));

const Search = ({ searchQuery, setSearchQuery }) => {
  const classes = useStyles();
  return (
    <TextField
      id="search"
      type="text"
      value={searchQuery}
      onInput={(e) => setSearchQuery(e.target.value)}
      className={classes.field}
      variant="outlined"
      placeholder="Search"
      color="secondary"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="disabled" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
