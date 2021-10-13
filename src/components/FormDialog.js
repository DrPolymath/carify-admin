import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FloatingActionBtn from './FloatingActionBtn';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core'
import AddCarBrand from './forms/AddCarBrand';
import UpdateCarBrand from './forms/UpdateCarBrand';
import UpdateCarType from './forms/UpdateCarType';
import AddCarType from './forms/AddCarType';
import CreatePriceRange from './forms/CreatePriceRange';
import UpdatePriceRange from './forms/UpdatePriceRange';
import UpdateProfile from './forms/UpdateProfile';
import AddCarModel from './forms/AddCarModel';
import UpdateCarModel from './forms/UpdateCarModel';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
            </IconButton>
        ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing(1),
//     },
// }))(MuiDialogActions);

const FormDialog = ({ title, update, profile, carBrand, carType, priceRange, profileInfo, carBrands, handleRerender, carModel }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const btn = update ? ( profile ? <Button variant="contained" color="primary" onClick={handleClickOpen}>Update Details</Button> : <EditIcon color='primary' onClick={handleClickOpen}/> ): <FloatingActionBtn handleClickOpen={handleClickOpen}/>;

    return (
        <div>
        { btn }
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose} >
                { title }
            </DialogTitle>
            <DialogContent dividers>
                {title === 'New Brand' ? (
                    <AddCarBrand handleClose={handleClose} />
                ) : null }
                {title === 'Update Car Brand' ? (
                    <UpdateCarBrand carBrand={carBrand} handleClose={handleClose}/>
                ) : null }
                {title === 'New Car Type' ? (
                    <AddCarType handleClose={handleClose} />
                ) : null }
                {title === 'Update Car Type' ? (
                    <UpdateCarType carType={carType} handleClose={handleClose}/>
                ) : null }
                {title === 'New Price Range' ? (
                    <CreatePriceRange handleClose={handleClose} />
                ) : null }
                {title === 'Update Price Range' ? (
                    <UpdatePriceRange priceRange={priceRange} handleClose={handleClose}/>
                ) : null }
                {title === 'New Car Model' ? (
                    <AddCarModel carBrands={carBrands} handleClose={handleClose} handleRerender={handleRerender}/>
                ) : null }
                {title === 'Update Car Model' ? (
                    <UpdateCarModel carModel={carModel} handleClose={handleClose}/>
                ) : null }

                {title === 'Update User Profile' ? (
                    <UpdateProfile profileInfo={profileInfo} handleClose={handleClose}/>
                ) : null }
            </DialogContent>
            {/* <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
                Save changes
            </Button>
            </DialogActions> */}
        </Dialog>
        </div>
    );
}

export default FormDialog