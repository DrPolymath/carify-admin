import React from 'react'
import { makeStyles, Grid, Card, Typography, Box } from '@material-ui/core'
import MoreMenu from '../MoreMenu';
import { connect } from 'react-redux';
import { deleteCarBrand } from '../../actions/carBrand.actions';

const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: theme.spacing(3),
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        padding: theme.spacing(1),
    }
}));

const CarBrandCard = ({ carBrands, deleteCarBrand }) => {
    const classes = useStyles()

    const handleRemove = (carBrand) => {
        deleteCarBrand(carBrand)
    }

    if (carBrands) {
        return (
            <Grid container className={classes.container}>
                {carBrands.map(carBrand => {
                    return (
                        <Grid className={classes.content} item md={3} key={carBrand.id}>
                            <Card className={classes.card}>
                                <Box className={classes.cardHeader}>
                                    <MoreMenu title='Update Car Brand' data={carBrand} handleRemove={handleRemove} carBrand={carBrand}/>
                                </Box>
                                <Box className={classes.cardContent}>
                                    <img src={carBrand.url} alt="brandLogo" style={{ maxHeight: 100, maxWidth: 150, objectFit: 'contain', margin: 10 }}/>
                                    <Typography variant='subtitle1' color='primary'>{ carBrand.carBrandName }</Typography>
                                </Box>
                                
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading car brand list...</p>
            </div>
        )
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCarBrand: (carBrand) => dispatch(deleteCarBrand(carBrand))
    }
}

export default connect(null, mapDispatchToProps)(CarBrandCard)
