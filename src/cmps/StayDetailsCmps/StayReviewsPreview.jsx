import { useState, useEffect } from "react"

import { utilService } from "../../services/util.service"

export function StayReviewsPreview({ stay }) {
    const [firstReviews, setFirstReviews] = useState([])

    function shortenReviewLength(txt) {
        let shortenedTxt = ''
        for(let i = 0; i < 130; i++) {
            shortenedTxt += txt[i]
        }
        shortenedTxt += '...'
        return shortenedTxt
    }

    useEffect(() => {
        setFirstReviews(stay.reviews.sort((a, b) => b.rate - a.rate).slice(0, 6))
    }, [stay.reviews])

    return <>
        {firstReviews.length > 0 && <section className="stay-reviews grid" id="reviews">
            {firstReviews.map((review, idx) => {
                return <article key={`${review.by.id}${idx}`} className="review flex column">
                    <div className="user flex align-center">
                        <img src={review.by.imgUrl} />
                        <div className="user-details-txt flex column">
                            <h3>{review.by.fullname}</h3>
                            <p>{review.by.id}</p> {/*should be where their from or how long they've been on the site*/}
                        </div>
                    </div>
                    <div className="not-flip-div flex column">
                        <div className="review-score flex align-center">
                            <p>{'★'.repeat(review.rate)}<span>{'★'.repeat(5 - review.rate)}</span></p>
                            •
                            <h4>{utilService.timestampToMonthYear(review.at)}</h4>
                        </div>
                        <div className="review-content">
                            <p>{review.txt.length > 130 ? shortenReviewLength(review.txt) : review.txt}</p>
                            {review.txt.length > 130 && <a href="#">Read more</a>}
                        </div>
                    </div>
                </article>
            })
            }
        </section>
        }
    </>
}