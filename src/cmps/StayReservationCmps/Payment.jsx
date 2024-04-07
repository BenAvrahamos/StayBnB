
import { format, getDay } from 'date-fns'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { stayService } from '../../services/stay.local.service'

export function Payment( {stay} ) {
    const reservation = useSelector(storeState => storeState.reservationModule.reservation)
    // const [stay, setStay] = useState()

    // useEffect(() => {
    //     if(s) loadStay()
        
    // }, [])

    // async function loadStay() {
    //     try {
    //         const stay = await stayService.getById(stayId)
    //         setStay(stay)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

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

    return <section className="stay-payment-details">
        <div className="payment-details-header">
            <span>Arrow to go back</span>
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
                <button className='flex space-between'>
                    <h3>Pay ${calcSumToPay()} now</h3>
                    <span className='circle'></span>
                    </button>
                <button></button>
            </div>}
        </div>

    </section>
}
