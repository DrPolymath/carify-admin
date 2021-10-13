import React from 'react'
import { Redirect } from 'react-router-dom'
import Drawer from '../../layout/Drawer'
import { makeStyles, Typography } from '@material-ui/core'
import Search from '../../Search'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import CarVariantTable from '../../tables/CarVariantTable' 

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

const CarVariant = (props) => {
    const classes = useStyles()
    const { auth, carBrands, carModels, carVariants } = props;

    //Route securing
    if(!auth.uid) return <Redirect to='/signin' />

    if (carBrands && carModels && carVariants) {

        let carModelsArr = Object.entries(carModels).map(key => ({ ...key[1], id:key[0], }));

        let carVariantsArr = Object.entries(carVariants).map(key => ({ ...key[1], id:key[0], }));
        
        carVariantsArr = carVariantsArr.map(item => {
            return {
                ...item,
                carBrandName: carBrands.find(o => o.id === carModelsArr.find(o => o.id === item.cmId).cbId).carBrandName,
                carModelName: carModelsArr.find(o => o.id === item.cmId).carModelName,
                url: carModelsArr.find(o => o.id === item.cmId).url
            }
        })

        return (
            <div className={classes.root}>
                <Drawer />
                <div className={classes.page}>
                    <Search />
                    <Typography className={classes.title} color='primary' variant="h3">
                        Car Variant
                    </Typography>
                    <CarVariantTable carVariants={carVariantsArr} />
                    {/* <FloatingActionBtn /> */}
                </div>
            </div>
        )

    } else {
        return(
            <div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        auth: state.firebase.auth,
        carBrands: state.firestore.ordered.carBrand,
        carModels: state.firestore.data.carModel,
        carVariants: state.firestore.data.carVariant
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'carBrand'
        },
        {
            collectionGroup: 'carModel',
        },
        {
            collectionGroup: 'carVariant',
        }
    ])
)(CarVariant)