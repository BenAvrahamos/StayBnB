import { useParams } from "react-router"
import { useState, useEffect } from 'react'
import { stayService } from "../services/stay.local.service"
import { useLocation } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { StayGalleryPreview } from '../cmps/StayDetailsCmps/StayGalleryPreview'
import { StayReserveModal } from '../cmps/StayDetailsCmps/StayReserveModal'
import { SvgPathCmp } from '../cmps/HelperCmps/SvgPathCmp'
import { BedroomDetails } from '../cmps/StayDetailsCmps/BedroomDetails'
import { StayReviewsPreview } from "../cmps/StayDetailsCmps/StayReviewsPreview"
import { utilService } from "../services/util.service"

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
            _calcLongestBedCount();
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

    function _calcLongestBedCount() {
        let maxBedCount = 0
        stay.bedrooms.forEach((bedroom) => {
            if (bedroom.beds.length > maxBedCount) {
                maxBedCount = bedroom.beds.length
            }
        })
        maxBedCount-- // two rows can contain up to 3 types of beds.
        setLongestBedsArrCount(maxBedCount)
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

                <header className="flex space-between align-center">
                    <h1>{stay.summary}</h1>
                    <div className="header-btns flex">
                        <button className="share-btn flex align-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '2', overflow: 'visible' }}><g fill="none"><path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M16 3v23V3zM6 13l9.3-9.3a1 1 0 0 1 1.4 0L26 13"></path></g></svg>
                            <span>Share</span>
                        </button>
                        <button className="save-btn flex align-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 2, overflow: 'visible' }}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
                            <span>Save</span>
                        </button>
                    </div>
                </header>

                <StayGalleryPreview stay={stay} />

                <main className="content-and-modal-container grid">

                    <section className="content">

                        <div className="place-info flex column">
                            <h1>Entire {stay.type} in {stay.loc.city}, {stay.loc.country}</h1>
                            <p>{stay.capacity} guests ・ {stay.bedrooms.length} bedrooms ・ {utilService.countBedsInBedrooms(stay)} beds ・ {stay.baths} baths</p>
                            <p className="reviews-preview">{'★'.repeat(Math.ceil(utilService.calcScore(stay)))} {utilService.calcScore(stay)} ・ {stay.reviews.length} reviews</p>
                        </div>

                        <hr />

                        <div className="host-info flex">
                            <img src={stay.host.imgUrl} className="host-img" />
                            <div className="flex column">
                                <h3>Hosted by {_findHostName()}</h3>
                                <p>{stay.host.experience.isSuper ? 'Superhost ・' : ''}  {stay.host.experience.hostingTime > 1 ? `${stay.host.experience.hostingTime} years` : 'year'} hosting</p>
                            </div>
                        </div>

                        <hr />

                        <div className="room-info">
                            <h2>Where you'll sleep</h2>

                            <div className="rooms-container grid">
                                {stay.bedrooms.map(room => {
                                    const bedsLength = room.beds.length
                                    return (
                                        <div className="bedroom" key={room.name}
                                            style={{ paddingBlockEnd: bedsLength < longestBedsArrCount ? ((longestBedsArrCount - bedsLength) * .875) + 1.5 + 'rem' : '1.5rem' }}
                                        >
                                            <div className="icons flex align-center space-evenly">
                                                {room.beds.map((bed, idx) => <SvgPathCmp name={bed.replaceAll(' ', '').toLowerCase()} key={room + idx} />)}
                                            </div>
                                            <h4>{room.name}</h4>
                                            <BedroomDetails beds={room.beds} />
                                        </div>)
                                })}
                            </div>
                        </div>

                        <hr />

                        <div className="amenity-info">
                            <h1>What this place offers: </h1>

                            <ul className="amenities-ul grid">
                                {stay.amenities.map(amenity =>
                                    <li key={amenity} className="flex align-center">
                                        <SvgPathCmp name={amenity.replaceAll(' ', '').toLowerCase()} />
                                        <p>{amenity}</p>
                                    </li>)}
                                <li className={`${stay.amenities.includes(safetyAmenities[0]) ? '' : 'no-safety-amenity'} flex align-center`}>
                                    <SvgPathCmp name={safetyAmenities[0].replaceAll(' ', '').toLowerCase()} />
                                    <p>{safetyAmenities[0]}</p>
                                </li>
                            </ul>
                        </div>

                        <hr />

                        <StayReviewsPreview stay={stay} />

                    </section>

                    <StayReserveModal stay={stay} params={params} updateParams={updateParams} />

                </main>

            </section>
            }
        </>
    )
}