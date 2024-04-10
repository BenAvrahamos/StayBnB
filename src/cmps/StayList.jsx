import { Link } from 'react-router-dom'
import { StayPreview } from './StayPreview.jsx'
import { store } from '../store/store.js'

import { setStayHeaderFilter, setStayFilter } from '../store/actions/stay.actions.js'
import { stayService } from '../services/stay.local.service.js'

export function StayList({ stays, filterBy, dynamicPageLayOut }) {
    const { headerFilterBy } = store.getState().stayModule
    let { loc, guestCount, entryDate, exitDate } = headerFilterBy


    if (!entryDate && !exitDate) {
        entryDate = +new Date() // 
        exitDate = +new Date() // 
    }

    if (!exitDate) {
        exitDate = entryDate + (24 * 60 * 60 * 1000)
    }

    if (entryDate === exitDate ) {
        exitDate = entryDate + (24 * 60 * 60 * 1000)
    }


    const spreadLoc = loc ? { ...loc } : {}
    const spreadGuestCount = guestCount ? { ...guestCount } : {}



    function clearFilter() {
        const defaultHeaderFilter = stayService.getDefaultHeaderFilter()
        const defaultMainFilter = stayService.getDefaultFilter()

        setStayHeaderFilter(defaultHeaderFilter)
        setStayFilter(defaultMainFilter)
    }

    const searchParams = {
        ...spreadLoc,
        ...spreadGuestCount,
        entryDate,
        exitDate
    }

    const queryParams = Object.keys(searchParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
        .join('&')

    return (
        <ul onClick={clearFilter} className={`stay-list grid ${dynamicPageLayOut.listMargin ? 'margined-list' : ''}`}>
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
    )
}
