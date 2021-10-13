import React from 'react'
import { Box, Button, makeStyles, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import { updateCarBrand } from '../../actions/carBrand.actions'

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

const UpdateCarBrand = (props) => {
    const classes = useStyles()

    const [carBrand, setCarBrand] = React.useState(props.carBrand)

    const handleSubmit = (e) => {
        e.preventDefault();
        props.updateCarBrand(carBrand);
        props.handleClose();
    }

    const handleChange = (e) => {
        setCarBrand({
            ...carBrand,
            [e.target.id]: e.target.value
        })
    }

    return (
        <form id='updateCarBrandForm' noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                id='carBrandName'
                type='text'
                onChange={handleChange}
                value={carBrand.carBrandName}
                className={classes.field}
                label="Brand Name"
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
        updateCarBrand: (carBrand) => dispatch(updateCarBrand(carBrand))
    }
}

export default connect(null, mapDispatchToProps)(UpdateCarBrand)
