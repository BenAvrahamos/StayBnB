import { useState, useEffect } from "react"

export function StayReviewsPreview({ stay }) {
    const [firstThreeReviews, setFirstThreeReviews] = useState([])
    const [lastThreeReviews, setLastThreeReviews] = useState([])

    useEffect(() => {
        setFirstThreeReviews(stay.reviews.slice(0, 3))
        setLastThreeReviews(stay.reviews.slice(3, 6))
    }, [stay.reviews])
    
    console.log(stay.reviews)

    return <div className="stay-reviews grid">
        {firstThreeReviews.length > 0 &&
            <div className="first-three-reviews-col">
                {firstThreeReviews.map((review, idx) => {
                        return <div key={`${review.title}${idx}`} className="review flex column">
                            <div className="user flex">
                                <img src={review.by.imgUrl} />
                                <div className="user-details-txt flex column">
                                    <h3>{review.by.fullName}</h3>
                                    <p>{review.by._id}</p>
                                </div>
                            </div>
                            <div className="review-score">
                                <p>{'★'.repeat(review.score)}</p>
                            </div>
                            <div className="review-content">
                                {review.title && <h3>{review.title}</h3>}
                                <p>{review.txt}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        }
        {lastThreeReviews.length > 0 &&
            <div className="last-three-reviews-col">
                {lastThreeReviews.map((review, idx) => {
                        return <div key={`${review.title}${idx}`} className="review flex column">
                            <div className="user flex">
                                <img src={review.by.imgUrl} />
                                <div className="user-details-txt flex column">
                                    <h3>{review.by.fullName}</h3>
                                    <p>{review.by._id}</p>
                                </div>
                            </div>
                            <div className="review-score">
                                <p>{'★'.repeat(review.score)}</p>
                            </div>
                            <div className="review-content">
                                {review.title && <h3>{review.title}</h3>}
                                <p>{review.txt}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        }
    </div>
}