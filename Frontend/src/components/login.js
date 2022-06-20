import React, { useContext, useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Controller, useForm } from "react-hook-form";
import { AppContext } from "./contexts";
import Alert from '@material-ui/lab/Alert';
import Grid from "@material-ui/core/Grid";
import Link from '@material-ui/core/Link';
import {
    Redirect,
    useHistory,
} from "react-router-dom";


export default function Login() {
    const { dispatch } = useContext(AppContext);
    const { state } = useContext(AppContext);

    const isLoggedIn = state?.token
    const isSeller = state?.user?.role === 'SELLER'

    const redirect = <Redirect to={isSeller ? '/seller/products' : '/'} />;


    const [errorMessage, setErrorMessage] = useState("");

    const { handleSubmit, control } = useForm();


    const history = useHistory()


    function setToken(token) {
        dispatch({ type: "set-token-header", payload: token });
    }

    const goToRegister = () => {
        history.push('/register');
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
                    let errorResponse = JSON.parse(data);
                    const error = (errorResponse && errorResponse.message) || response.statusText;
                    console.log(error)
                    setErrorMessage(error);
                }
            })
        }).catch((error) => {
            // console.log(error)
            setErrorMessage('Some error occurred');
        });
    };

    return (
        <>
            {console.log(state)}

            {isLoggedIn && redirect}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={0} justifyContent={"center"} alignItems={"center"}>
                    <Grid container item xs={12} sm={6} justifyContent={"center"}>
                        <Grid container item xs={12} sm={6} direction={"column"} spacing={8}>
                            <Grid item>
                                <h2>LOGIN</h2>
                            </Grid>
                            <Grid item>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => <TextField {...field} label="Email" type="email" required />}
                                    rules={{ required: true }}
                                    defaultValue=''
                                />
                            </Grid>
                            <Grid item>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => <TextField {...field} label="Password" type="password" required />}
                                    rules={{ required: true }}
                                    defaultValue=''
                                />
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
                                    <Button variant="contained" color="secondary" fullWidth
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
