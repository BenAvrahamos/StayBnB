import { stayService } from "../services/stay.local.service"
import { utilService } from "../services/util.service"

export function StayPreview({ stay, filterBy }) {

    return <article className="stay-preview">
        <img src={stay.imgUrls[0]}/>
        
        {!filterBy.loc.city && <h1>{stay.loc.city}, {stay.loc.country}</h1>}
        {filterBy.loc.city && <h1>{stay.loc.address.split(', ')[0]}</h1>}

        {!filterBy.loc.city && <p className="grayTxt">1,234 kilometers away</p>}
        {filterBy.loc.city && <p className="grayTxt">{stay.summary.length > 34 ? stay.summary.substring(0, 35) + '...' : stay.summary}</p>}

        {!filterBy.entryDate && <p className="grayTxt">Apr 7-9</p>} {/* Make function that fined available dates for each stay and places them here */}

        {!filterBy.entryDate && <p><span className="boldTxt"><span className="moneySgn">$</span>{Math.round(stay.price)}</span> night</p>}
        {filterBy.entryDate && <p><span className="boldTxt"><span className="moneySgn">$</span>{Math.round(stay.price)}</span> night • <span className="grayTxt underline"><span className="moneySgn">$</span>{(stayService.getNumberOfNights(filterBy) * stay.price).toFixed(2)} total</span></p>}
    </article>
}