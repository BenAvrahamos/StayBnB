import { Link } from 'react-router-dom'
import { StayPreview } from './StayPreview.jsx'
import { store } from '../store/store.js'

import { setStayHeaderFilter } from '../store/actions/stay.actions.js'
import { stayService } from '../services/stay.local.service.js';

export function StayList({ stays, filterBy }) {
    const { headerFilterBy } = store.getState().stayModule;
    const { loc, guestCount, entryDate, exitDate } = headerFilterBy;

    const spreadLoc = loc ? { ...loc } : {}
    const spreadGuestCount = guestCount ? { ...guestCount } : {}



    function clearHeadFilter() {
        const defaultHeaderFilter = stayService.getDefaultHeaderFilter()
        setStayHeaderFilter(defaultHeaderFilter)
    }

    const searchParams = {
        ...spreadLoc,
        ...spreadGuestCount,
        entryDate,
        exitDate
    };

    const queryParams = Object.keys(searchParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
        .join('&')

    return (
        <ul onClick={clearHeadFilter} className="stay-list grid">
            {stays.map(stay => (
                <li key={stay._id}>
                    <Link to={{
                        pathname: `/${stay._id}`,
                        search: queryParams 
                    }}>
                        <StayPreview
                            stay={stay}
                            filterBy={filterBy}
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );
}
