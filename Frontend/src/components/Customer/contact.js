import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { AppContext } from '../contexts';

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


export const Contact = ({ contact, contacts, setContacts }) => {
    const classes = useStyles();
    const { state } = useContext(AppContext);

    const deleteContact = (id) => {
        console.log("here")
        fetch('/c/profile/contact/' + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + state.token
            }

        }).then(function (response) {
            response.text().then(r => {
                const d = JSON.parse(r)
                console.log(d)
                setContacts(contacts?.filter(c => c.id !== id))
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
                            {contact.receiverName}
                        </Typography>

                        <Button className={classes.button}>Edit</Button>
                    </Grid>

                </Grid>
                <Grid container>
                    <Typography variant="h5">
                        Phone number:
                        {contact.phoneNumber}
                    </Typography>
                    <Grid item>
                        <Button className={classes.button} onClick={() => deleteContact(contact?.id)}>Delete</Button>
                    </Grid>
                </Grid>
                <Grid container>
                    <Typography variant="h5">
                        Address:
                        {contact.address}
                    </Typography>
                </Grid>
                <Grid container>
                    <Typography variant="h5">
                        Pincode:
                        {contact.pinCode}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}
