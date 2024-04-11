import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { loadOrders } from '../store/actions/order.actions.js'
import { useEffect } from 'react'


export function UserTrips() {
    const { trips } = useSelector(storeState => storeState.orderModule)
    const navigate = useNavigate()

    useEffect(() => {

        loadOrders()
    }, [])

    if (!trips || !trips.length) return <section className='user-trips no-user-trips'>
        <h1>Trips</h1>
        <div>
            <h2>No trips booked...yet!</h2>
            <p>Time to dust off your bags and start planning your next adventure</p>
            <button onClick={() => navigate('/')}>Start searching</button>
        </div>
        <p>Can’t find your reservation here? <span>Visit the Help Center</span></p>
    </section>

    return <section className='user-trips'>
        <h1>Trips</h1>
        <ul >
            {orders.map(trip => (
                <li key={trip._orderId}>
                    <p>hello</p>
                </li>
            ))}
        </ul>
    </section>




}