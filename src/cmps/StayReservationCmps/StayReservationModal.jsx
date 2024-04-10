import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"

export function StayReservationModal({ stay, params }) {

    const reservation = useSelector(storeState => storeState.reservationModule.reservation)

    function calcScore(reviews) {
        const scores = reviews.map(review => review.score)
        const totalSum = scores.reduce((sum, score) => sum + score, 0)
        const avgScore = totalSum / reviews.length
        return avgScore
    }

    return <div className="stay-reservation-modal flex column">
        <div className="stay-details-part flex align-center">
            <img src={stay.imgUrls[0]} />
            <div className="text-details">
                <h2>{stay.name}</h2>
                <p>{stay.type}</p>
                <p>★ {calcScore(stay.reviews)} ({stay.reviews.length} reviews) {stay.host.experience.isSuper &&
                    <span>・
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" role="presentation" focusable="false"><path d="m8.5 7.6 3.1-1.75 1.47-.82a.83.83 0 0 0 .43-.73V1.33a.83.83 0 0 0-.83-.83H3.33a.83.83 0 0 0-.83.83V4.3c0 .3.16.59.43.73l3 1.68 1.57.88c.35.2.65.2 1 0zm-.5.9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"></path></svg>
                        Superhost</span>}
                </p>
            </div>
        </div>

        <div className="price-details-part">
            <h1>Price details</h1>
            <div className="accommodation flex space-between">
                <p>Accommodation</p>
                <p>${Math.ceil(utilService.calcSumToPay(params, stay))}</p>
            </div>
            <div className="fee flex space-between">
                <p>Staybnb service fee</p>
                <p>${(Math.ceil(utilService.calcSumToPay(params, stay) * 0.14125))}</p>
            </div>
            <div className="total flex space-between">
                <p>Total</p>
                <p>${Math.ceil((utilService.calcSumToPay(params, stay) + (utilService.calcSumToPay(params, stay) * 0.14125)))}</p>
            </div>
        </div>
    </div>
}