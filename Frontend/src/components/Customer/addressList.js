import { Button, FormControl, Grid, Input, InputLabel, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Address } from './address';
import AddAddressFormDialog from './addAddressFormDialog';
import AuthContext from '../Auth/authProvider';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


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
    const axiosPrivate = useAxiosPrivate()

    const fetchAddresses = async () => {
        const controller = new AbortController()
        try {
            const response = await axiosPrivate.get(`/c/profile/addresses`, {
                signal: controller.signal
            });
            setAddresses(response.data);
        } catch (err) {
            console.error(err);
        }
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
