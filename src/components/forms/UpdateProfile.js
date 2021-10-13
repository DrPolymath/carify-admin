import React from 'react'
import { Box, Button, makeStyles, TextField, MenuItem } from '@material-ui/core'
import { connect } from 'react-redux'
import { updateProfile } from '../../actions/profile.actions'

const useStyles = makeStyles((theme) => {
    return {
        field: {
            marginTop: 20,
            marginBottom: 20,
            width: 300,
            display: 'block',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
    }
})

const gender = [
    {
      value: 'Male',
    },
    {
      value: 'Female',
    },
];

const UpdateProfile = (props) => {
    const classes = useStyles()

    const [profile, setProfile] = React.useState(props.profileInfo)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(profile.id);
        props.updateProfile(profile)
        props.handleClose();
    }

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        })
        console.log(e)
    }

    return (
        <form id='updateProfileForm' noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                name='username'
                type='text'
                onChange={handleChange}
                value={profile.username}
                className={classes.field}
                label="User Name"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                // error={titleError}
            />
            <TextField
                name='firstname'
                type='text'
                onChange={handleChange}
                value={profile.firstname}
                className={classes.field}
                label="First Name"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                // error={titleError}
            />
            <TextField
                name='lastname'
                type='text'
                onChange={handleChange}
                value={profile.lastname}
                className={classes.field}
                label="Last Name"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                // error={titleError}
            />
            <TextField
                name='email'
                type='text'
                onChange={handleChange}
                value={profile.email}
                className={classes.field}
                label="Email"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                // error={titleError}
            />
            <TextField
                name='phoneNumber'
                type='text'
                onChange={handleChange}
                value={profile.phoneNumber}
                className={classes.field}
                label="Phone Number"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                // error={titleError}
            />

            <TextField
                name='gender'
                select
                label="Gender"
                className={classes.field}
                value={profile.gender}
                onChange={handleChange}
                color="secondary"
                fullWidth
                variant="outlined"
            >
                {gender.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.value}
                    </MenuItem>
                ))}
            </TextField>

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
        updateProfile: (profile) => dispatch(updateProfile(profile))
    }
}

export default connect(null, mapDispatchToProps)(UpdateProfile)
