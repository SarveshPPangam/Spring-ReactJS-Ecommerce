import React, { useContext, useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Controller, useForm } from "react-hook-form";
import jwt from "jsonwebtoken"
import Alert from '@material-ui/lab/Alert';
import Grid from "@material-ui/core/Grid";
import Link from '@material-ui/core/Link';
import {
    Navigate,
    useNavigate,
} from "react-router-dom";
import AuthContext from "./authProvider";
import axios from "../../api/axios";


export default function Login() {
    const { auth, setAuth, persist, setPersist } = useContext(AuthContext)

    const isLoggedIn = auth?.accessToken
    const isSeller = auth?.userRole === 'SELLER'

    const redirect = <Navigate to={isSeller ? '/seller' : '/'} />;


    const [errorMessage, setErrorMessage] = useState("");

    const { handleSubmit, control } = useForm();


    const navigate = useNavigate()

    const goToRegister = () => {
        navigate('/register');
    }

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/authenticate',
                data,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const decoded = jwt.decode(accessToken);
            const userEmail = decoded?.email;
            const userRole = decoded?.role;
            setAuth({ userEmail, userRole, accessToken });
        } catch (err) {
            if (!err?.response) {
                setErrorMessage('No Server Response');

            } else {
                setErrorMessage('Login Failed');
            }
        }
    };


    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (
        <>

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
