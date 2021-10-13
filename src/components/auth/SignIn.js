import React, { useState }from 'react'
import { Grid, Card, TextField, makeStyles, Typography, Button, Box, Link } from '@material-ui/core'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signIn } from '../../actions/auth.actions'

const useStyles = makeStyles((theme) => {
    return {
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#f9f9f9',
        },
        logo: {
            padding: theme.spacing(3),
        },
        content: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        section: {
            padding: theme.spacing(7),
        },
        card: {
            padding: theme.spacing(8),
        },
        field: {
            marginTop: 20,
            marginBottom: 20,
            display: 'block'
        },
        buttonContainer: {
            paddingTop: theme.spacing(3),
        }
    }
})

const SignIn = (props) => {

    const classes = useStyles()
    const preventDefault = (event) => event.preventDefault();

    const [creds, setCreds] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        props.signIn(creds)
    }

    const handleChange = (e) => {
        setCreds({
            ...creds,
            [e.target.id]: e.target.value
        })
    }

    const { authError, auth } = props;
    //Route securing
    if(auth.uid) return <Redirect to='/' />

    return (
        <div className={classes.container}>
            <div className="content">
            <img className={classes.logo} src='/Logo.png' alt='Logo' width='150'/>
            <Grid container className={classes.gridContainer}>
                <Grid className={classes.section} item md={6}>
                    <img src='/Admin.png' alt="illustration" />
                </Grid>
                <Grid className={classes.section} item md={6}>
                    <Card className={classes.card}>
                        <Typography color='primary' variant='h3' align='center'>ADMINISTRATION</Typography>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <TextField
                            id='email'
                            type='email'
                            onChange={handleChange}
                            value={creds.email}
                            className={classes.field}
                            label="Email"
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            required
                            // error={titleError}
                            />
                            <TextField
                            id='password'
                            type='password'
                            onChange={handleChange}
                            value={creds.password}
                            className={classes.field}
                            label="Password"
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            required
                            // error={detailsError}
                            />

                            <Link href="#" onClick={preventDefault}>
                                Forgot password?
                            </Link>

                            <Box align='center' className={classes.buttonContainer}>
                                <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                >
                                Login
                                </Button>
                            </Box>
                            
                            <div className="red-text center">
                                { authError ? <p>{ authError }</p> : null }
                            </div>
                        </form>
                    </Card>
                </Grid>
            </Grid>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)