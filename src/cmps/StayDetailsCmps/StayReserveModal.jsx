import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function StayReserveModal({ stay }) {
    const [numOfDays, setNumOfDays] = useState(0)
    const [fee, setFee] = useState(0)
    const [currArrow, setCurrArrow] = useState('down')
    const navigate = useNavigate()
    const reservation = useSelector(storeState => storeState.reservationModule.reservation)

    useEffect(() => {
        calcSumOfDaysAndFee()
    }, [])

    useEffect(() => {
        setFee(parseInt((numOfDays * stay.price) * 0.14125))
    }, [numOfDays])

    function validateAndMoveToPayment() {
    }

    function calcSumOfDaysAndFee() {
        const date1 = reservation.checkIn
        const date2 = reservation.checkout
        const differenceInMilliseconds = date2.getTime() - date1.getTime()
        const differenceInDays = Math.ceil(differenceInMilliseconds / (24 * 60 * 60 * 1000))
        setNumOfDays(differenceInDays)

    }

    return (
        <div className="reserve-modal">
            <div className='container-price-selectors'>
                <div className="price-logo flex align-center">
                    <h2>${stay.price} &nbsp;</h2><span>night</span>
                </div>
                <div className='selectors-container flex column'>
                    <div className="date-selectors flex">
                        <div className='check-in flex'>
                            <div className='txt flex column'>
                                <label>Check-in</label>
                                <div className='txt-date'>{reservation.checkIn.getDate()}/{reservation.checkIn.getMonth() + 1}/{reservation.checkIn.getFullYear()}</div>
                            </div>
                        </div>
                        <div className='checkout flex'>
                            <div className='txt flex column'>
                                <label>Checkout</label>
                                <div className='txt-date'>{reservation.checkout.getDate()}/{reservation.checkout.getMonth() + 1}/{reservation.checkout.getFullYear()}</div>
                            </div>
                        </div>
                    </div>
                    <div className='guest-selector flex column'>
                        <label className='guests'>Guests</label>
                        <div className='guest-container flex space-between'>
                            {reservation.guests.sum === 1 ? `${reservation.guests.sum} guest` : `${reservation.guests.sum} guests`}
                            {currArrow && <span className={`arrow-${currArrow}`}></span>}
                        </div>
                    </div>
                </div>
                <div className='reserve-btn-txt flex column' onClick={() => validateAndMoveToPayment()}>
                    <div className='reserve-btn flex center'><span >Reserve</span></div>
                </div>
                {reservation.checkIn && reservation.checkout && <p className='charged-p'>You won't be charged yet.</p>}
            </div>
            <div className='price-calc flex space-between'>
                <span>${stay.price} X {numOfDays === 1 ? `${numOfDays} night` : `${numOfDays} nights`}</span>
                <span className='sum'>${stay.price * numOfDays}</span>
            </div>
            {fee && <div className='fee-calc flex space-between'>
                <span>Staybnb service fee</span>
                <span>${fee}</span>
            </div>}
            <hr />
            {fee > 0 && <div className='sum-total flex space-between'>
                <span>Total</span>
                <span>${stay.price * numOfDays + fee}</span>
            </div>}
        </div>
    )
}         