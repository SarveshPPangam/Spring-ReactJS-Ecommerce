import { Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../contexts'
import { OrderItemTile } from './orderItemTile'

export const Order = ({ order }) => {
    const { state } = useContext(AppContext);
    const userRole = state?.user?.role;
    const viewDetailsRedirectURL = (userRole === 'CUSTOMER' ? `/profile/order/` : `/seller/order/`) + order?.id

    return (
        <div style={{ border: "solid" }} >
            {order?.orderItems?.map(orderItem => {
                return (
                    <div>
                        <OrderItemTile orderItem={orderItem} orderStatus={order?.status} />

                    </div>
                )
            })}
            <Typography variant="h5" noWrap>
                Order status:
                {order?.status}
            </Typography>
            <Link to={viewDetailsRedirectURL} >
                View details
            </Link>
        </div>
    )
}
