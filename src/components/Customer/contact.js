import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({

    name:{
        display: 'flex',
        alignContent: 'flex-end'
    },
    button: {
        marginLeft:"90%",
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    }
}));
export const Contact = ({ contact }) => {
    const classes = useStyles();


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
                        <Button className={classes.button}>Delete</Button>
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
