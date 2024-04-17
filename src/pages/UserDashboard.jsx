import { userService } from "../services/user.service"
import { useEffect, useState } from 'react'
import { orderService } from "../services/order.service"
import { utilService } from "../services/util.service"
import { stayService } from "../services/stay.service"
import { updateOrder } from "../store/actions/order.actions"
import { socketService,  SOCKET_EVENT_ORDER_UPDATE} from "../services/socket.service"

export function UserDashboard() {
    const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedInUser())
    const [userOrders, setUserOrders] = useState()
    const [userStays, setUserStays] = useState()

    useEffect(() => {
        getUserOrdersAndStays()
    }, [])

    async function onChangeOrderStatus(status, order) {
        try {
            const orderToUpdate = { ...order, status }
            await updateOrder(orderToUpdate)
            console.log(orderToUpdate)
            setUserOrders(prevUserOrders => (prevUserOrders.map(_order => {
                if (_order._id === orderToUpdate._id) return orderToUpdate
                return _order
            })))
            socketService.emit(SOCKET_EVENT_ORDER_UPDATE, orderToUpdate)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async function getUserOrdersAndStays() {
        try {
            const userOrders = await orderService.getUserOrdersById(loggedInUser._id)
            setUserOrders(userOrders)
            const _userStays = await stayService.getUserStaysById(loggedInUser._id)
            setUserStays(_userStays)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    return (
        <section className="dashboard">
            {userStays && <div className="user-stays-dashboard">
                <h2>My properties</h2>
                <div className="user-stays-container flex">
                    {userStays.map(stay => {
                        return <article key={stay._id} className="user-stay flex column center">
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
                <div className="headers grid">
                    <h3 className="order-number">Order number</h3>
                    <h3 className="place-name">Place name</h3>
                    <h3 className="guests">Guests</h3>
                    <h3 className="price">Price</h3>
                    <h3 className="dates">Dates</h3>
                    <h3 className="location">Location</h3>
                    <nav className="user-orders-details flex column">
                        {userOrders && userOrders.map(order => {
                            const datesAndGuests = { entryDate: order.entryDate, exitDate: order.exitDate, adults: order.guests?.adults, children: order.guests?.children }
                            return <li key={order._id} className="user-order flex">
                                <p>{order._id}</p>
                                <p>{order.stay.name}</p>
                                <p>{utilService.calcGuestCount(order)}</p>
                                <p>{Math.round(utilService.calcSumToPay(datesAndGuests, order.stay)) +
                                    Math.round(utilService.calcSumToPay(datesAndGuests, order.stay) * 0.14125)}</p>
                                <p>{utilService.timestampsToShortDates(order.entryDate, order.exitDate)}</p>
                                <p>{order.stay.location.address}</p>
                                <div className="status-and-btns">
                                    <p>{order.status}</p>
                                    <div className="status-btns">
                                        <button className="status-approved-btn" onClick={() => onChangeOrderStatus('approved', order)}>Approve</button>
                                        <button className="status-rejected-btn" onClick={() => onChangeOrderStatus('rejected', order)}>Reject</button>
                                    </div>
                                </div>
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