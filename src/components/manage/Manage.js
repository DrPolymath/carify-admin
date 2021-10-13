import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Drawer from '../layout/Drawer'
import { makeStyles, Grid, Card, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import Search from '../Search'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh'
    },
    page: {
        background: '#f9f9f9',
        width: '100%',
        padding: theme.spacing(3)
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(20)
    },
    content: {
        padding: theme.spacing(2),
    },
    itemContainer: {
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        padding: theme.spacing(3),
    },
}));

const Manage = (props) => {
    const classes = useStyles()
    const history = useHistory()

    const menuItems = [
        {
            text: 'Admin',
            path: '/manage/admin'
        },
        {
            text: 'Car Brand',
            path: '/manage/carbrand'
        },
        {
            text: 'Price Range',
            path: '/manage/pricerange'
        },
        {
            text: 'Car Type',
            path: '/manage/cartype'
        },
        {
            text: 'Car Model',
            path: '/manage/carmodel'
        },
        {
            text: 'Car Variant',
            path: '/manage/carvariant'
        },
    ]
    const { auth } = props;
    //Route securing
    if(!auth.uid) return <Redirect to='/signin' />
    return (
        <div className={classes.root}>
            <Drawer />
            <div className={classes.page}>
                <Search />
                <Grid container className={classes.container}>
                    {menuItems.map(menuItem => (
                        <Grid className={classes.content} item md={4} key={menuItem.text} onClick={() => history.push(menuItem.path)}>
                            <Card className={classes.itemContainer}>
                                <Typography color='primary' variant='h5'>{ menuItem.text }</Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Manage)
