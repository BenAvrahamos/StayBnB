import { utilService } from "../../../services/util.service";

export function DynamicModalHeader({ stay }) {
    return <div className="dynamic-modal-header flex align-center">
        <div className="txt-container flex column">
            <h3>${stay.price} <span>night</span></h3>
            <p className="txt-reviews">★ {utilService.calcScore(stay)} ・ {stay.reviews.length} reviews </p>
        </div>
        <button className='flex center'><span >Reserve</span></button>
    </div>
}