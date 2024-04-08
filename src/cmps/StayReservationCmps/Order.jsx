import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { format, getDay } from 'date-fns'
import { useState } from 'react'
import { utilService } from '../../services/util.service'

export function Order({ stay }) {
    const [isShownModal, setIsShownModal] = useState(true)
    const reservation = useSelector(storeState => storeState.reservationModule.reservation)

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
                        <p>{utilService.convertDates(reservation.checkIn)}-{utilService.convertDates(reservation.checkout)}</p>
                    </div>
                    <div className='trip-guests'>
                        <h3>Guests</h3>
                        <p>{reservation.guests.sum === 1 ? `${reservation.guests.sum} guest` : `${reservation.guests.sum} guests`}</p>
                    </div>
                    <hr />
                    <div className='price-details'>
                        <h3>Price details</h3>
                        <div className='price-details-txt flex space-between'>
                            <p>${stay.price} X {utilService.calcSumOfDays(reservation)}</p>
                            <p>${utilService.calcSumToPay(reservation)}</p>
                        </div>
                    </div>
                    <div className='fee-details flex space-between'>
                        <p>Service fee</p>
                        <p>${utilService.calcSumToPay(reservation) * 0.14125}</p>
                    </div>
                    <hr />
                    <div className='total-details flex space-between'>
                        <h3>Total</h3>
                        <p>{utilService.calcSumToPay(reservation) + (utilService.calcSumToPay(reservation) * 0.14125)}</p>
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