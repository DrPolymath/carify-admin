import React from 'react'
import { Redirect } from 'react-router-dom'
import Drawer from '../layout/Drawer'
import { makeStyles, Typography } from '@material-ui/core'
import Search from '../Search'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import LogTable from '../tables/LogTable'

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
    title: {
        marginBottom: 20,
    }
}));

const Log = (props) => {
    const classes = useStyles()
    const { auth, activitylogs } = props;
    //Route securing
    if(!auth.uid) return <Redirect to='/signin' />
    return (
        <div className={classes.root}>
            <Drawer />
            <div className={classes.page}>
                <Search />
                <Typography className={classes.title} color='primary' variant="h3">
                    Log
                </Typography>
                <LogTable activitylogs={activitylogs} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        activitylogs: state.firestore.ordered.activityLog
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'activityLog',
            orderBy: [
                ['timestamp', 'desc'],
            ]
        }
    ])
)(Log)