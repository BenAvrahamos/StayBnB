import { stayService } from "../services/stay.local.service"

export function StayPreview({ stay, filterBy }) {

    return <article className="stay-preview">
        <img src="http://unsplash.it/600/600" />
        
        {!filterBy.loc.city && <h1>{stay.loc.city}, {stay.loc.country}</h1>}
        {filterBy.loc.city && <h1>{stay.name}</h1>}

        {!filterBy.loc.city && <p className="grayTxt">1,234 kilometers away</p>}
        {filterBy.loc.city && <p className="grayTxt">{stay.summary}</p>}

        {!filterBy.entryDate && <p className="grayTxt">Apr 7-9</p>}

            {!filterBy.entryDate && <p><span className="boldTxt"><span className="moneySgn">₪</span>{stay.price}</span> night</p>}
            {filterBy.entryDate && <p><span className="boldTxt"><span className="moneySgn">₪</span>{stay.price}</span> night<span className="grayTxt underline"> • {stayService.getNumberOfNights() * stay.price} total</span></p>}
    </article>
}