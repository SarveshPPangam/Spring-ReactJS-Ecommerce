import { Button, Grid, Icon, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts';
import { CartItem } from './cartItem';
import RupeeSymbol from '../../rupee.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: "wrap",
    },
    item: {
        margin: '0px 5px 10px 0px',
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    }
}))
export const Cart = () => {
    const classes = useStyles();
    const { state } = useContext(AppContext);
    const userRole = state?.user?.role;
    const [cart, setCart] = useState();
    const [temp, setTemp] = useState(false);
    let totalPrice = 0;
    let totalItems = 0;

    useEffect(() => {
        fetch(`http://localhost:8080/c/cart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token
            }
        }).then(function (response) {
            response.text().then(r => {

                const d = JSON.parse(r)
                console.log(d.items)
                setCart(d);
            })
        }, function (err) {
            console.log(err)
        })
    }, [state.token, temp])

    const handleRemoveItem = (cartItemId) => {
        console.log(cartItemId)
        fetch(`http://localhost:8080/c/removeCartItem/${cartItemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token,
            }
        }).then(function (response) {
            response.text().then(r => {
                setTemp(prev => !prev)
                console.log(temp)
            })
        }, function (error) {
            console.log(error);
        })

    }

    const handleAddQuantity = (cartItemId) => {
        fetch(`http://localhost:8080/c/addQuantity/${cartItemId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token,
            }
        }).then(function (response) {
            response.text().then(r => {
                setTemp(prev => !prev)
                console.log(temp)
            })
        }, function (error) {
            console.log(error);
        })
    }

    const handleRemoveQuantity = (cartItemId) => {
        fetch(`http://localhost:8080/c/removeQuantity/${cartItemId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token,
            }
        }).then(function (response) {
            response.text().then(r => {
                setTemp(prev => !prev)
                console.log(temp)
            })
        }, function (error) {
            console.log(error);
        })
    }


    return (
        <div className={classes.root}>
            {cart?.items.length == 0 && "Your cart is empty"}
            {cart?.items.map((item, index) => {
                totalPrice += item.product.price * item.quantity;
                totalItems += item.quantity;
                return (

                    <Grid container key={index}>
                        <CartItem cartItem={item} handleRemoveItem={handleRemoveItem} handleAddQuantity={handleAddQuantity}
                         handleRemoveQuantity={handleRemoveQuantity}/>
                    </Grid>
                )
            })}
            <Typography variant="h5" noWrap>

                Total price:
            </Typography>
            <Typography variant="h5" noWrap>
                <Icon>
                    <img src={RupeeSymbol} height={14} width={14} />
                </Icon>
                {totalPrice}
            </Typography>
            <Grid container >
                <Typography variant="h5" noWrap>
                    Total items:
                </Typography>
                <Typography variant="h5" noWrap>
                    {totalItems}
                </Typography>
            </Grid>

            <Grid container>
                <Button variant="contained">Place order</Button>
            </Grid>


        </div>
    )
}
