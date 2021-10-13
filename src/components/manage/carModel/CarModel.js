import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Drawer from '../../layout/Drawer'
import { makeStyles, Typography } from '@material-ui/core'
import Search from '../../Search'
import { compose } from 'redux'
import { connect, useSelector } from 'react-redux'
import { firestoreConnect, useFirestoreConnect } from 'react-redux-firebase'
import CarModelTable from '../../tables/CarModelTable'
import FormDialog from '../../FormDialog'
import { deleteCarModel } from '../../../actions/carModel.actions'

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

const CarModel = (props) => {
    const classes = useStyles()
    const { auth, carBrands, deleteCarModel } = props;
    const [rerender, setRerender] = useState('')

    const handleRerender = (val) => {
        setRerender(val)
    }

    const handleDelete = (carModel) => {
        deleteCarModel(carModel)
    }

    console.log(rerender)

    useFirestoreConnect([
        {
            collectionGroup: 'carModel',
            
        },
    ]) // sync todos collection from Firestore into redux

    const carModels = useSelector((state) => state.firestore.data.carModel)

    //Route securing
    if(!auth.uid) return <Redirect to='/signin' />

    if (carBrands && carModels) {
        let carModelsArr = Object.entries(carModels).map(key => ({ ...key[1], id:key[0], }));

        carModelsArr = carModelsArr.map(item => {
            return{
                ...item,
                carBrandName: carBrands.find(o => o.id === item.cbId).carBrandName
            }
        })

        return (
            <div className={classes.root}>
                <Drawer />
                <div className={classes.page}>
                    <Search />
                    <Typography className={classes.title} color='primary' variant="h3">
                        Car Model
                    </Typography>
                    <CarModelTable carModels={carModelsArr} handleDelete={handleDelete}/>
                    <FormDialog title='New Car Model' carBrands={carBrands} handleRerender={handleRerender}/>
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
    return {
        auth: state.firebase.auth,
        carBrands: state.firestore.ordered.carBrand
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCarModel: (carModel) => dispatch(deleteCarModel(carModel))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => ([
        {
            collection: 'carBrand'
        }
    ]))
)(CarModel)