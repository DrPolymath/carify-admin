import React from 'react'
import { Drawer as SideBar, makeStyles, Box } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    logoContainer: {
        background: theme.palette.common.white,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        padding: theme.spacing(3),
    },
    active: {
        background: '#f4f4f4',
    },
}));

const Drawer = () => {

    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const menuItems = [
        {
            text: 'Dashboard',
            icon: <BarChartIcon color="primary" />,
            path: '/'
        },
        {
            text: 'Car List',
            icon: <ListIcon color="primary" />,
            path: '/carlist'
        },
        {
            text: 'Manage',
            icon: <SettingsIcon color="primary" />,
            path: '/manage'
        },
        {
            text: 'Log',
            icon: <HistoryIcon color="primary" />,
            path: '/log'
        },
        {
            text: 'Me',
            icon: <PersonIcon color="primary" />,
            path: '/profile'
        },
    ]

    return (
        <SideBar
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div>
                <Box className={classes.logoContainer}>
                    <img src='/Logo.png' alt="Logo" width='125'/>
                </Box>
            </div>
            
            <List>
                {menuItems.map(menuItem => (
                    <ListItem
                        button
                        key={menuItem.text}
                        onClick={() => history.push(menuItem.path)}
                        className={location.pathname === menuItem.path ? classes.active : null}
                    >
                        <ListItemIcon>{ menuItem.icon }</ListItemIcon>
                        <ListItemText primary={ menuItem.text } />
                    </ListItem>
                ))}
            </List>

        </SideBar>
    )
}

export default Drawer

