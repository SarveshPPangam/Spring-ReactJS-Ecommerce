import { Button, FormControl, Grid, Input, InputLabel, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Address } from './address';
import AddAddressFormDialog from './addAddressFormDialog';
import AuthContext from '../Auth/authProvider';


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
    const { auth } = useContext(AuthContext);
    const [addresses, setAddresses] = useState()
    const [openEditForm, setOpenEditForm] = useState(false)

    const fetchAddresses = () => {
        fetch('/c/profile/addresses', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth?.accessToken
            }

        }).then(function (response) {
            if (response.status === 403) {
                return
            }
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
        console.log('in usef')
        fetchAddresses()
    }, [auth?.accessToken])


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

            <AddAddressFormDialog openEditForm={openEditForm} setOpenEditForm={setOpenEditForm} auth={auth}
                fetchAddresses={fetchAddresses} />


        </div>
    )
}
