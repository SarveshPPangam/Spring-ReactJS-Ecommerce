import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { useState } from 'react';
import { set } from 'react-hook-form';
import AuthContext from '../Auth/authProvider';
import AddAddressFormDialog from './addAddressFormDialog';

const useStyles = makeStyles((theme) => ({

    name: {
        display: 'flex',
        alignContent: 'flex-end'
    },
    button: {
        marginLeft: "90%",
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    }
}));


export const Address = ({ address, addresses, setAddresses, fetchAddresses }) => {
    const classes = useStyles();
    const { auth } = useContext(AuthContext);

    const [openEditForm, setOpenEditForm] = useState(false)



    const handleEdit = () => {
        setOpenEditForm(true)
    }

    const deleteAddress = (id) => {
        fetch('/c/profile/address/' + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth?.accessToken
            }

        }).then(function (response) {
            response.text().then(r => {
                const d = JSON.parse(r)
                console.log(d)
                setAddresses(addresses?.filter(c => c.id !== id))
            })
        }, function (error) {
            console.log(error.message)
        })
    }

    return (
        <div>
            <Grid container >
                <Grid container className={classes.name}>
                    <Grid item>
                        <Typography variant="h5">
                            Receiver Name:
                            {address.receiverName}
                        </Typography>

                        <Button className={classes.button} onClick={() => handleEdit(address?.id)}>Edit</Button>
                    </Grid>

                </Grid>
                <Grid container>
                    <Typography variant="h5">
                        Phone number:
                        {address.phoneNumber}
                    </Typography>
                    <Grid item>
                        <Button className={classes.button} onClick={() => deleteAddress(address?.id)}>Delete</Button>
                    </Grid>
                </Grid>
                <Grid container>
                    <Typography variant="h5">
                        Address line:
                        {address.addressLine}
                    </Typography>
                </Grid>
                <Grid container>
                    <Typography variant="h5">
                        Pincode:
                        {address.pinCode}
                    </Typography>
                </Grid>
            </Grid>



            <AddAddressFormDialog openEditForm={openEditForm} setOpenEditForm={setOpenEditForm} address={address}
                fetchAddresses={fetchAddresses} auth={auth} isForEdit={true} />
        </div>
    )
}
