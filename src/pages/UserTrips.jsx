import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'

import { orderService } from '../services/order.local.service.js'
import { utilService } from '../services/util.service.js'

import { TripModal } from '../cmps/UserTripsCmps/TripModal.jsx'

export function UserTrips() {
    const [userTrips, setUserTrips] = useState([])
    const [trips, setTrips] = useState([])
    const [tripFilter, setTripFilter] = useState({ tense: 'future', status: 'all' })
    const [onModal, setOnModal] = useState(false)
    const [chosenTrip, setChosenTrip] = useState(null)
    const [layoutType, setLayout] = useState('cards')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trips = await orderService.getUserOrdersById('u101')
                setUserTrips(trips)
            }
            catch (err) { console.log(err) }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (userTrips.length > 0) {
            const filteredTrips = orderService.filterUserOrders(userTrips, tripFilter)
            setTrips(filteredTrips)
        }
    }, [userTrips, tripFilter])


    function handleFilter({ target }) {
        const { name: field, value } = target
        setTripFilter(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onChoose(trip) {
        setChosenTrip(trip)
        setOnModal(true)
    }

    function onLayout(type) {
        setLayout(type)
    }

    if (!userTrips || !userTrips.length) return <section className='user-trips no-user-trips'>
        <header className='flex align-center space-between'>
            <h1>Trips</h1>

            <div className='filters flex'>
                <select name="tense" value={tripFilter.tense} onChange={handleFilter}>
                    <option value="all">All</option>
                    <option value="future">Future</option>
                    <option value="current">Current</option>
                    <option value="past">Past</option>
                </select>

                <select name="status" value={tripFilter.status} onChange={handleFilter}>
                    <option value="all">All</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
        </header>

        <div>
            <h2>No trips booked...yet!</h2>
            <p>Time to dust off your bags and start planning your next adventure</p>
            <button onClick={() => navigate('/')}>Start searching</button>
        </div>

        <p>Can't find your reservation here? <span>Visit the Help Center</span></p>
    </section>

    if (!trips || !trips.length) return <section className='user-trips no-user-trips'>
        <header className='flex align-center space-between'>
            <h1>Trips</h1>

            <div className='filters flex'>
                <select name="tense" value={tripFilter.tense} onChange={handleFilter}>
                    <option value="all">All</option>
                    <option value="future">Future</option>
                    <option value="current">Current</option>
                    <option value="past">Past</option>
                </select>

                <select name="status" value={tripFilter.status} onChange={handleFilter}>
                    <option value="all">All</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
        </header>

        <div>
            <h2>No trips to Show</h2>
        </div>

        <p>Can't find your reservation here? <span>Visit the Help Center</span></p>
    </section>

    return <>
        <section className='user-trips'>
            <header className='flex align-center space-between'>
                <h1>Trips</h1>

                <div className='filters flex'>
                    <div className='layout-btns flex align-center'>
                        <button onClick={() => onLayout('lines')} className={`lines flex center ${(layoutType === 'lines' ? 'selected' : '')}`}></button>
                        <button onClick={() => onLayout('cards')} className={`cards flex center ${(layoutType === 'cards' ? 'selected' : '')}`}></button>
                    </div>

                    <select name="tense" value={tripFilter.tense} onChange={handleFilter}>
                        <option value="all">All</option>
                        <option value="future">Future</option>
                        <option value="current">Current</option>
                        <option value="past">Past</option>
                    </select>

                    <select name="status" value={tripFilter.status} onChange={handleFilter}>
                        <option value="all">All</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </header>

            <ul className={`grid ${layoutType}`}>
                {trips.map(trip => (
                    <li key={trip._orderId} className={`trip-card ${trip.status}`} onClick={() => onChoose(trip)} >

                        <header className='flex align-center space-between'>
                            <h3>{utilService.timestampsToShortDates(trip.entryDate, trip.exitDate)}</h3>
                            <p><span>Booking number: </span>{trip._orderId}</p>
                        </header>

                        <main className='flex space-between'>
                            <div className='info flex column'>
                                <h4>{trip.stay.name}</h4>
                                <p>{trip.stay.location}</p>
                                <div className='guests flex'>
                                    {trip.guests.adults > 1 && <p>{trip.guests.adults} adults</p>}
                                    {trip.guests.adults === 1 && <p>{trip.guests.adults} adult</p>}
                                    {trip.guests.children > 1 && <p>&nbsp;• {trip.guests.children} children</p>}
                                    {trip.guests.children === 1 && <p>&nbsp;• {trip.guests.children} child</p>}
                                    {trip.guests.infants > 1 && <p>&nbsp;• {trip.guests.infants} infants</p>}
                                    {trip.guests.infants === 1 && <p>&nbsp;• {trip.guests.infants} infant</p>}
                                </div>
                            </div>

                            <img src={trip.stay.img} alt={trip.stay.name} />
                        </main>

                    </li>
                ))}
            </ul>
        </section>
        {onModal && chosenTrip && <TripModal trip={chosenTrip} setOnModal={setOnModal} />}
    </>
}