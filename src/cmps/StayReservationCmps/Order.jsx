import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { format, getDay } from 'date-fns'
import { useState } from 'react'

export function Order({ stay }) {
    const [isShownModal, setIsShownModal] = useState(true)
    const reservation = useSelector(storeState => storeState.reservationModule.reservation)

    function convertDates(dateTimestamp) {
        let str = ''
        const date = new Date(dateTimestamp)
        const monthName = format(date, 'MMMM')
        str += monthName + ' '
        const dayOfDate = getDay(date)
        str += dayOfDate
        return str
    }

    function calcSumOfDays() {
        const date1 = reservation.checkIn
        const date2 = reservation.checkout
        const differenceInMilliseconds = date2 - date1
        const differenceInDays = Math.ceil(differenceInMilliseconds / (24 * 60 * 60 * 1000))
        return differenceInDays
    }

    function calcSumToPay() {
        let diff = reservation.checkout - reservation.checkIn
        diff = diff / (1000 * 60 * 60 * 24)
        return diff * stay.price
    }

    function onCloseModal(e) {
        e.stopPropagation()
        setIsShownModal(false)

    }

    return (
        isShownModal &&
        <div className="order">
            <div className="order-header">
                <span className="vi"></span>
                <h1 className="order-reserved">Reserved successfully</h1>
            </div>
            <hr />
            <p>You can follow the order status in <Link>My trips</Link> page</p>
            <div className='order-details flex justify-center'>
                <div className='details flex column'>
                    <h2>Reservation details</h2>
                    <div className='trip-dates'>
                        <h3>Trip dates</h3>
                        <p>{convertDates(reservation.checkIn)}-{convertDates(reservation.checkout)}</p>
                    </div>
                    <div className='trip-guests'>
                        <h3>Guests</h3>
                        <p>{reservation.guests.sum === 1 ? `${reservation.guests.sum} guest` : `${reservation.guests.sum} guests`}</p>
                    </div>
                    <hr />
                    <div className='price-details'>
                        <h3>Price details</h3>
                        <div className='price-details-txt flex space-between'>
                            <p>${stay.price} X {calcSumOfDays()}</p>
                            <p>${calcSumToPay()}</p>
                        </div>
                    </div>
                    <div className='fee-details flex space-between'>
                        <p>Service fee</p>
                        <p>${calcSumToPay() * 0.14125}</p>
                    </div>
                    <hr />
                    <div className='total-details flex space-between'>
                        <h3>Total</h3>
                        <p>{calcSumToPay() + (calcSumToPay() * 0.14125)}</p>
                    </div>
                </div>
                <div className='pic-and-desc flex column justify-center'>
                    <img src={stay.imgUrls[0]} title={stay.name} />
                    <p>{stay.type} in {stay.loc.country}</p>
                </div>
            </div>
            <div className='btn-of-modal flex justify-center'>
                <button className="close-btn flex center" onClick={onCloseModal}>Close</button>
            </div>
        </div>
    )
}