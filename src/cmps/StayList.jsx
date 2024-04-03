import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { StayPreview } from './StayPreview.jsx'
import { stayService } from '../services/stay.local.service.js'

export function StayList({ stays, filterBy }) {

    return <ul className="stay-list grid">
        {stays.map(stay =>
            <li key={stay._id}>
                <Link to={`/${stay._id}`}>
                    <StayPreview 
                    stay={stay}
                    filterBy={filterBy}
                     />
                </Link>
            </li>
        )}
    </ul>
}