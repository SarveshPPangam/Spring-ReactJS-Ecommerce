import { Button, Grid, Input, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Icon } from "@material-ui/core";
import RupeeSymbol from '../../rupee.svg'
import { useContext } from 'react';
import { AppContext } from '../contexts';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

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
    },
    root: {
        flexGrow: 1
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    setQ: {
        position: 'fixed',
        top: '11%',
        left: '10%'
    },

    control: {
        padding: theme.spacing(2)
    }
}))
export const CartItem = ({ cartItem, handleRemoveItem, handleAddQuantity, handleRemoveQuantity, temp, setTemp }) => {
    const classes = useStyles();
    const { state } = useContext(AppContext);
    const { handleSubmit, control, watch, setValue } = useForm()
    const [isCustomQuantity, setIsCustomQuantity] = useState(false)

    useEffect(() => {
        setIsCustomQuantity(false)
        setValue('quantity', cartItem?.quantity)
    }, [state.token, cartItem?.quantity])


    const onSubmitQuantity = (data) => {
        if (data?.quantity <= 0)
            return;
        fetch(`/c/setQuantity/${cartItem.id}/${data.quantity}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token
            }
        }).then(function (response) {
            response.text().then(r => {

                console.log(r)
                setTemp(prev => !prev);
                setIsCustomQuantity(false)
            })
        }, function (err) {
            console.log(err)
        })
    }

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
                    <Grid container className={classes.root} spacing={2}>
                        <Grid className={classes.paper}>
                            <Grid item>
                                <Button onClick={() => handleAddQuantity(cartItem.id)}><h1> + </h1> </Button>

                            </Grid>
                            <Grid item>
                                {isCustomQuantity ?
                                    <form onSubmit={handleSubmit(onSubmitQuantity)}>

                                        <Controller
                                            render={({ field }) => <Input type="number" {...field} required />}
                                            name={`quantity`}
                                            control={control}
                                            defaultValue={cartItem?.quantity} // make sure to set up defaultValue
                                        />
                                        {watch('quantity') !== cartItem?.quantity && <Grid item><Button type="submit">Set quantity</Button></Grid>}
                                    </form>
                                    :
                                    <>
                                        {cartItem?.quantity}
                                        <Button onClick={() => setIsCustomQuantity(true)}>Set custom quantity</Button>
                                    </>
                                }
                            </Grid>
                            <Grid item>
                                <Button onClick={() => handleRemoveQuantity(cartItem.id)}><h1> - </h1></Button>
                            </Grid>
                        </Grid>
                    </Grid>
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
