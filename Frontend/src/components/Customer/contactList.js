import { Button, FormControl, Grid, Input, InputLabel, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form'
import { AppContext } from '../contexts';
import { Contact } from './contact';


const useStyles = makeStyles((theme) => ({

    contact: {
        marginTop: 80,
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    }
}));
export const ContactList = () => {
    const classes = useStyles()
    const { state } = useContext(AppContext);
    const { handleSubmit, control } = useForm();
    const [contacts, setContacts] = useState()

    useEffect(() => {
        console.log("in useEffect");
        fetch('http://localhost:8080/c/profile/getContacts', {
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
                setContacts(d);
            })
        }, function (error) {
            console.log(error.message)
        })

    }, [state.token])


    const onSubmit = (contact) => {
        console.log(contact)
        fetch('http://localhost:8080/c/profile/addContact', {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token,
            },
        }).then(function (response) {
            response.text().then(r => {
                console.log(r)
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
            {contacts?.map(contact => {
                return (
                    <Grid container key={contact.id} className={classes.contact}>
                        <Contact contact={contact} />
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
                                name={`address`}
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
