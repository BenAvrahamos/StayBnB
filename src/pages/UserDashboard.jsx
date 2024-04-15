import { userService } from "../services/user.service"
import { useEffect, useState } from 'react'
import { orderService } from "../services/order.local.service"
import { utilService } from "../services/util.service"
import { stayService } from "../services/stay.service"

export function UserDashboard() {
    const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedInUser())
    const [userOrders, setUserOrders] = useState()
    const [userStays, setUserStays] = useState()

    useEffect(() => {
        async function getUserOrdersAndStays() {
            try {
                const userOrders = await orderService.getUserOrdersById('u101')
                setUserOrders(userOrders)
                const _userStays = await stayService.getUserStaysById('ywspv2')
                setUserStays(_userStays)
            } catch (err) {
                console.log(err)
                throw err
            }
        }
        getUserOrdersAndStays()
    }, [])


    return (
        <section className="dashboard">
            {userStays && <div className="user-stays-dashboard">
                <h2>My stays</h2>
                <div className="user-stays-container grid">
                    {userStays.map(stay => {
                        return <article key={stay._id} className="flex column">
                            <img src={stay.imgUrls[0]} />
                            <h2>{stay.name}</h2>
                            <p><span className="boldTxt">Capacity:</span> {stay.capacity}</p>
                            <p><span className="boldTxt">Price:</span> {stay.price}</p>
                            <p><span className="boldTxt">Reviews count:</span> {stay.reviews.length}</p>
                        </article>
                    })}
                </div>
                </div>}
            {userOrders && <div className="user-orders-dashboard flex column">
                <h2>My orders</h2>
                <div className="user-orders-container grid">
                        <h3 className="order-number">Order number</h3>
                        <h3 className="place-name">Place name</h3>
                        <h3 className="guests">Guests</h3>
                        <h3 className="price">Price</h3>
                        <h3 className="dates">Dates</h3>
                        <h3 className="location">Location</h3>
                    <nav className="user-orders-details">
                        {userOrders && userOrders.map(order => {
                            const datesAndGuests = { entryDate: order.entryDate, exitDate: order.exitDate, adults: order.guests.adults, children: order.guests.children }
                            return <li key={order._orderId} className="user-order flex">
                                <p>{order._orderId}</p>
                                <p>{order.stay.name}</p>
                                <p>{utilService.calcGuestCount(order)}</p>
                                <p>{Math.round(utilService.calcSumToPay(datesAndGuests, order.stay)) + 
                                Math.round(utilService.calcSumToPay(datesAndGuests, order.stay) * 0.14125)}</p>
                                <p>{utilService.timestampsToShortDates(order.entryDate, order.exitDate)}</p>
                                <p>{order.stay.location}</p>
                            </li>
                        })}
                    </nav>
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