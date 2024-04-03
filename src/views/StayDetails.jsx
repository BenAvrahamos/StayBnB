import { useParams } from "react-router"
import { useState, useEffect } from 'react'
import { stayService } from "../services/stay.local.service"
import {StayGalleryPreview} from './StayGalleryPreview'

export function StayDetails() {
    const { stayId } = useParams()
    const [stay, setStay] = useState('')
    const [host, setHost] = useState('')
    const [safetyAmenities, setSafetyAmenities] = useState('')
    let hostName
    // is guest favorite - if truthy - show a cmp of guest fav
    useEffect(() => {
        if (stayId) loadStay()
    }, [])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
            setHost(stay.host)
            _findHostName()
            setSafetyAmenities(_checkForSafetyAmenities())
        } catch (err) {
            console.log(err)
        }
    }

    function _checkForSafetyAmenities() {
        let safetyAmenities = stay.amenities.map(amenity => safetyAmenities.filter(safetyAmenity => safetyAmenity === amenity))
        return safetyAmenities
    }

    function _findHostName() {
        const spaceIdx = host.fullname.indexOf('')
        hostName = host.fullname.slice(0, spaceIdx)
    }

    return (
        <section className='stay-details'>
            <div className="stay-details-header">
                <h1>{stay.summary}</h1>
                <span></span><button>Share</button>
                <span></span><button>Save</button>
            </div>
        <StayGalleryPreview />
        <h1>Entire {stay.type} in {stay.city}, {stay.country}</h1>
        <p>{stay.capacity} guests ・ {stay.bedrooms}・bedrooms ・ {stay.beds} ・ {stay.baths} baths</p>
        <p>★ No reviews yet</p>
        <hr/>
        <div className="hoted-by">
            <img src={host.imgUrl} />
            <div className="hosted-by-txt">
            <h3>Hosted by {hostName}</h3>
            //superhost, two years hosting
            </div>
        //if there is a special polcy to stay - add policy cmp. now we do not have it in data
        <hr/>
        <div className="amenities-of-stay"> // grid with two columns. first col - 5 first amenities, sec col - 5 others.
            <h1>What this place offers:</h1>
            <ul className="first-col-amenity-ul">
                {stay.amenities.map(amenity => 
                    <li key={amenity}>{amenity}</li>)}
            </ul>
        </div>
        </div>
        </section>
    )
}