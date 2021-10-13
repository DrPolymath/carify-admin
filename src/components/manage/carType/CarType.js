import React from 'react'
import { Redirect } from 'react-router-dom'
import Drawer from '../../layout/Drawer'
import { makeStyles, Typography } from '@material-ui/core'
import Search from '../../Search'
import CarTypeCard from '../../cards/CarTypeCard'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import FormDialog from '../../FormDialog'

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
}));

const CarType = (props) => {
    const classes = useStyles()
    const { auth, carTypes } = props;
    //Route securing
    if(!auth.uid) return <Redirect to='/signin' />
    return (
        <div className={classes.root}>
            <Drawer />
            <div className={classes.page}>
                <Search />
                <Typography color='primary' variant="h3">
                    Car Type
                </Typography>
                <CarTypeCard carTypes={carTypes}/>
                <FormDialog title='New Car Type'/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        auth: state.firebase.auth,
        carTypes: state.firestore.ordered.carType
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'carType'}
    ])
)(CarType)