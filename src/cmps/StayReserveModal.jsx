import { useState, useEffect } from 'react'
export function StayReserveModal({ stay, date = { checkIn: new Date(), checkOut: new Date(), sum: 1 } }) {
    const [guests, setGuests] = useState({ sum: 1, adults: 1, children: 0, infants: 0, pets: 0 })
    // const [stayOrderedDate, setStayOrderedDate] = useState('')
    const [fee, calcFee] = useState(0)
    const [currArrow, setCurrArrow] = useState('down')

    useEffect(() => {
        if (date.sum) calcFee(parseInt((date.sum * stay.price) * 0.14125))
    }, [date.sum])

    // function createOrderedDate() {
    //     const checkInOrderedDate = getOrderedDate(timestampDate.checkIn)
    //     const checkOutOrderedDate = getOrderedDate(timestampDate.checkOut)
    //     setStayOrderedDate({ checkIn: checkInOrderedDate, checkOut: checkOutOrderedDate })
    // }

    function getOrderedDate(date) {
        const formattedDate = new Date(date)
        return {
            day: formattedDate.getDate(),
            month: formattedDate.getMonth() + 1,
            year: formattedDate.getFullYear()
        }
    }

    return (
        <div className="reserve-modal">
            <div className="price-logo flex align-center">
                <h2>${stay.price} &nbsp;</h2><span>night</span>
            </div>
            <div className='selectors-container flex column'>
                <div className="date-selectors flex space-between">
                    <div className='check-in'>
                        <label>Check-in</label>
                        <div className='txt'>{date.checkIn.getDate()}/{date.checkIn.getMonth() + 1}/{date.checkIn.getFullYear()}</div>
                    </div>
                    <div className='checkout'>
                        <label>Checkout</label>
                        <div className='txt'>{date.checkOut.getDate()}/{date.checkOut.getMonth() + 1}/{date.checkOut.getFullYear()}</div>
                    </div>
                </div>
                <div className='guest-selector'>
                    <label className='guests'>Guests</label>
                    <div className='guest-container flex space-between'>
                        <div className='txt'>{guests.sum === 1 ? `${guests.sum} guest` : `${guests.sum} guests`}</div>
                        {currArrow && <span className={`arrow-${currArrow}`}></span>}</div>
                </div>
            </div>
            <div className='reserve-btn-txt flex column'>
                <div className='reserve-btn'><span >Reserve</span></div>
                {date.checkIn && date.checkOut && <span>You won't be charged yet.</span>}
            </div>
            <div className='price-calc flex space-between'>
                <span>${stay.price} X {date.sum === 1 ? `${date.sum} night` : `${date.sum} nights`}</span>
                <span className='sum'>${stay.price * date.sum}</span>
            </div>
            {fee && <div className='fee-calc flex space-between'>
                <span>Staybnb service fee</span>
                <span>${fee}</span>
            </div>}
            <hr />
            {fee > 0 & date.sum && <div className='sum-total flex space-between'>
                <span>Total</span>
                <span>${stay.price * date.sum + fee}</span>
            </div>}
        </div>
    )
}         