import { Button, Checkbox, FormControlLabel, Grid, Link, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';
import { AppContext } from './contexts';
import Alert from '@material-ui/lab/Alert';

export const Register = () => {

    const { dispatch } = useContext(AppContext);
    const { state } = useContext(AppContext);

    const history = useHistory()

    const [errorMessage, setErrorMessage] = useState("");
    const { handleSubmit, control } = useForm();

    const redirectToHome = <Redirect to="/" />;

    const onSubmit = data => {
        console.log(data)
        fetch('/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            response.text().then(r => {
                console.log(r)
                // history.push('/login')
            })
        }, function (error) {
            console.log(error.message)
        })
    }



    return (
        <>
            {state?.token && redirectToHome}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={0} justifyContent={"center"} alignItems={"center"}>
                    <Grid container item xs={12} sm={6} justifyContent={"center"}>
                        <Grid container item xs={12} sm={6} direction={"column"} spacing={8}>
                            <Grid item>
                                <h2>REGISTER</h2>
                            </Grid>
                            <Grid item>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    render={({ field }) => <TextField {...field} label="First name" required />}
                                    rules={{ required: true }}
                                    defaultValue=''
                                />
                            </Grid>
                            <Grid item>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    render={({ field }) => <TextField {...field} label="Last name" required />}
                                    rules={{ required: true }}
                                    defaultValue=''
                                />
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
                                <Controller
                                    name="isSeller"
                                    control={control}
                                    render={({ field }) => <FormControlLabel {...field} control={<Checkbox {...field} />} label="I am a seller" />}
                                    defaultValue={false}
                                />
                            </Grid>
                            <Grid container item direction={"row"} justifyContent={"center"} spacing={4}>
                                <Grid item xs={6}>
                                    <Button type="submit" variant="contained" color="primary"
                                        fullWidth>REGISTER</Button>
                                </Grid>
                                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}
