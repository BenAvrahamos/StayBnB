import { useState, useEffect } from "react"

export function StayReviewsPreview({ stay }) {
    const [firstReviews, setFirstReviews] = useState([])

    useEffect(() => {
        setFirstReviews(stay.reviews.slice(0, 6))
    }, [stay.reviews])


    return <>
        {firstReviews.length > 0 && <section className="stay-reviews grid">
            {firstReviews.map((review, idx) => {
                return <article key={`${review.title}${idx}`} className="review flex column">
                    <div className="user flex align-center">
                        <img src={review.by.imgUrl} />
                        <div className="user-details-txt flex column">
                            <h3>{review.by.fullName}</h3>
                            <p>{review.by._id}</p>
                        </div>
                    </div>
                    <div className="not-flip-div flex column">
                        <div className="review-score">
                            <p>{'★'.repeat(review.score)}</p>
                        </div>
                        <div className="review-content">
                            {/* {review.title && <h3>{review.title}</h3>} */}
                            <p>{review.txt}</p>
                        </div>
                    </div>
                </article>
            })
            }
        </section>
        }
    </>
}