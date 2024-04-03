import { stayService } from "../services/stay.local.service"

export function StayPreview({ stay, filterBy }) {

    return <article className="stay-preview">
        <img src="http://unsplash.it/600/600" />
        {!filterBy.loc.city && <h1>{stay.loc.city}, {stay.loc.country}</h1>}
        {filterBy.loc.city && <h1>{stay.name}</h1>}
        {!filterBy.loc.city && <p>kilometers away- add function</p>}
        {filterBy.loc.city && <p>{stay.summary}</p>}
        {!filterBy.entryDate && <p>Apr 7-9</p>}
        <div>
            <h6>${stay.price} night</h6>
            {filterBy.entryDate && <p>{stayService.getNumberOfNights()} total</p>}
        </div>
    </article>
}