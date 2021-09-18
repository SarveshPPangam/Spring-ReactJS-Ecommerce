import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { AppContext } from '../contexts'

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 300
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 240,
            flexShrink: 0,
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(4),
        marginLeft: 100
    },

}));

export const OrderDetails = () => {
    const classes = useStyles()
    const { id } = useParams()
    const { state } = useContext(AppContext)
    const [order, setOrder] = useState();
    const history = useHistory()
    const userRole = state?.user?.role;

    const fetchCustomerOrder = (id) => {
        fetch(`http://localhost:8080/c/profile/order/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + state.token
            }
        }).then(function (response) {
            response.text().then(r => {
                const d = JSON.parse(r)
                console.log(d)
                setOrder(d)
            })
        }, function (err) {
            console.log(err.message)
        })
    }

    const fetchSellerOrder = (id) => {
        fetch(`http://localhost:8080/seller/order/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + state.token
            }
        }).then(function (response) {
            response.text().then(r => {
                const d = JSON.parse(r)
                console.log(d)
                setOrder(d)
            })
        }, function (err) {
            console.log(err.message)
        })
    }
    useEffect(() => {
        userRole === 'CUSTOMER' && fetchCustomerOrder(id)
        userRole === 'SELLER' && fetchSellerOrder(id)
    }, [state.token])

    const handleCancelOrder = () => {
        fetch(`http://localhost:8080/c/profile/cancelOrder`, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token
            }
        }).then(function (response) {
            response.text().then(r => {
                console.log(r)
                history.push('/profile/orders')
            })
        }, function (err) {
            console.log(err)
        })
    }

    const handleSetAsDelivered = () => {
        fetch(`http://localhost:8080/seller/setAsDelivered`, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token
            }
        }).then(function (response) {
            response.text().then(r => {
                console.log(r)
                history.push('/seller/orders')
            })
        }, function (err) {
            console.log(err)
        })
    }

    return (
        <div className={classes.root}>
            {order?.orderItems?.map(orderItem => {
                return (
                    <Grid container>
                        <Typography variant="h4">
                            {orderItem?.product?.name}
                        </Typography>
                    </Grid>
                )
            })}
            <Typography variant="h5" noWrap>
                Order status:
                {order?.status}
            </Typography>
            {order?.status === 'PENDING' && userRole === 'CUSTOMER' && <Button onClick={() => handleCancelOrder(order?.id)}> Cancel order</Button>}
            {order?.status === 'PENDING' && userRole === 'SELLER' && <Button onClick={() => handleSetAsDelivered(order?.id)}> Set as delivered</Button>}
        </div>
    )
}
