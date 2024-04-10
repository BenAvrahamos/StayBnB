import { useParams } from 'react-router'
import { Payment } from '../cmps/StayReservationCmps/Payment'
import { PaymentModal } from '../cmps/StayReservationCmps/PaymentModal'
import { useEffect, useState } from 'react'
import { stayService } from '../services/stay.local.service'
import { useLocation, useSearchParams } from 'react-router-dom'

export function StayPayment() {
    const { stayId } = useParams()
    const [stay, setStay] = useState('')


    const [searchParams, setSearchParams] = useSearchParams()

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const {
        region,
        adults,
        children,
        infants,
        pets,
        entryDate,
        exitDate
    } = Object.fromEntries(queryParams.entries())

    const paramsFromFilter = {
        region,
        adults,
        children,
        infants,
        pets,
        entryDate,
        exitDate
    }

    const [params, updateParams] = useState(paramsFromFilter)
    
    useEffect(() => {
        setSearchParams(params)
    }, [params])


    useEffect(() => {
        if (stayId) {
            loadStay()
        }
    }, [])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log(err)
        }
    }

    return <section className="stay-payment grid">
        {stay &&
            <>
                <Payment stay={stay} params={params} />
                <PaymentModal stay={stay} params={params} />
            </>}
    </section>
}
