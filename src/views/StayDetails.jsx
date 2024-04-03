import { useParams } from "react-router"
import { useState, useEffect } from 'react'
import { stayService } from "../services/stay.local.service"

export function StayDetails() {
    const { stayId } = useParams()
    const [stay, setStay] = useState('')

    useEffect(() => {
        if (stayId) loadStay()
    }, [])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section className='stay-details'>
            <div className="stay-details-header">
                <h1>{stay.summary}</h1>
                <span></span><button>Share</button>
                <span></span><button>Save</button>
            </div>

        </section>
    )
}