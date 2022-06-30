import { makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from './Auth/authProvider';

import OrderListTable from './orderListTable';


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
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    }

}));

export const OrderList = () => {
    const classes = useStyles()
    const { auth } = useContext(AuthContext);
    const userRole = auth?.userRole;
    const isSeller = userRole === 'SELLER'
    const [orders, setOrders] = useState()
    const viewOrderURL = (userRole === 'CUSTOMER' ? `/profile/order/` : `/seller/order/`)

    const fetchCustomerOrders = () => {
        fetch(`/c/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth?.accessToken
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
        fetch(`/seller/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth?.accessToken
            }
        }).then(function (response) {
            response.text().then(r => {
                const d = JSON.parse(r)
                console.log(d)
                if (Array.isArray(d))
                    setOrders(d);
            })
        }, function (err) {
            console.log(err)
        })
    }

    useEffect(() => {
        userRole === 'CUSTOMER' && fetchCustomerOrders()
        userRole === 'SELLER' && fetchSellerOrders()
    }, [auth?.accessToken])

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <Typography variant="h5">
                    Your orders
                </Typography>
                {orders?.length === 0 && (isSeller ? "You have no orders yet" : "You have not ordered anything yet.")}
                <OrderListTable orders={orders} viewOrderURL={viewOrderURL} link={classes.link} />
                {/* <table>
                    <tr>
                        <th> Sr. No</th>
                        <th> Items</th>
                        <th> Total quantity</th>
                        <th> Total price</th>
                        <th> Status</th>
                        <th> Placed at</th>
                    </tr>
                    <tbody>


                        {orders?.map(order => {
                            // console.log(order.orderItems)
                            return (


                                <tr >
                                    <Link to={viewOrderURL + order?.id} className={classes.link}>
                                        <td>1</td>
                                        <td>
                                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: '20rem' }}>

                                                <Typography noWrap >
                                                    {order?.orderItems?.length > 1 ?
                                                        order?.orderItems?.[0]?.product?.name + "..."
                                                        : order?.orderItems?.[0]?.product?.name}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td>{order?.totalItems}</td>
                                        <td>{order?.totalPrice}</td>
                                        <td>{order?.status}</td>
                                        <td>{order?.placedAt}</td>
                                    </Link>
                                </tr>



                            )
                        })}
                    </tbody>
                </table> */}
            </main>

        </div >
    )
}






