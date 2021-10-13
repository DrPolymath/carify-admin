import { Box, Button, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { addCarType } from '../../actions/carType.actions'
import { storage } from '../../config/fbConfig'

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
        },
        input: {
            display: 'none',
        },
        imageInputContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        chooseImgBtnContainer: {
            display: 'flex',
            justifyContent: 'center',
            padding: theme.spacing(2),
        }
    }
})

const AddCarType = (props) => {
    const classes = useStyles()

    const [carType, setCarType] = React.useState({
        carTypeName: '',
        image: null,
    })

    const [preview, setPreview] = React.useState(undefined)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(carType.image){

            const uploadTask = storage.ref('images/carTypeLogo/' + carType.image.name).put(carType.image);
            uploadTask.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error)
                },
                () => {
                    uploadTask
                        .snapshot
                        .ref
                        .getDownloadURL()
                        .then(url => {
                            let carTypeWithUrl = {
                                carTypeName: carType.carTypeName,
                                image: carType.image,
                                url: url,
                            }
                            props.addCarType(carTypeWithUrl)
                            props.handleClose();
                        })
                }
            )
        }
    }

    const handleChange = (e) => {
        setCarType({
            ...carType,
            [e.target.id]: e.target.value
        })
    }

    const handleImgChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            // setImage(undefined)
            setCarType({
                ...carType,
                image: undefined
            })
            return
        }
        // setImage(e.target.files[0])
        setCarType({
            ...carType,
            [e.target.id]: e.target.files[0]
        })
        
    }

    React.useEffect(() => {
        if (!carType.image) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(carType.image)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [carType])

    return (
        <form id='addCarTypeForm' noValidate autoComplete="off" onSubmit={handleSubmit}>
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

            <Box className={classes.imageInputContainer}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="image"
                    multiple
                    type="file"
                    onChange={handleImgChange}
                />
                <label htmlFor="image" className={classes.chooseImgBtnContainer}>
                    {/* <Button variant="contained" color="primary" component="span" >
                        Choose Image
                    </Button> */}
                    {carType.image ?  <img src={preview} alt='carTypeLogo' width='150'/> : <img src='/ImgPlaceholder.png' alt='ImgPlaceholder' /> }
                </label>
                
            </Box>

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
        addCarType: (carType) => dispatch(addCarType(carType))
    }
}

export default connect(null, mapDispatchToProps)(AddCarType)