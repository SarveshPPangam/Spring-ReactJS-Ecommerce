import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    }
}));
export const Profile = () => {
    const classes = useStyles();
    return (
        <div>
            profile
            <Link to={"/profile/addresses"} className={classes.link}>
                <Button >Addresses</Button>
            </Link>
            <Link to={"/profile/orders"} className={classes.link}>
                <Button >Your orders</Button>
            </Link>
        </div>
    )
}
