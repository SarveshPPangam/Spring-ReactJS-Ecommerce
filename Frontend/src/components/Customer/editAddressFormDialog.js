import * as React from 'react';
import { Button, FormControl, Grid, Input, InputLabel, TextField } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Controller, useForm } from 'react-hook-form'


export default function EditAddressFormDialog({ openProp, setOpenEditForm, address }) {

    const { handleSubmit, control } = useForm();


    const handleClickOpen = () => {
        setOpenEditForm(true);
    };

    const handleClose = () => {
        setOpenEditForm(false);
    };

    const onSubmit = (address) => {
        console.log(address)
    }

    return (
        <div>
            <Dialog open={openProp} onClose={handleClose}>
                <DialogTitle>Edit address</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit address
                    </DialogContentText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="name">Receiver name</InputLabel>

                                <Controller
                                    render={({ field }) => <Input {...field} />}
                                    name={`receiverName`}
                                    control={control}
                                    defaultValue={""}
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
                                    defaultValue={""}
                                />
                            </FormControl>
                        </Grid>
                        <Grid container xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="name">Address</InputLabel>

                                <Controller
                                    render={({ field }) => <Input {...field} />}
                                    name={`addressLine`}
                                    control={control}
                                    defaultValue={""}
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
                                    defaultValue={""}
                                />
                            </FormControl>
                        </Grid>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleClose}>Subscribe</Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>
        </div>
    );
}
