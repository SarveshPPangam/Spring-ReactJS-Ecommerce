import * as React from 'react';
import { Button, FormControl, Grid, Input, InputLabel, TextField } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Controller, useForm } from 'react-hook-form'


export default function EditAddressFormDialog({ openEditForm, setOpenEditForm, address, state, fetchAddresses, isForEdit = false }) {

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
                'Authorization': 'Bearer ' + state?.token,
            },
        }).then(function (response) {
            response.text().then(r => {
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
                                    render={({ field }) => <Input {...field} />}
                                    name={`receiverName`}
                                    control={control}
                                    defaultValue={address?.receiverName || ''}
                                />
                            </FormControl>
                        </Grid>
                        <Grid container xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="name">Phone number</InputLabel>

                                <Controller
                                    render={({ field }) => <Input {...field} />}
                                    name={`phoneNumber`}
                                    control={control}
                                    defaultValue={address?.phoneNumber || ""}
                                />
                            </FormControl>
                        </Grid>
                        <Grid container xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="name">Address line</InputLabel>

                                <Controller
                                    render={({ field }) => <Input {...field} />}
                                    name={`addressLine`}
                                    control={control}
                                    defaultValue={address?.addressLine || ""}
                                />
                            </FormControl>
                        </Grid>
                        <Grid container xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="name">Pincode</InputLabel>

                                <Controller
                                    render={({ field }) => <Input {...field} />}
                                    name={`pinCode`}
                                    control={control}
                                    defaultValue={address?.pinCode || ""}
                                />
                            </FormControl>
                        </Grid>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Update</Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>
        </div>
    );
}
