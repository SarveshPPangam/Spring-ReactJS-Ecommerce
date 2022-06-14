import { Button, Grid, Icon, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts';
import { CartItem } from './cartItem';
import RupeeSymbol from '../../rupee.svg'
import ContactDialog from './contactDialog';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory()
    const { state } = useContext(AppContext);
    const [cart, setCart] = useState();
    const [contacts, setContacts] = useState();
    const [temp, setTemp] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState();

    let totalPrice = 0;
    let totalItems = 0;

    const fetchCart = () => {
        fetch(`/c/cart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token
            }
        }).then(function (response) {
            response.text().then(r => {

                const d = JSON.parse(r)
                setCart(d);
            })
        }, function (err) {
            console.log(err)
        })
    }

    const fetchContacts = () => {
        fetch('/c/profile/contacts', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + state.token
            }

        }).then(function (response) {
            response.text().then(r => {
                //                console.log(r)
                const d = JSON.parse(r)
                setContacts(d);
                setSelectedValue(d?.[0])
            })
        }, function (error) {
            console.log(error.message)
        })
    }


    useEffect(() => {
        fetchCart();
        fetchContacts();
    }, [state.token, temp])

    const handleRemoveItem = (cartItemId) => {
        fetch(`/c/removeCartItem/${cartItemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token,
            }
        }).then(function (response) {
            response.text().then(r => {
                setTemp(prev => !prev)
            })
        }, function (error) {
            console.log(error);
        })

    }

    const handlePlaceOrder = () => {
        const contact = selectedValue;
        fetch('/c/placeOrder', {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token,
            },
        }).then(function (response) {
            response.text().then(r => {
                history.push('/')
            })
        }, function (err) {
            console.log(err)
        })

    }

    const handleAddQuantity = (cartItemId) => {
        fetch(`/c/addQuantity/${cartItemId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token,
            }
        }).then(function (response) {
            response.text().then(r => {
                setTemp(prev => !prev)
            })
        }, function (error) {
            console.log(error);
        })
    }

    const handleRemoveQuantity = (cartItemId) => {
        fetch(`/c/removeQuantity/${cartItemId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token,
            }
        }).then(function (response) {
            response.text().then(r => {
                setTemp(prev => !prev)
            })
        }, function (error) {
            console.log(error);
        })
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
            {cart?.items.length == 0 && "Your cart is empty"}
            {cart?.items.map((item, index) => {
                totalPrice += item.product.price * item.quantity;
                totalItems += item.quantity;
                return (

                    <Grid container key={index}>
                        <CartItem cartItem={item} handleRemoveItem={handleRemoveItem} handleAddQuantity={handleAddQuantity}
                            handleRemoveQuantity={handleRemoveQuantity} temp={temp} setTemp={setTemp} />
                    </Grid>
                )
            })}
            {cart?.items.length > 0 &&
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

                    <ContactDialog selectedValue={selectedValue} open={open} onClose={handleClose} contacts={contacts} />
                    <Grid container>
                        {selectedValue && <Button variant="contained" onClick={handlePlaceOrder}>Place order</Button>}
                    </Grid>
                </>
            }
        </div>
    )
}
