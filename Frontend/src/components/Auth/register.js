import { Button, Checkbox, FormControlLabel, Grid, Link, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import AlertDialog from '../alertDialog';
import axios from '../../api/axios';
import AuthContext from './authProvider';


export const Register = () => {


    const { auth } = useContext(AuthContext);


    const [openDialog, setOpenDialog] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [redirectingInfo, setRedirectingInfo] = useState({ shouldRedirect: false, redirectingUrl: "" });

    const { handleSubmit, control } = useForm();

    const redirectToHome = <Navigate to="/" />;

    const onSubmit = async data => {
        console.log(data)

        try {
            const response = await axios.post('/register',
                data,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            //console.log(JSON.stringify(response))
            setRedirectingInfo({ shouldRedirect: true, redirectingUrl: "/login" })
            setOpenDialog(true)
        } catch (err) {
            console.log(err?.response)
            if (!err?.response) {
                setErrorMessage('No Server Response');
                setOpenDialog(true)
            } else {
                setErrorMessage(err.response?.data?.status)
                setOpenDialog(true)
            }
        }
    }


    return (
        <>
            {auth?.accessToken && redirectToHome}
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
                                <AlertDialog open={openDialog} setOpen={setOpenDialog} message={errorMessage} redirectingInfo={redirectingInfo} />
                            </Grid>
                            {console.log(redirectingInfo)}
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}
