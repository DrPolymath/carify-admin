import { Box, Button, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { updatePriceRange } from '../../actions/priceRange.actions'

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

const UpdatePriceRange = (props) => {
    const classes = useStyles()

    const [priceRange, setPriceRange] = React.useState(props.priceRange)

    const handleSubmit = (e) => {
        e.preventDefault();
        props.updatePriceRange(priceRange)
        props.handleClose();
    }

    const handleChange = (e) => {
        setPriceRange({
            ...priceRange,
            [e.target.id]: e.target.value
        })
    }

    return (
        <form id='updatePriceRangeForm' noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                id='maxPrice'
                type='number'
                onChange={handleChange}
                value={priceRange.maxPrice}
                className={classes.field}
                label="Maximum Price"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                // error={titleError}
            />
            <TextField
                id='minPrice'
                type='number'
                onChange={handleChange}
                value={priceRange.minPrice}
                className={classes.field}
                label="Minimum Price"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                // error={detailsError}
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
        updatePriceRange: (priceRange) => dispatch(updatePriceRange(priceRange))
    }
}

export default connect(null, mapDispatchToProps)(UpdatePriceRange)
