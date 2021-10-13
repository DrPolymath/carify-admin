import { Box, Button, makeStyles, TextField } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { addCarBrand } from "../../actions/carBrand.actions";
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

const AddCarBrand = (props) => {
    const classes = useStyles()

    const [carBrand, setCarBrand] = React.useState({
        carBrandName: '',
        image: null,
    })

    // const [image, setImage] = React.useState()
    const [preview, setPreview] = React.useState(undefined)

    const handleSubmit = (e) => {
        e.preventDefault();

        if(carBrand.image){

            const uploadTask = storage.ref('images/brandLogo/' + carBrand.image.name).put(carBrand.image);
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
                            // console.log(url)
                            let carBrandWithUrl = {
                                carBrandName: carBrand.carBrandName,
                                image: carBrand.image,
                                url: url,
                            }
                            props.addCarBrand(carBrandWithUrl);
                            props.handleClose();
                        })
                }
            )
        }

        

        
    }

    const handleChange = (e) => {
        setCarBrand({
            ...carBrand,
            carBrandName: e.target.value
        })
    }

    const handleImgChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            // setImage(undefined)
            setCarBrand({
                ...carBrand,
                image: undefined
            })
            return
        }
        // setImage(e.target.files[0])
        setCarBrand({
            ...carBrand,
            [e.target.id]: e.target.files[0]
        }) 
        
    }

    React.useEffect(() => {
        if (!carBrand.image) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(carBrand.image)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [carBrand])

    return (
        <form id='addCarBrandForm' noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                    {carBrand.image ?  <img src={preview} alt='brandLogo' width='150'/> : <img src='/ImgPlaceholder.png' alt='ImgPlaceholder' /> }
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
        addCarBrand: (carBrand) => dispatch(addCarBrand(carBrand))
    }
}

export default connect(null, mapDispatchToProps)(AddCarBrand)