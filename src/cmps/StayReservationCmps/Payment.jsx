
import { format, getDay, subDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { stayService } from '../../services/stay.local.service'

export function Payment({ stay }) {
    const reservation = useSelector(storeState => storeState.reservationModule.reservation)
    const [isPayNow, setIsPayNow] = useState(true)

    function calcSumToPay() {
        let diff = reservation.checkout - reservation.checkIn
        diff = diff / (1000 * 60 * 60 * 24)
        return diff * stay.price
    }

    function convertDates(dateTimestamp) {
        let str = ''
        const date = new Date(dateTimestamp)
        const monthName = format(date, 'MMMM')
        str += monthName + ' '
        const dayOfDate = getDay(date)
        str += dayOfDate
        return str
    }

    function calcPricePercentage(percentage) {
        const finalPrice = calcSumToPay()
        percentage = percentage / 100
        return finalPrice * percentage
    }

    function calcDaysToPayment(timestamp, diff) {
        const date = new Date(timestamp)
        const timestampOfDiffDaysAgo = subDays(date, diff).getTime()
        return timestampOfDiffDaysAgo
    }

    return <section className="stay-payment-details">
        <div className="payment-details-header flex align-center">
            <span className='go-back-arr'></span>
            <h1>Request to book</h1>
        </div>
        <div className="reservation-details">
            <h2>Your trip</h2>
            <div className="dates-container flex space-between">
                <h4>Dates</h4>
                <h4>Edit</h4>
            </div>
            <div className='dates'>
                <p>{convertDates(reservation.checkIn)}-{convertDates(reservation.checkout)}</p>
            </div>
            <div className='guests-container flex space-between'>
                <h4>Guests</h4>
                <h4>Edit</h4>
            </div>
            <div className='guests'>
                <p>{reservation.guests.sum === 1 ? `${reservation.guests.sum} guest` : `${reservation.guests.sum} guests`}</p>
            </div>
            <hr />
            {stay && <div className='payment'>
                <h1>Choose how to pay</h1>
                <button className='flex space-between align-center'>
                    <h3>Pay ${calcSumToPay()} now</h3>
                    <span className='circle'></span>
                </button>
                <button className='flex space-between align-center'>
                    <div className='txt flex column'>
                        <h3>Pay part now, part later</h3>
                        <p>{calcPricePercentage(56)} due today, {calcPricePercentage(44)} on {convertDates(calcDaysToPayment(reservation.checkIn, 15))}, {new Date().getFullYear()}. No extra fees.</p>
                    </div>
                    <span className='circle'></span>
                </button>
                <hr />
                <div className='credit-card-details'>
                    <div className='credit-card-header'>
                        <h1>Pay with</h1>
                        <div className='credit-card-imgs flex'>
                            <img src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_visa.0adea522bb26bd90821a8fade4911913.svg" alt="Visa Card" aria-hidden="true" />
                            <img src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_amex.84088b520ca1b3384cb71398095627da.svg" alt="American Express Card" aria-hidden="true" />
                            <img src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_mastercard.f18379cf1f27d22abd9e9cf44085d149.svg" alt="Mastercard" aria-hidden="true" />
                            <img src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_googlepay.3f786bc031b59575d24f504dfb859da0.svg" alt="Google Pay" aria-hidden="true" />
                        </div>
                    </div>
                    <div className='select-credit-debit'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-label="Credit card" role="img" focusable="false" style={{ display: 'block', height: '33px', width: '33px', fill: 'rgb(176, 176, 176)' }}><path d="M29 5a2 2 0 0 1 2 1.85V25a2 2 0 0 1-1.85 2H3a2 2 0 0 1-2-1.85V7a2 2 0 0 1 1.85-2H3zm0 6H3v14h26zm-3 10a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7-14H3v2h26z"></path></svg>
                        <p>Credit or debit card</p>
                    </div>
                    <div className='card-details'>
                        <input type="text" placeholder="Card number" />
                        <div className='flex space-between expiration-cvv'>
                            <input type="text" placeholder="Expiration" />
                            <input type="text" placeholder="CVV" />
                        </div>
                    </div>
                    <input type='text' placeholder="ZIP code" />
                    <div className='country-region'>
                        <p>Country/region</p>
                        Inside is the value of the country.
                    </div>
                    <hr />
                </div>
                <div className='required-and-phone'>
                    <h1>Required for your trip</h1>
                    <div className='required-phone-container'>
                        <h4>Phone number</h4>
                        <button>Add</button>
                    </div>
                    <p>Add and confirm your phone number to get trip updates.</p>
                </div>
                <hr />
                <div className='policy'>
                    <h1>Cancellation policy</h1>
                    <p>This reservation is non-refundable. <span className='learn-policy'>Learn more</span></p>
                </div>
                <hr />
                <div className='ground-rules'>
                    <h1>Ground rules</h1>
                    <pre>We ask every guest to remember a
                        few simple things about what makes a great guest.</pre>
                    <ul className='rules'>
                        <li>Follow the house rules</li>
                        <li>Treat your Host’s home like your own</li>
                    </ul>
                </div>
                <div className='confirm-and-pay flex center'>
                <span>Confirm and pay</span>
                </div>
            </div>

            }
        </div>
    </section>
}
