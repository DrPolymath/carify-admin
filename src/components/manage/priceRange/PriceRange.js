import React from 'react'
import { Redirect } from 'react-router-dom'
import Drawer from '../../layout/Drawer'
import { makeStyles, Typography } from '@material-ui/core'
import Search from '../../Search'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import PriceRangeTable from '../../tables/PriceRangeTable'
import { removePriceRange } from '../../../actions/priceRange.actions'
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
    title: {
        marginBottom: 20,
    },
}));

const PriceRange = (props) => {
    const classes = useStyles()
    const { auth, priceRanges, removePriceRange } = props;

    const handleRemove = (priceRange) => {
        removePriceRange(priceRange)
    }
    //Route securing
    if(!auth.uid) return <Redirect to='/signin' />
    return (
        <div className={classes.root}>
            <Drawer />
            <div className={classes.page}>
                <Search />
                <Typography className={classes.title} color='primary' variant="h3">
                    Price Range
                </Typography>
                <PriceRangeTable priceRanges={priceRanges} handleRemove={handleRemove}/>
                <FormDialog title='New Price Range'/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        priceRanges: state.firestore.ordered.priceRange
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removePriceRange: (priceRange) => dispatch(removePriceRange(priceRange))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(ownProps => [
        {
            collection: 'priceRange',
            orderBy: ["minPrice", "asc"]
        }
    ])
)(PriceRange)