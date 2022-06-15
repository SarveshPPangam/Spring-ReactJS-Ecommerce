import { Button, FormControl, Grid, Input, InputLabel, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form'
import { AppContext } from '../contexts';
import { Address } from './address';
import EditAddressFormDialog from './editAddressFormDialog';


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
    const [addresses, setAddresses] = useState()
    const [openEditForm, setOpenEditForm] = useState(false)

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


    const handleAddAddress = () => {
        setOpenEditForm(true)
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



            <Grid item xs={12}>
                <FormControl>
                    <Button onClick={handleAddAddress} variant="contained" color="primary" >Add address</Button>
                </FormControl>
            </Grid>

            <EditAddressFormDialog openEditForm={openEditForm} setOpenEditForm={setOpenEditForm}
                fetchAddresses={fetchAddresses} state={state} />


        </div>
    )
}
