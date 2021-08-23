import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Icon } from "@material-ui/core";
import RupeeSymbol from '../../rupee.svg'
import { useContext } from 'react';
import { AppContext } from '../contexts';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    title: {
        width: 600,
    },
    media: {
        height: 200,
        width: 200
        // objectFit: 'contain',
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    }
}))
export const CartItem = ({ cartItem, handleRemoveItem, handleAddQuantity, handleRemoveQuantity }) => {
    const classes = useStyles();
    const { state } = useContext(AppContext);



    return (
        <div>
            <Grid container >
                <Grid item>
                    <Link to={`/product/${cartItem.product.id}`} className={classes.link} >
                        <Typography variant="h5" noWrap className={classes.title}>
                            {cartItem.product.name}
                        </Typography>
                    </Link>

                    <Typography variant="h5" noWrap>
                        <Icon>
                            <img src={RupeeSymbol} height={14} width={14} />
                        </Icon>
                        {cartItem.product.price}
                    </Typography>


                    <Button onClick={() => handleAddQuantity(cartItem.id)}><h1> + </h1> </Button>
                        {cartItem.quantity}
                    <Button onClick={() => handleRemoveQuantity(cartItem.id)}><h1> - </h1></Button>


                </Grid>
                <Grid item className={classes.media}>
                    <Link to={`/product/${cartItem.product.id}`} className={classes.link} >

                        <img src={cartItem.product.imageURL} width="100%" height="100%" style={{ objectFit: "contain" }} />
                    </Link>
                </Grid>
                <Grid item>
                    <Button onClick={() => handleRemoveItem(cartItem.id)}> <h1>X</h1> </Button>
                </Grid>
            </Grid>
        </div>
    )
}
