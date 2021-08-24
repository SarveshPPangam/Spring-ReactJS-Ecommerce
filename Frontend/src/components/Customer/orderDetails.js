import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../contexts'

export const OrderDetails = () => {
    const { id } = useParams()
    const { state } = useContext(AppContext)
    const [order, setOrder] = useState();
    useEffect(() => {

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
    }, [state.token])
    return (
        <div>
            {console.log(order)}
        </div>
    )
}
