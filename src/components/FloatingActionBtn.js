import { makeStyles, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh'
    },
    page: {
        background: '#f9f9f9',
        width: '100%',
        padding: theme.spacing(3),
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    }
}));

const FloatingActionBtn = ({ handleClickOpen }) => {
    const classes = useStyles()
    return (
        <Fab className={classes.fab}color="primary" aria-label="add" onClick={() => handleClickOpen()}>
            <AddIcon />
        </Fab>
    )
}

export default FloatingActionBtn;
