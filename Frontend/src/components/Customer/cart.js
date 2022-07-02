import { Button, Grid, Icon, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { CartItem } from './cartItem';
import RupeeSymbol from '../../rupee.svg'
import AddressDialog from './addressDialog';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Auth/authProvider';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

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
    const navigate = useNavigate()
    const { auth } = useContext(AuthContext);
    const [cart, setCart] = useState();
    const [addresses, setAddresses] = useState();
    const [temp, setTemp] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState();

    const axiosPrivate = useAxiosPrivate()

    let totalPrice = 0;
    let totalItems = 0;

    const fetchCart = async () => {
        try {
            const response = await axiosPrivate.get(`/c/cart`);
            setCart(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    const fetchAddresses = async () => {
        try {
            const response = await axiosPrivate.get('/c/profile/addresses');
            setAddresses(response.data);
            setSelectedValue(response.data?.[0])
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        fetchCart();
        fetchAddresses();
    }, [auth?.accessToken, temp])

    const handleRemoveItem = async (cartItemId) => {

        try {
            const response = await axiosPrivate.delete(`/c/removeCartItem/${cartItemId}`);
            setTemp(prev => !prev)
        } catch (err) {
            console.error(err);
        }
    }

    const handlePlaceOrder = async () => {

        const address = selectedValue;
        try {
            const response = await axiosPrivate.post(`/c/placeOrder`,
                JSON.stringify(address),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            navigate('/')
        } catch (err) {
            console.log(err?.response)
        }
    }

    const handleAddQuantity = async (cartItemId) => {
        try {
            const response = await axiosPrivate.delete(`/c/addQuantity/${cartItemId}`);
            setTemp(prev => !prev)
        } catch (err) {
            console.error(err);
        }
    }

    const handleRemoveQuantity = async (cartItemId) => {
        try {
            const response = await axiosPrivate.delete(`/c/removeQuantity/${cartItemId}`);
            setTemp(prev => !prev)
        } catch (err) {
            console.error(err);
        }

    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div className={classes.root}>
            {cart?.items?.length == 0 && "Your cart is empty"}
            {cart?.items?.map((item, index) => {
                totalPrice += item.product.price * item.quantity;
                totalItems += item.quantity;
                return (

                    <Grid container key={index}>
                        <CartItem cartItem={item} handleRemoveItem={handleRemoveItem} handleAddQuantity={handleAddQuantity}
                            handleRemoveQuantity={handleRemoveQuantity} temp={temp} setTemp={setTemp} />
                    </Grid>
                )
            })}
            {cart?.items?.length > 0 &&
                <>
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

                    <AddressDialog selectedValue={selectedValue} open={open} onClose={handleClose} addresses={addresses} />
                    <Grid container>
                        {selectedValue && <Button variant="contained" onClick={handlePlaceOrder}>Place order</Button>}
                    </Grid>
                </>
            }
        </div>
    )
}
