import React from 'react'
import { makeStyles, Grid, Card, Typography, Box, } from '@material-ui/core'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Drawer from '../layout/Drawer'
import BarChart from '../charts/BarChart'
import PieChart from '../charts/PieChart'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      minHeight: '100vh'
    },
    page: {
        background: '#f9f9f9',
        width: '100%',
    },
    upperContent: {
        padding: theme.spacing(2),
        justifyContent: 'center',
    },
    cardContainer: {
        background: theme.palette.primary.main
    },
    gridContainer: {
        padding: theme.spacing(3),
    },
    upperTitle: {
        color: theme.palette.common.white,
    },
    mfcContainer: {
        background: theme.palette.common.white,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        padding: theme.spacing(1),
        borderRadius: 5
    },
    lowerContent: {
        padding: theme.spacing(2),
    },
    lowerTitle: {
        color: theme.palette.primary.main,
        padding: theme.spacing(2),
    },
    chartCard: {
        // padding: theme.spacing(3),
    }
}));

const Dashboard = (props) => {
    const classes = useStyles()
    const { auth } = props;
    //Route securing
    if(!auth.uid) return <Redirect to='/signin' />
    return (
        <div className={classes.root}>
            <Drawer />
            <div className={classes.page}>
                <Grid container>
                    <Grid className={classes.upperContent} item md={3}>
                        <Card className={classes.cardContainer}>
                            <Grid container className={classes.gridContainer}>
                                <Grid item md={7}>
                                    <Typography className={classes.upperTitle} variant='h6'>Most Favorite Car</Typography>
                                </Grid>
                                <Grid item md={5}>
                                    <Box className={classes.mfcContainer}>
                                        <img src='/MFC.png' alt="MFC" height='57' width='100'/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid className={classes.upperContent} item md={3}>
                        <Card className={classes.cardContainer}>
                            <Grid container className={classes.gridContainer}>
                                <Grid item md={7}>
                                    <Typography className={classes.upperTitle} variant='h6'>Most Favorite Brand</Typography>
                                </Grid>
                                <Grid item md={5}>
                                    <Box className={classes.mfcContainer}>
                                        <img src='/honda.png' alt="MFB" height='57' width='68'/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid className={classes.upperContent} item md={3}>
                        <Card className={classes.cardContainer}>
                            <Grid container className={classes.gridContainer}>
                                <Grid item md={7}>
                                    <Typography className={classes.upperTitle} variant='h5'>153</Typography>
                                    <Typography className={classes.upperTitle} variant='h6'>Total User</Typography>
                                </Grid>
                                <Grid item md={5}>
                                    <Box className={classes.mfcContainer}>
                                        <img src='/TU.png' alt="TU" height='57'/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid className={classes.upperContent} item md={3}>
                        <Card className={classes.cardContainer}>
                        <Grid container className={classes.gridContainer}>
                                <Grid item md={7}>
                                    <Typography className={classes.upperTitle} variant='h5'>33</Typography>
                                    <Typography className={classes.upperTitle} variant='h6'>Total Car</Typography>
                                </Grid>
                                <Grid item md={5}>
                                    <Box className={classes.mfcContainer}>
                                        <img src='/hatchback.png' alt="TC" width='90' height='57'/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container className={classes.container}>
                    <Grid className={classes.lowerContent} item md={9}>
                        <Grid style={{ height: '100%' }}>
                            <Card style={{ height: '100%' }} className={classes.chartCard}>
                                <Typography className={classes.lowerTitle} variant='h4'>Top Favorite Car</Typography>
                                <BarChart />
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid className={classes.lowerContent} item md={3}>
                        <Grid container spacing={3} style={{ height: '100%' }}>
                            <Grid item md={12}>
                                <Card className={classes.chartCard} >
                                    <Typography className={classes.lowerTitle} variant='h6'>Top Favorite Brand</Typography>
                                    {/* <Grid container>
                                        <Grid item md={12}>
                                            <PieChart />
                                        </Grid>
                                    </Grid> */}
                                    <PieChart />
                                </Card>
                            </Grid>
                            <Grid item md={12}>
                                <Card className={classes.chartCard}>
                                    <Typography className={classes.lowerTitle} variant='h6'>Salary Based Favorite Car</Typography>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Dashboard)
