import { makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts'
import { Order } from './order';
import { OrderItemTile, OrderTile } from './orderItemTile';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(4),
        marginLeft: 250
    },

}));

export const OrderList = () => {
    const classes = useStyles()
    const { state } = useContext(AppContext);
    const userRole = state?.user?.role;
    const [orders, setOrders] = useState()

    const fetchCustomerOrders = () => {
        fetch(`http://localhost:8080/c/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token
            }
        }).then(function (response) {
            response.text().then(r => {
                const d = JSON.parse(r)
                console.log(d)
                setOrders(d);
            })
        }, function (err) {
            console.log(err)
        })
    }

    const fetchSellerOrders = () => {
        fetch(`http://localhost:8080/seller/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token
            }
        }).then(function (response) {
            response.text().then(r => {
                const d = JSON.parse(r)
                console.log(d)
                setOrders(d);
            })
        }, function (err) {
            console.log(err)
        })
    }

    useEffect(() => {
        userRole === 'CUSTOMER' && fetchCustomerOrders()
        userRole === 'SELLER' && fetchSellerOrders()
    }, [state.token])

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <Typography variant="h5">
                    Your orders
                </Typography>
                {orders?.length === 0 && "You have not ordered anything yet."}
                {orders?.map(order => {
                    // console.log(order.orderItems)
                    return (
                        <Order order={order} />
                    )
                })}
            </main>

        </div>
    )
}
