import { TextField, makeStyles, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    field: {
        marginBottom: 20,
        display: 'block'
    },
    filter: {
        marginRight: theme.spacing(1)
    }
}));

const Search = () => {
    const classes = useStyles()
    return (
        <TextField
            id='search'
            type='text'
            className={classes.field}
            variant="outlined"
            placeholder='Search'
            color="secondary"
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <FilterListIcon className={classes.filter} color='disabled'/>
                    <SearchIcon color='disabled'/>
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default Search
