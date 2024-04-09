
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { utilService } from '../../services/util.service'
import { getDate, getMonth, getYear } from 'date-fns'
import { GuestFilter } from '../HeaderCmps/GuestFilter'
import { store } from '../../store/store'
import { GuestCount } from './DetailsGuestCount'
import { stayService } from '../../services/stay.local.service'


export function StayReserveModal({ stay,params, updateParams }) {
    const headerFilterBy = useSelector(storeState => storeState.stayModule.headerFilterBy)
    const [numOfDays, setNumOfDays] = useState(0)
    const [fee, setFee] = useState(0)
    const [currArrow, setCurrArrow] = useState('down')
    const navigate = useNavigate()
    const reservation = useSelector(storeState => storeState.reservationModule.reservation)
    const [modalType, openModalType] = useState()

    const ref = useRef(null)


    useEffect(() => {
        setNumOfDays(utilService.calcSumOfDays(reservation))
    }, [])

    useEffect(() => {
        setFee(parseInt((numOfDays * stay.price) * 0.14125))
    }, [numOfDays])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                openModalType('')
            }
        }
    
        document.addEventListener('click', handleClickOutside)
    
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [ref])



    function validateAndMoveToPayment() {
        if (reservation.checkIn && reservation.checkout &&
            (reservation.guests.adults || reservation.guests.children || reservation.guests.infants)) {
            navigate(`/${stay._id}/payment`)
        }
        return
    }

    return (
        <div className="reserve-modal">
            <div className='container-price-selectors'>
                <div className="price-logo flex align-center">
                    <h2>${stay.price} &nbsp</h2><span>night</span>
                </div>
                <div className='selectors-container flex column'>
                    <div className="date-selectors flex">
                        <div className='check-in flex'>
                            <div className='txt flex column'>
                                <label>Check-in</label>
                                <div className='txt-date'>{getDate(reservation.checkIn)}/{getMonth(reservation.checkIn) + 1}/{getYear(reservation.checkIn)}</div>
                            </div>
                        </div>
                        <div className='checkout flex'>
                            <div className='txt flex column'>
                                <label>Checkout</label>
                                <div className='txt-date'>{getDate(reservation.checkout)}/{getMonth(reservation.checkout) + 1}/{getYear(reservation.checkout)}</div>
                            </div>
                        </div>
                    </div>
                    <div  ref={ref} className='guest-selector flex column' onClick={() => openModalType('guest')}>
                        <label className='guests'>Guests</label>
                        <div className='guest-container flex space-between'>
                            {stayService.guestCountString(headerFilterBy)}
                            {currArrow && <span className={`arrow-${currArrow}`}></span>}
                        </div>
                        
                            {modalType === 'guest'  && <GuestCount params={params} updateParams={updateParams} headerFilterBy={headerFilterBy} openModalType={openModalType} />}
                      
                    </div>
                </div>
                <div className='reserve-btn flex center' onClick={() => validateAndMoveToPayment()}><span >Reserve</span></div>
                {reservation.checkIn && reservation.checkout && <p className='charged-p'>You won't be charged yet.</p>}
            </div>
            <div className='price-calc flex space-between'>
                <span>${stay.price} X {numOfDays === 1 ? `${numOfDays} night` : `${numOfDays} nights`}</span>
                <span className='sum'>${(stay.price * numOfDays).toFixed(2)}</span>
            </div>
            {fee && <div className='fee-calc flex space-between'>
                <span>Staybnb service fee</span>
                <span>${fee}</span>
            </div>}
            <hr />
            {fee > 0 && <div className='sum-total flex space-between'>
                <span>Total</span>
                <span>${(stay.price * numOfDays + fee).toFixed(2)}</span>
            </div>}
        </div>
    )
}         