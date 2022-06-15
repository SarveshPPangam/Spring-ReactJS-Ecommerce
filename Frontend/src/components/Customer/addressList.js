import { Button, FormControl, Grid, Input, InputLabel, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form'
import { AppContext } from '../contexts';
import { Address } from './address';


const useStyles = makeStyles((theme) => ({

    address: {
        marginTop: 80,
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    }
}));
export const AddressList = () => {
    const classes = useStyles()
    const { state } = useContext(AppContext);
    const { handleSubmit, control } = useForm();
    const [addresses, setAddresses] = useState()

    const fetchAddresses = () => {
        fetch('/c/profile/addresses', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + state.token
            }

        }).then(function (response) {
            response.text().then(r => {
                //                console.log(r)
                const d = JSON.parse(r)
                console.log(d)
                setAddresses(d);
            })
        }, function (error) {
            console.log(error.message)
        })
    }

    useEffect(() => {
        fetchAddresses()
    }, [state.token])


    const onSubmit = (address) => {
        fetch('/c/profile/addresses', {
            method: 'POST',
            body: JSON.stringify(address),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token,
            },
        }).then(function (response) {
            response.text().then(r => {
                console.log(r)
                fetchAddresses()
            })
        }, function (err) {
            console.log(err)
        })
    }
    return (
        <div>
            <Grid container>
                <Typography variant="h5">
                    Your addresses
                </Typography>
            </Grid>
            {addresses?.map(address => {
                return (
                    <Grid container key={address.id} className={classes.address}>
                        <Address address={address} addresses={addresses} setAddresses={setAddresses} fetchAddresses={fetchAddresses} />
                    </Grid>
                )
            }
            )}


            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid item xs={6} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="name">Receiver name</InputLabel>

                            <Controller
                                render={({ field }) => <Input {...field} />}
                                name={`receiverName`}
                                control={control}
                                defaultValue={""} // make sure to set up defaultValue
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="name">Phone number</InputLabel>

                            <Controller
                                render={({ field }) => <Input {...field} />}
                                name={`phoneNumber`}
                                control={control}
                                defaultValue={""} // make sure to set up defaultValue
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="name">Address</InputLabel>

                            <Controller
                                render={({ field }) => <Input {...field} />}
                                name={`addressLine`}
                                control={control}
                                defaultValue={""} // make sure to set up defaultValue
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="name">Pincode</InputLabel>

                            <Controller
                                render={({ field }) => <Input {...field} />}
                                name={`pinCode`}
                                control={control}
                                defaultValue={""} // make sure to set up defaultValue
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                            <Button type="submit" variant="contained" color="primary" >Save</Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>

        </div>
    )
}
