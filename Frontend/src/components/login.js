import React, { useContext, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { AppContext } from "./contexts";
import Alert from '@material-ui/lab/Alert';
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Link from '@material-ui/core/Link';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from "react-router-dom";
import { Homepage } from "./Homepage";


export default function Login() {
    const { dispatch } = useContext(AppContext);
    const [errorMessage, setErrorMessage] = useState("");
    const { register, handleSubmit, errors } = useForm();
    const redirectIfLoggedIn = <Redirect to="/" />;
    const { state } = useContext(AppContext);


    function setToken(token) {
        dispatch({ type: "set-token-header", payload: token });
    }

    const goToRegister = (event) => {
        event.preventDefault();
        // history.push('/register');
    }

    const onSubmit = data => {
        // console.log(data);

        fetch('/authenticate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            // console.log(response);
            response.text().then(data => {
                if (response.ok) {
                    let response = JSON.parse(data);
                    // console.log(response.jwt)
                    setToken(response.jwt);
                } else {
                    console.log(data)
                    let errorResponse = JSON.parse(data);
                    const error = (errorResponse && errorResponse.message) || response.statusText;
                    console.log(error)
                    setErrorMessage(error);
                }
            })
        }).catch((error) => {
            console.log(error)
        });
    };

    return (
        <>
            {state?.token && redirectIfLoggedIn}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={0} justifyContent={"center"} alignItems={"center"}>
                    <Grid container item xs={12} sm={6} justifyContent={"center"}>
                        <Grid container item xs={12} sm={6} direction={"column"} spacing={8}>
                            <Grid item>
                                <h2>LOGIN</h2>
                            </Grid>
                            <Grid item>
                                <TextField name="email"
                                    className='loginInput'
                                    fullWidth
                                    label="User Email"
                                    error={errors && !!errors['userId']}
                                    helperText={errors && errors['email']?.message}
                                    {...register('email', { required: true })} />
                            </Grid>
                            <Grid item>
                                <TextField name="password"
                                    className='loginInput'
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    error={errors && !!errors['password']}
                                    helperText={errors && errors['password']?.message}
                                    {...register('password', { required: true })} />

                            </Grid>
                            <Grid item>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => {
                                    }}
                                >
                                    Forgot Password?
                                </Link>
                            </Grid>
                            <Grid container item direction={"row"} justifyContent={"center"} spacing={4}>
                                <Grid item xs={6}>
                                    <Button type="submit" variant="contained" color="primary"
                                        fullWidth>Login</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button type="submit" variant="contained" color="secondary" fullWidth
                                        onClick={goToRegister}>Sign up
                                    </Button>
                                </Grid>
                                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
