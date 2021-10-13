import React from 'react'
import { makeStyles, Grid, Card, Box, Typography } from '@material-ui/core'
import { connect } from 'react-redux';
import MoreMenu from '../MoreMenu';
import { deleteCarType } from '../../actions/carType.actions';

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

const CarTypeCard = ({ carTypes, deleteCarType }) => {
    const classes = useStyles()

    const handleRemove = (carType) => {
        deleteCarType(carType)
    }

    if (carTypes) {
        return (
            <Grid container className={classes.container}>
                {carTypes.map(carType => {
                    return (
                        <Grid className={classes.content} item md={4} key={carType.id}>
                            <Card className={classes.card}>
                                <Box className={classes.cardHeader}>
                                    <MoreMenu title='Update Car Type' data={carType} handleRemove={handleRemove} carType={carType}/>
                                </Box>
                                <Box className={classes.cardContent}>
                                    <img src={carType.url} alt="carTypeLogo" style={{ maxHeight: 100, maxWidth: 150, objectFit: 'contain', margin: 10 }}/>
                                    <Typography variant='subtitle1' color='primary'>{ carType.carTypeName }</Typography>
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
                <p>Loading car type list...</p>
            </div>
        )
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCarType: (carType) => dispatch(deleteCarType(carType))
    }
}

export default connect(null, mapDispatchToProps)(CarTypeCard)