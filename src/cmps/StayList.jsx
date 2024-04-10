import { Link } from 'react-router-dom'
import { StayPreview } from './StayPreview.jsx'
import { store } from '../store/store.js'

export function StayList({ stays, filterBy }) {
    const { headerFilterBy } = store.getState().stayModule

    let { loc, guestCount, entryDate, exitDate } = headerFilterBy
    if (!entryDate && !exitDate) {
        entryDate = +new Date() // 
        exitDate = +new Date() // 
    } else if (!exitDate) {
        exitDate = entryDate + (24 * 60 * 60 * 1000)
    } else if (entryDate === exitDate) {
        exitDate = entryDate + (24 * 60 * 60 * 1000)
    }
    const spreadLoc = loc ? { ...loc } : {}
    const spreadGuestCount = guestCount ? { ...guestCount } : {}

    const condensedSP = objectToQueryString({ ...spreadLoc, ...spreadGuestCount, entryDate, exitDate })

    function objectToQueryString(obj) {
        return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
    }

    return (
        <ul className={'stay-list grid'}>
            {stays.map(stay => (
                <li key={stay._id}>
                    <Link to={{
                        pathname: `/${stay._id}`,
                        search: condensedSP
                    }}
                        target='_blank'
                    >
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
