import React, { useState } from 'react'
import { Box, Button, makeStyles, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import { updateCarModel } from "../../actions/carModel.actions"

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

const UpdateCarModel = (props) => {
    const classes = useStyles()

    const [carModel, setCarModel] = useState(props.carModel)

    const handleSubmit = (e) => {
        e.preventDefault();
        props.updateCarModel(carModel);
        props.handleClose();
    }

    const handleChange = (e) => {
        setCarModel({
            ...carModel,
            [e.target.id]: e.target.value
        })
    }

    return (
        <form id='updateCarModelForm' noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                id='carModelName'
                type='text'
                onChange={handleChange}
                value={carModel.carModelName}
                className={classes.field}
                label="Model Name"
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
        </form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCarModel: (carModel) => dispatch(updateCarModel(carModel))
    }
}

export default connect(null, mapDispatchToProps)(UpdateCarModel)
