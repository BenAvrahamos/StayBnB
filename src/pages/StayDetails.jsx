import { useParams } from "react-router"
import { useState, useEffect } from 'react'
import { stayService } from "../services/stay.local.service"
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom'


import { StayGalleryPreview } from '../cmps/StayDetailsCmps/StayGalleryPreview'
import { StayReserveModal } from '../cmps/StayDetailsCmps/StayReserveModal'
import { StayDetailsSvg } from "../cmps/StayDetailsCmps/StayDetailsSvg"
import { BedroomDetails } from '../cmps/StayDetailsCmps/BedroomDetails'
import { StayReviewsPreview } from "../cmps/StayDetailsCmps/StayReviewsPreview"


export function StayDetails() {
    const [searchParams, setSearchParams] = useSearchParams()

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const {
        region,
        adults,
        children,
        infants,
        pets,
        entryDate,
        exitDate
    } = Object.fromEntries(queryParams.entries())

    const paramsFromFilter = {
        region,
        adults,
        children,
        infants,
        pets,
        entryDate,
        exitDate
    }

    const [params, updateParams] = useState(paramsFromFilter)

    const safetyAmenities = ['Carbon monoxide alarm', 'Smoke alarm']
    const { stayId } = useParams()
    const [stay, setStay] = useState('')
    const [longestBedsArrCount, setLongestBedsArrCount] = useState(1)

    // is guest favorite - if truthy - show a cmp of guest fav
    useEffect(() => {
        if (stayId) {
            loadStay()
        }
    }, [])

    useEffect(() => {
        if (stay) {
            calcLongestBedCount();
        }
    }, [stay])


    useEffect(() => {
        setSearchParams(params)
    }, [params])



    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log(err)
        }
    }

    function calcLongestBedCount() {
        let maxBedCount = 0
        stay.bedrooms.forEach((bedroom) => {
            if (bedroom.beds.length > maxBedCount) {
                maxBedCount = bedroom.beds.length
            }
        })
        maxBedCount-- // two rows can contain up to 3 types of beds.
        setLongestBedsArrCount(maxBedCount)
    }

    function countBedsInBedrooms() {
        const numOfBeds = stay.bedrooms.reduce((acc, bedroomObj) => {
            acc += bedroomObj.beds.length
            return acc
        }, 0)
        return numOfBeds
    }

    function _findHostName() {
        const host = stay.host
        const spaceIdx = host.fullName.indexOf(' ')
        const hostName = host.fullName.slice(0, spaceIdx)
        return hostName
    }

    return (
        <>
            {stay && <section className="stay-details">
                <div className="stay-details-header flex space-between align-center">
                    <h1>{stay.summary}</h1>
                    <div className="header-btns flex">
                        <div className="first-btn">
                            <button className="share flex">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '2', overflow: 'visible' }}><g fill="none"><path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M16 3v23V3zM6 13l9.3-9.3a1 1 0 0 1 1.4 0L26 13"></path></g></svg>
                                </span>
                                <span>Share</span>
                            </button>
                        </div>
                        <div className="second-btn flex">
                            <button className="save flex">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 2, overflow: 'visible' }}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
                                </span>
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                </div>
                <StayGalleryPreview stay={stay} />
                <div className="content-and-modal-container">
                    <StayReserveModal stay={stay} params={params} updateParams={updateParams} />
                    <div className="content">
                        <div className="type-and-info">
                            <h1>Entire {stay.type} in {stay.loc.city}, {stay.loc.country}</h1>
                            <p>{stay.capacity} guests ・ {stay.bedrooms.length} bedrooms ・ {countBedsInBedrooms()} beds ・ {stay.baths} baths</p>
                            <p>★ No reviews yet</p>
                            <hr />
                        </div>
                        <div className="host-by flex">
                            <img src={stay.host.imgUrl} className="host-img" />
                            <div className="host-by-txt flex column">
                                <h3>Hosted by {_findHostName()}</h3>
                                <p>{stay.host.experience.isSuper ? 'Superhost ・' : ''}  {stay.host.experience.hostingTime > 1 ? `${stay.host.experience.hostingTime} years` : 'year'} hosting</p>
                            </div>
                        </div>
                        <hr />
                        <div className="stay-rooms">
                            <h2>Where you'll sleep</h2>
                            <div className="bedroom-container grid">
                                {stay.bedrooms.map(bedroom => {
                                    const bedsLength = bedroom.beds.length
                                    return <div className="bedroom-div" key={bedroom.name} style={{
                                        paddingInline: '1rem', paddingBlockStart: '1rem',
                                        paddingBlockEnd: bedsLength < longestBedsArrCount ? ((longestBedsArrCount - bedsLength) * .875) + 1.5 + 'rem' : '1.5rem'
                                    }}>
                                        <div className="icons flex align-center">
                                            {bedroom.beds.map((bed, idx) => <StayDetailsSvg bed={bed} key={`${bed}${idx}`} />)}
                                        </div>
                                        <h4>{bedroom.name}</h4>
                                        <BedroomDetails beds={bedroom.beds} />
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className="amenities-of-stay">
                            <h1>What this place offers: </h1>
                            <div className="amenities-preview-container flex space-between">
                                <ul className="first-col-amenity-ul">
                                    {stay.amenities.slice(0, 4).map(amenity => <li key={amenity}>{amenity}</li>)}
                                    <li className={stay.amenities.includes(safetyAmenities[0]) ? '' : 'no-safety-amenity'}>{safetyAmenities[0]}</li>
                                </ul>
                                <ul className="second-col-amenity-ul">
                                    {stay.amenities.slice(4, 9).map(amenity => <li key={amenity}>{amenity}</li>)}
                                    <li className={stay.amenities.includes(safetyAmenities[1]) ? '' : 'no-safety-amenity'}>{safetyAmenities[1]}</li>
                                </ul>
                            </div>
                        </div>
                        <StayReviewsPreview stay={stay} />
                    </div>
                </div>
            </section>
            }
        </>
    )
}