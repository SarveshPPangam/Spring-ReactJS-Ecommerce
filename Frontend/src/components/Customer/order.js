import React from 'react'
import { Link } from 'react-router-dom'
import { OrderItemTile } from './orderItemTile'

export const Order = ({ order }) => {

    return (
        <div style={{ border: "solid" }} >
            {order?.orderItems?.map(orderItem => {
                return (
                    <div>
                        <OrderItemTile orderItem={orderItem} />
                        <Link to={`/profile/order/${order?.id}`} >
                            View details
                        </Link>
                    </div>
                )
            })}

        </div>
    )
}
