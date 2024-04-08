
import { format, getDay, subDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { stayService } from '../../services/stay.local.service'
import { Order } from './Order'
import { utilService } from '../../services/util.service'

export function Payment({ stay }) {
    const reservation = useSelector(storeState => storeState.reservationModule.reservation)
    const [isDownUpArrow, setIsDownUpArrow] = useState('arrow-down')
    const [paymentMethod, changePaymentMethod] = useState(<><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-label="Credit card" role="img" focusable="false" style={{ display: 'block', height: '33px', width: '33px', fill: 'rgb(176, 176, 176)' }}><path d="M29 5a2 2 0 0 1 2 1.85V25a2 2 0 0 1-1.85 2H3a2 2 0 0 1-2-1.85V7a2 2 0 0 1 1.85-2H3zm0 6H3v14h26zm-3 10a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7-14H3v2h26z"></path></svg><p>Credit or debit card</p></>)
    const [isCredit, setIsCredit] = useState(true)
    const [userOrderDetails, setUserOrderDetails] = useState({ card: { cardNum: '', expDate: '', cvv: '', zip: '' }, phone: '' })
    const [isPhone, setIsPhone] = useState(false)
    const [isOrder, setIsOrder] = useState(false)

    function checkAndValidateOrder(e) {
        e.stopPropagation()
        if (userOrderDetails.card.cardNum &&
            userOrderDetails.card.expDate &&
            userOrderDetails.card.cvv &&
            userOrderDetails.card.zip &&
            userOrderDetails.phone) {
            setIsOrder(true)
        }
        return
    }

    function onChoosePaymentMethod(e) {
        e.stopPropagation()
        setIsDownUpArrow(isDownUpArrow === 'arrow-down' ? 'arrow-up' : 'arrow-down')
    }

    function setPaymentMethod(e, val) {
        e.stopPropagation()
        if (val === 'credit') {
            setIsCredit(true)
            changePaymentMethod(<><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-label="Credit card" role="img" focusable="false" style={{ display: 'block', height: '33px', width: '33px', fill: 'rgb(176, 176, 176)' }}><path d="M29 5a2 2 0 0 1 2 1.85V25a2 2 0 0 1-1.85 2H3a2 2 0 0 1-2-1.85V7a2 2 0 0 1 1.85-2H3zm0 6H3v14h26zm-3 10a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7-14H3v2h26z"></path></svg><p>Credit or debit card</p></>)
            setIsDownUpArrow('arrow-down')
        } else {
            changePaymentMethod(<><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 32" aria-label="Google Pay" role="img" focusable="false" style={{ display: 'block', height: '33px', width: '33px' }}><g fill="none" fillRule="evenodd"><path fill="#3C4043" fillRule="nonzero" d="M21.2 15.58v4.54h-1.42V8.9h3.77a3.35 3.35 0 0 1 2.44.97 3.27 3.27 0 0 1 .16 4.59l-.16.16c-.66.63-1.48.96-2.44.96H21.2zm0-5.3v3.92h2.39a1.84 1.84 0 0 0 1.4-.58 2 2 0 0 0-.04-2.79 1.92 1.92 0 0 0-1.36-.56H21.2zm9.09 1.91c1.05 0 1.88.29 2.49.85.6.57.9 1.35.9 2.35v4.73h-1.35v-1.06h-.07a2.7 2.7 0 0 1-2.34 1.32c-.83 0-1.54-.25-2.1-.76a2.39 2.39 0 0 1-.83-1.88c0-.8.3-1.42.89-1.9a3.7 3.7 0 0 1 2.37-.7c.85 0 1.54.16 2.09.46v-.33c0-.49-.22-.96-.59-1.28a2.05 2.05 0 0 0-1.37-.53c-.79 0-1.42.34-1.88 1.02l-1.25-.8c.67-.99 1.69-1.49 3.04-1.49zm-1.84 5.58c0 .38.18.73.47.94.32.25.7.39 1.1.38.6 0 1.18-.25 1.6-.68.47-.44.7-.97.7-1.58a2.81 2.81 0 0 0-1.85-.53c-.57 0-1.06.14-1.44.42-.39.28-.58.63-.58 1.05z"></path><path fill="#3C4043" d="M41.49 12.44 36.74 23.5h-1.47l1.77-3.87-3.12-7.19h1.55l2.25 5.52h.03l2.2-5.52z"></path><path fill="#4285F4" d="M15.46 14.59c0-.44-.04-.88-.1-1.3h-6v2.47h3.43a2.99 2.99 0 0 1-1.27 1.97v1.6h2.05a6.33 6.33 0 0 0 1.89-4.74z"></path><path fill="#34A853" d="M9.36 20.9c1.71 0 3.16-.58 4.2-1.56l-2.04-1.62a3.81 3.81 0 0 1-5.73-2.04H3.7v1.67a6.34 6.34 0 0 0 5.67 3.54z"></path><path fill="#FBBC04" d="M5.8 15.68a3.94 3.94 0 0 1 0-2.47v-1.66H3.67a6.47 6.47 0 0 0 0 5.79l2.11-1.66z"></path><path fill="#EA4335" d="M9.36 10.55a3.4 3.4 0 0 1 2.43.97l1.82-1.84A6.09 6.09 0 0 0 9.36 8c-2.4 0-4.6 1.38-5.68 3.56l2.11 1.66a3.8 3.8 0 0 1 3.57-2.67z"></path><path fill="#B0B0B0" d="M2.04 1C1.47 1 1 1.47 1 2.05v27.9c0 .58.47 1.05 1.04 1.05h39.92c.57 0 1.04-.47 1.04-1.05V2.05C43 1.47 42.53 1 41.96 1H2.04zM0 2.05C0 .92.9 0 2.04 0h39.92C43.1 0 44 .92 44 2.05v27.9c0 1.13-.9 2.05-2.04 2.05H2.04A2.04 2.04 0 0 1 0 29.95V2.05z"></path></g></svg>
                <p>Google pay</p></>)
            setIsCredit(false)
            setIsDownUpArrow('arrow-down')
        }
    }

    function onUserOrderDetails(e) {
        e.stopPropagation()
        const { value, name } = e.target
        if (name in userOrderDetails.card) {
            setUserOrderDetails((prevUserOrderDetails) => ({ ...prevUserOrderDetails, card: { ...prevUserOrderDetails.card, [name]: value } }))
        }
        if (name === 'phone') setUserOrderDetails((prevUserOrderDetails) => ({ ...prevUserOrderDetails, phone: value }))
    }

    function onCloseAddPhone(e) {
        e.stopPropagation()
        setIsPhone(false)
    }

    function onOpenAddPhone(e) {
        e.stopPropagation()
        setIsPhone(true)
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
                <p>{utilService.timestampToDate(reservation.checkIn)}-{utilService.timestampToDate(reservation.checkout)}</p>
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
                <div className='credit-card-details flex column'>
                    <div className='credit-card-header flex align-center space-between'>
                        <h2>Pay with</h2>
                        <div className='credit-card-imgs flex'>
                            <img src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_visa.0adea522bb26bd90821a8fade4911913.svg" alt="Visa Card" aria-hidden="true" />
                            <img src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_amex.84088b520ca1b3384cb71398095627da.svg" alt="American Express Card" aria-hidden="true" />
                            <img src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_mastercard.f18379cf1f27d22abd9e9cf44085d149.svg" alt="Mastercard" aria-hidden="true" />
                            <img src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_googlepay.3f786bc031b59575d24f504dfb859da0.svg" alt="Google Pay" aria-hidden="true" />
                        </div>
                    </div>
                    <div className='select-credit-debit flex space-between align-center' onClick={onChoosePaymentMethod}>
                        <div className='container flex align-center'>
                            {paymentMethod}
                        </div>
                        <span className={isDownUpArrow}></span>
                    </div>
                    {isDownUpArrow === 'arrow-up' &&
                        <div className='choose-payment-method'>
                            <ul>
                                <li onClick={(event) => setPaymentMethod(event, 'credit')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-label="Credit card" role="img" focusable="false" style={{ display: 'block', height: '33px', width: '33px', fill: 'rgb(176, 176, 176)' }}><path d="M29 5a2 2 0 0 1 2 1.85V25a2 2 0 0 1-1.85 2H3a2 2 0 0 1-2-1.85V7a2 2 0 0 1 1.85-2H3zm0 6H3v14h26zm-3 10a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7-14H3v2h26z"></path></svg>
                                    <p>Credit or debit card</p>
                                </li>
                                <li onClick={(event) => setPaymentMethod(event, 'google')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 32" aria-label="Google Pay" role="img" focusable="false" style={{ display: 'block', height: '33px', width: '33px' }}><g fill="none" fillRule="evenodd"><path fill="#3C4043" fillRule="nonzero" d="M21.2 15.58v4.54h-1.42V8.9h3.77a3.35 3.35 0 0 1 2.44.97 3.27 3.27 0 0 1 .16 4.59l-.16.16c-.66.63-1.48.96-2.44.96H21.2zm0-5.3v3.92h2.39a1.84 1.84 0 0 0 1.4-.58 2 2 0 0 0-.04-2.79 1.92 1.92 0 0 0-1.36-.56H21.2zm9.09 1.91c1.05 0 1.88.29 2.49.85.6.57.9 1.35.9 2.35v4.73h-1.35v-1.06h-.07a2.7 2.7 0 0 1-2.34 1.32c-.83 0-1.54-.25-2.1-.76a2.39 2.39 0 0 1-.83-1.88c0-.8.3-1.42.89-1.9a3.7 3.7 0 0 1 2.37-.7c.85 0 1.54.16 2.09.46v-.33c0-.49-.22-.96-.59-1.28a2.05 2.05 0 0 0-1.37-.53c-.79 0-1.42.34-1.88 1.02l-1.25-.8c.67-.99 1.69-1.49 3.04-1.49zm-1.84 5.58c0 .38.18.73.47.94.32.25.7.39 1.1.38.6 0 1.18-.25 1.6-.68.47-.44.7-.97.7-1.58a2.81 2.81 0 0 0-1.85-.53c-.57 0-1.06.14-1.44.42-.39.28-.58.63-.58 1.05z"></path><path fill="#3C4043" d="M41.49 12.44 36.74 23.5h-1.47l1.77-3.87-3.12-7.19h1.55l2.25 5.52h.03l2.2-5.52z"></path><path fill="#4285F4" d="M15.46 14.59c0-.44-.04-.88-.1-1.3h-6v2.47h3.43a2.99 2.99 0 0 1-1.27 1.97v1.6h2.05a6.33 6.33 0 0 0 1.89-4.74z"></path><path fill="#34A853" d="M9.36 20.9c1.71 0 3.16-.58 4.2-1.56l-2.04-1.62a3.81 3.81 0 0 1-5.73-2.04H3.7v1.67a6.34 6.34 0 0 0 5.67 3.54z"></path><path fill="#FBBC04" d="M5.8 15.68a3.94 3.94 0 0 1 0-2.47v-1.66H3.67a6.47 6.47 0 0 0 0 5.79l2.11-1.66z"></path><path fill="#EA4335" d="M9.36 10.55a3.4 3.4 0 0 1 2.43.97l1.82-1.84A6.09 6.09 0 0 0 9.36 8c-2.4 0-4.6 1.38-5.68 3.56l2.11 1.66a3.8 3.8 0 0 1 3.57-2.67z"></path><path fill="#B0B0B0" d="M2.04 1C1.47 1 1 1.47 1 2.05v27.9c0 .58.47 1.05 1.04 1.05h39.92c.57 0 1.04-.47 1.04-1.05V2.05C43 1.47 42.53 1 41.96 1H2.04zM0 2.05C0 .92.9 0 2.04 0h39.92C43.1 0 44 .92 44 2.05v27.9c0 1.13-.9 2.05-2.04 2.05H2.04A2.04 2.04 0 0 1 0 29.95V2.05z"></path></g></svg>
                                    <p>Google pay</p>
                                </li>
                            </ul>
                        </div>}
                    {isCredit && <><div className='card-details flex column'>
                        <input className="card-number" type="text" name="cardNum" pattern="[0-9]{16}" value={userOrderDetails.card.cardNum} placeholder="Card number" onChange={onUserOrderDetails} />
                        <div className='flex expiration-cvv'>
                            <input className="expiration" pattern="\d{2}/\d{2}" name="expDate" type="text" value={userOrderDetails.card.expDate} placeholder="Expiration" onChange={onUserOrderDetails} />
                            <input className="cvv" type="text" pattern="\d{3,4}" name="cvv" placeholder="CVV" value={userOrderDetails.card.cvv} onChange={onUserOrderDetails} />
                        </div>
                    </div>
                        <input className='zip' name="zip" type='text' value={userOrderDetails.card.zip} placeholder="ZIP code" onChange={onUserOrderDetails} />
                        <div className='country-region'>
                            <p>Country/region</p>
                            Israel
                        </div></>}
                </div>
                <hr />
                <div className='required-and-phone'>
                    <h2>Required for your trip</h2>
                    <div className='required-phone-container'>
                        <div className='add-phone-header flex space-between'>
                            <h4>Phone number</h4>
                            <button onClick={onOpenAddPhone}>Add</button>
                        </div>
                        <p>Add and confirm your phone number to get trip updates.</p>
                        {isPhone && <div className='phone-add flex column'>
                            <div className='header-phone-add flex'>
                                <span onClick={onCloseAddPhone}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '3', overflow: 'visible' }}><path d="m6 6 20 20M26 6 6 26"></path></svg></span>
                                <h2>Add phone number</h2>
                            </div>
                            <div className='phone-modal-container flex column'>
                                <p>We’ll send you trip updates and a text to verify this number.</p>
                                <input type='tel' name="phone" value={userOrderDetails.phone} placeholder="Phone number" pattern="\d{3}-\d{3}-\d{4}" onChange={onUserOrderDetails} />
                                <button className='add-phone' onClick={onCloseAddPhone}>Continue</button>
                            </div>
                        </div>}
                    </div>

                </div>
                <hr />
                <div className='policy'>
                    <h2>Cancellation policy</h2>
                    <p>This reservation is non-refundable. <span className='learn-policy'>Learn more</span></p>
                </div>
                <hr />
                <div className='ground-rules'>
                    <h2>Ground rules</h2>
                    <pre>We ask every guest to remember a
                        few simple things about what makes a great guest.</pre>
                    <ul className='rules'>
                        <li>Follow the house rules</li>
                        <li>Treat your Host’s home like your own</li>
                    </ul>
                </div>
                <div className='confirm-and-pay flex center' onClick={checkAndValidateOrder}>
                    <span>Confirm and pay</span>
                </div>
            </div>
            }
        </div>
        {stay && isOrder && <Order stay={stay} />}
    </section>
}
