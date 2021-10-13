import React from 'react'
import { Redirect } from 'react-router-dom'
import Drawer from '../../layout/Drawer'
import { makeStyles, Typography} from '@material-ui/core'
import Search from '../../Search'
import CarBrandCard from '../../cards/CarBrandCard'
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

const CarBrand = (props) => {
    const classes = useStyles()
    const { auth, carBrands } = props;

    //Route securing
    if(!auth.uid) return <Redirect to='/signin' />
    return (
        <div className={classes.root}>
            <Drawer />
            <div className={classes.page}>
                <Search />
                <Typography color='primary' variant="h3">
                    Car Brand
                </Typography>
                <CarBrandCard carBrands={carBrands}/>
                <FormDialog title='New Brand' />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        carBrands: state.firestore.ordered.carBrand
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'carBrand' }
    ])
)(CarBrand)