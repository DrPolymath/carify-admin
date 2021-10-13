import React from 'react'
import { Box, Button, makeStyles, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import { updateCarType } from '../../actions/carType.actions'

const useStyles = makeStyles((theme) => {
    return {
        field: {
            marginTop: 20,
            marginBottom: 20,
            width: 300,
            display: 'block'
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'flex-end'
        }
    }
})

const UpdateCarType = (props) => {
    const classes = useStyles()

    const [carType, setCarType] = React.useState(props.carType)

    const handleSubmit = (e) => {
        e.preventDefault();
        props.updateCarType(carType);
        props.handleClose();
    }

    const handleChange = (e) => {
        setCarType({
            ...carType,
            [e.target.id]: e.target.value
        })
    }

    return (
        <form id='updateCarTypeForm' noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                id='carTypeName'
                type='text'
                onChange={handleChange}
                value={carType.carTypeName}
                className={classes.field}
                label="Car Type Name"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                // error={titleError}
            />

            <Box align='center' className={classes.buttonContainer}>
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                >
                    Save
                </Button>
            </Box>
            
            {/* <div className="red-text center">
                { authError ? <p>{ authError }</p> : null }
            </div> */}
        </form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCarType: (carType) => dispatch(updateCarType(carType))
    }
}

export default connect(null, mapDispatchToProps)(UpdateCarType)
