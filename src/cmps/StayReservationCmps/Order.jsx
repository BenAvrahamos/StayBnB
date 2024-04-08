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
        <>
            <div className='overlay' onClick={onCloseModal}></div>
            <div className="order-confirmation">
                    <header className="order-header flex center">
                        <button onClick={onCloseModal} className='exit-btn'>X</button>
                        <h1 className="order-reserved">Reservation confirmed</h1>
                    </header>

                    <div className='order-details grid'>
                    <img src={stay.imgUrls[0]} title={stay.name} />

                        <h1>Reservation details</h1>

                        <div className='user flex column'>
                            <p>Guest name:</p>
                            <h5>ADD USER NAME HERE</h5>
                        </div>

                        <div className='stay-name flex column'>
                            <p>Property name:</p>
                            <h5>{stay.summary} in {stay.loc.city}, {stay.loc.country}</h5>
                        </div>

                        <div className='booking-number flex column'>
                            <p>Booking number:</p>
                            <h5>ADD ORDER NUMBER HERE</h5>
                        </div>

                        <div className='dates grid'>
                            <div className='flex column'>
                                <p>Check-in:</p>
                                <h5>{utilService.timestampToDate(reservation.checkIn)}</h5>
                            </div>

                            <div className='flex column'>
                                <p>Check-out:</p>
                                <h5>{utilService.timestampToDate(reservation.checkout)}</h5>
                            </div>
                        </div>

                        <div className='guests-rooms grid'>
                            <div className='guests-container flex column'>
                                <div className='guests flex column'>
                                    <p>Total guests:</p>
                                    <h5>{reservation.guests.sum}</h5>
                                </div>
                                <ul>
                                    {reservation.guests.adults > 0 && <li>{reservation.guests.adults === 1 ? `${reservation.guests.sum} adult` : `${reservation.guests.sum} adults`}</li>}
                                    {reservation.guests.children > 0 && <li>{reservation.guests.children === 1 ? `${reservation.guests.sum} child` : `${reservation.guests.sum} children`}</li>}
                                    {reservation.guests.infants > 0 && <li>{reservation.guests.infants === 1 ? `${reservation.guests.sum} infant` : `${reservation.guests.sum} infants`}</li>}
                                    {reservation.guests.pets > 0 && <li>{reservation.guests.pets === 1 ? `${reservation.guests.sum} pet` : `${reservation.guests.sum} pets`}</li>}
                                </ul>
                            </div>

                            <div className='rooms flex column'>
                                <p>Total Rooms:</p>
                                <h5>ADD NUMBER OF ROOMS HERE</h5>
                            </div>
                        </div>

                        <div className='price flex column'>
                            <div className='flex space-between'>
                                <p>Price:</p>
                                <p>₪{stay.price} X {utilService.calcSumOfDays(reservation)} nights &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>₪{utilService.calcSumToPay(reservation, stay)}</span></p>
                            </div>
                            <div className='flex space-between'>
                                <p>Service fee:</p>
                                <p>₪{utilService.calcSumToPay(reservation, stay) * 0.14125}</p>
                            </div>
                            <hr />
                            <div className='flex space-between'>
                                <h4>Total:</h4>
                                <p><span>₪{utilService.calcSumToPay(reservation, stay) + (utilService.calcSumToPay(reservation, stay) * 0.14125)}</span></p>
                            </div>
                        </div>
                    </div>

                <footer className='flex center'>
                    <button className="close-btn flex center" onClick={onCloseModal}>Close</button>
                </footer>
            </div>

        </>
    )
}