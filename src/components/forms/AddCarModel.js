import { Box, Button, makeStyles, MenuItem, TextField } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { addCarModel } from '../../actions/carModel.actions'
import { storage } from '../../config/fbConfig'

const useStyles = makeStyles((theme) => {
    return {
        field: {
            marginTop: 20,
            marginBottom: 20,
            width: 300,
            display: 'flex'
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

const AddCarModel = ({carBrands, addCarModel, handleClose, handleRerender}) => {

    const classes = useStyles()

    const [carModelName, setCarModelName] = React.useState('');
    const [cbId, setCbId] = React.useState('');
    const [image, setImage] = React.useState('');
    const [preview, setPreview] = React.useState(undefined)

    const processedCarBrands = carBrands.map(item => {
        return {
            label: item.carBrandName,
            value: item.id,
        }
    })

    const handleImgChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setImage(undefined)
            return
        }
        setImage(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const uploadTask = storage.ref('images/modelLogo/' + image.name).put(image);
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
                            let carModelWithUrl = {
                                carModelName: carModelName,
                                cbId: cbId,
                                url: url,
                            }
                            addCarModel(carModelWithUrl);
                            handleClose();
                            handleRerender(cbId);
                        })
                }
            )
    }

    React.useEffect(() => {
        if (!image) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

    return (
        <form id='addCarModelForm' noValidate autoComplete="off" onSubmit={handleSubmit}>

            <TextField
                id='carModelName'
                type='text'
                onChange={(e) => setCarModelName(e.target.value)}
                value={carModelName}
                className={classes.field}
                label="Model Name"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                // error={titleError}
            />

            <TextField
                id="carBrandName"
                select
                label="Brand Name"
                value={cbId}
                onChange={(e) => setCbId(e.target.value)}
                className={classes.field}
                variant="outlined"
                required
                >
                {processedCarBrands.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>

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
                    {image ?  <img src={preview} alt='modelLogo' width='150'/> : <img src='/ImgPlaceholder.png' alt='ImgPlaceholder' /> }
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
        </form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCarModel: (carModel) => dispatch(addCarModel(carModel))
    }
}

export default connect(null, mapDispatchToProps)(AddCarModel)
