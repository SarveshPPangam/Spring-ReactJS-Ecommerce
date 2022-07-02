import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { useState } from 'react';
import { set } from 'react-hook-form';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
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

    const axiosPrivate = useAxiosPrivate()


    const handleEdit = () => {
        setOpenEditForm(true)
    }

    const deleteAddress = async (id) => {
        try {
            const response = await axiosPrivate.delete(`/c/profile/address/${id}`);
            setAddresses(addresses?.filter(c => c.id !== id))
        } catch (err) {
            console.error(err);
        }
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
