import { useSelector } from 'react-redux'

import { loadOrders } from '../store/actions/order.actions.js'
import { useEffect } from 'react'


export function OrderList() {
    const { orders } = useSelector(storeState => storeState.orderModule)

    useEffect(() => {

        loadOrders()
    }, [])

    return (
        <ul >
            {orders.map(order => (
                <li key={order._orderId}>
    
   
                </li>
            ))}
        </ul>
    )




}