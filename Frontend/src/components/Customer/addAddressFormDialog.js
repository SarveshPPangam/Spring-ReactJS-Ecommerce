import * as React from 'react';
import { Button, FormControl, Grid, Input, InputLabel, TextField } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Controller, useForm } from 'react-hook-form'


export default function AddAddressFormDialog({ openEditForm, setOpenEditForm, address, auth, fetchAddresses, isForEdit = false }) {

    const { handleSubmit, control } = useForm();

    const handleClose = () => {
        setOpenEditForm(false);
    };

    const onSubmit = (addressInput) => {
        fetch('/c/profile/addresses', {
            method: isForEdit ? 'PUT' : 'POST',
            body: JSON.stringify(addressInput),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth?.accessToken,
            },
        }).then(function (response) {
            response.text().then(r => {
                if (!response.status === 200) return
                console.log(r)
                console.log(addressInput)
                fetchAddresses()
            })
        }, function (err) {
            console.log(err)
        })
        handleClose()
    }

    return (

        <div>
            <Dialog open={openEditForm} onClose={handleClose}>
                <DialogTitle>{isForEdit ? 'Edit' : 'Add'} address</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            render={({ field }) => <Input {...field} type='hidden' />}
                            name={`id`}
                            control={control}
                            defaultValue={address?.id || ''}
                        />
                        <Grid container xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="name">Receiver name</InputLabel>

                                <Controller
                                    render={({ field }) => <Input {...field} required />}
                                    name={`receiverName`}
                                    control={control}
                                    defaultValue={address?.receiverName || ''}
                                    rules={{ required: true }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid container xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="name">Phone number</InputLabel>

                                <Controller
                                    render={({ field }) => <Input {...field} required />}
                                    name={`phoneNumber`}
                                    control={control}
                                    defaultValue={address?.phoneNumber || ""}
                                    rules={{ required: true }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid container xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="name">Address line</InputLabel>

                                <Controller
                                    render={({ field }) => <Input {...field} required />}
                                    name={`addressLine`}
                                    control={control}
                                    defaultValue={address?.addressLine || ""}
                                    rules={{ required: true }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid container xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="name">Pincode</InputLabel>

                                <Controller
                                    render={({ field }) => <Input {...field} required />}
                                    name={`pinCode`}
                                    control={control}
                                    defaultValue={address?.pinCode || ""}
                                    rules={{ required: true }}
                                />
                            </FormControl>
                        </Grid>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{isForEdit ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>
        </div>
    );
}
