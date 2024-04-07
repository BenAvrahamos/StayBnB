import { useSelector } from "react-redux"
export function StayReservationModal( {stay}) {

    const reservation = useSelector(storeState => storeState.reservationModule.reservation)

    function calcSumToPay() {
        let diff = reservation.checkout - reservation.checkIn
        diff = diff / (1000 * 60 * 60 * 24)
        return diff * stay.price
    }

    function calcScore(reviews) {
        const scores = reviews.map(review => review.score)
        const totalSum = scores.reduce((sum, score) => sum + score, 0)
        const avgScore = totalSum / reviews.length
        return avgScore
    }

    return <div className="stay-reservation-modal">
        <div className="stay-details-part">
            <img src={stay.imgUrls[0]} />
            <div className="text-details">
                <h2>{stay.name}</h2>
                <p>{stay.type}</p>
                <p>★ {calcScore(stay.reviews)} ({stay.reviews.length} reviews)・</p>
            </div>
    </div>
    <hr />
    <div className="price-details-part">
        <h1>Price details</h1>
        <div className="accommodation">
            <p>Accommodation</p>
            <p>${calcSumToPay()}</p>
        </div>
        <div className="fee">
            <p>Staybnb service fee</p>
            <p>${calcSumToPay() * 0.14125}</p>
        </div>
        <div className="total">
            <p>Total</p>
            <p>${calcSumToPay() + (calcSumToPay() * 0.14125)}</p>
        </div>
    </div>
    </div>
}