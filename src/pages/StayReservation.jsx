import { useParams } from 'react-router'
import { Payment } from '../cmps/StayReservationCmps/Payment'
import { StayReservationModal } from '../cmps/StayReservationCmps/StayReservationModal'
import { useEffect, useState } from 'react'
import { stayService } from '../services/stay.local.service'

export function StayReservation() {
    const { stayId } = useParams()
    const [stay, setStay] = useState('')

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

    return <section className="stay-reservation flex space-between">
        {stay &&
            <>
                <Payment stay={stay} />
                <StayReservationModal stay={stay} />
            </>}
    </section>
}
