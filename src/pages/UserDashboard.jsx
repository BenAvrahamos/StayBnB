import { userService } from "../services/user.service"
import { useEffect, useState } from 'react'
import { orderService } from "../services/order.service"
import { utilService } from "../services/util.service"
import { stayService } from "../services/stay.service"
import { updateOrder } from "../store/actions/order.actions"
import { Loading } from "../cmps/Loading"
import { socketService, SOCKET_EVENT_ORDER_UPDATE } from "../services/socket.service"
import { useNavigate } from "react-router"

export function UserDashboard() {
    const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedInUser())
    const [userOrders, setUserOrders] = useState()
    const [userStays, setUserStays] = useState()
    const [sortBy, setSortBy] = useState('date')
    const navigate = useNavigate()

    useEffect(() => {
        getUserStays()
    },[])  
    
    useEffect(() => {
        getUserOrders()
    }, [sortBy])

    async function getUserOrders() {
        try {
            const userOrders = await orderService.getHostOrdersById(loggedInUser._id, sortBy)
            setUserOrders(userOrders)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async function getUserStays() {
        try {
            const _userStays = await stayService.getHostStaysById(loggedInUser._id)
            setUserStays(_userStays)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    function onSortBy(val) {
        setSortBy(val)
    }

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

    function navToEditStay(ev, stayId) {
        ev.stopPropagation()
        navigate(`/edit/${stayId}`)
    }

    function navToDetails(ev, stayId) {
        ev.stopPropagation()
        navigate(`/${stayId}`)
    }

    return <>
        {(!userStays || !userOrders) && <Loading />}
        <section className="dashboard">
            {userStays && (
                <div className="user-stays">
                    <h2>My properties</h2>
                    <div className="user-stays-container grid">
                        {userStays.map(stay => (
                            <article key={stay._id} className="user-stay-card flex column" onClick={(ev) => navToDetails(ev, stay._id)}>
                                <img src={stay.imgUrls[0]} />
                                <h2>{stay.name}</h2>
                                <p><span>Capacity:</span> {stay.capacity}</p>
                                <p><span>Price:</span> {stay.price}</p>
                                <button onClick={(ev) => navToEditStay(ev, stay._id)}>Edit</button>
                            </article>
                        ))}
                    </div>
                </div>
            )}

            {userOrders && <div className="user-orders flex column">
                <h2>My orders</h2>
                <ul className="user-orders-container flex column">
                    <li className="grid">
                        <h3 onClick={() => onSortBy('name')} className={`title ${sortBy === 'name' ? 'selected' : ''}`}>Property name</h3>
                        <h3 onClick={() => onSortBy('date')} className={sortBy === 'date' ? 'selected' : ''}>Dates</h3>
                        <h3>Order number</h3>
                        <h3>Guest</h3>
                        <h3>Guests</h3>
                        <h3>Price</h3>
                        <h3 className="actions">Actions</h3>
                    </li>

                    {userOrders && userOrders.map(order => {
                        const datesAndGuests = { entryDate: order.entryDate, exitDate: order.exitDate, adults: order.guests?.adults, children: order.guests?.children }
                        const isAnswered = (order.status !== 'pending') ? true : false

                        return <li key={order._id} className="user-order grid">
                            <p className="title">{order.stay.name}</p>
                            <p>{utilService.timestampsToShortDates(order.entryDate, order.exitDate)}</p>
                            <p>{order._id}</p>
                            <p>{order.buyer.fullname}</p>
                            <p>{utilService.calcGuestCount(order)}</p>
                            <p>$ {(utilService.calcSumToPay(datesAndGuests, order.stay) + (utilService.calcSumToPay(datesAndGuests, order.stay) * 0.14125)).toLocaleString()}</p>
                            <div className={`flex space-evenly ${isAnswered ? 'answered' : ''}`}>
                                <button onClick={() => onChangeOrderStatus('approved', order)} className={`approve-btn ${(order.status === 'approved') ? 'approved' : ''}`}>Approve</button>
                                <button onClick={() => onChangeOrderStatus('rejected', order)} className={`reject-btn ${(order.status === 'rejected') ? 'rejected' : ''}`}>Reject</button>
                            </div>
                        </li>
                    })}
                </ul>
            </div>}
        </section>
    </>
}