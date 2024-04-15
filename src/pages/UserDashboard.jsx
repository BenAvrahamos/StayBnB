import { userService } from "../services/user.service"
import { useEffect, useState } from 'react'
import { orderService } from "../services/order.local.service"

export function UserDashboard() {
    const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedInUser())
    const [userOrders, setUserOrders] = useState()

    useEffect(() => {
        setUserOrders(orderService.getUserOrdersById('000000'))
    }, [])

    return (
        <section className="dashboard">
            {userOrders && <div className="orders-dashboard flex column">
                <h2>My orders</h2>
                <div className="orders-container">
        <div className="headers">
            <h3>Order number</h3>
            <h3>Place name</h3>
            <h3>Guests</h3>
            <h3>Price</h3>
            <h3>Dates</h3>
            <h3>Location</h3>
        </div>
       
                </div>
            </div>}
        </section>
    )
}

//  {userOrders.map((order, idx) => {
//             <div className="order-user-details flex" key={order.buyer._id + idx}>
//                 <p>55555555</p> 
//                 {/* change to id from mongo */}
//                 <p>{order.stay.name}</p>
//                 <p>{utilService.calcGuestsCount(order)}</p>
//                 <p>{order.stay.price}</p>
//                 <p>{utilService.timestampToShortDates(+order.stay.entryDate)}-{utilService.timestampToShortDates(+order.stay.exitDate)}</p>
//                 <p>{order.stay.loc}</p>
//                 </div>
//         })}