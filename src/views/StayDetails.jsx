import { useParams } from "react-router"
import { useState, useEffect } from 'react'
import { stayService } from "../services/stay.local.service"
import { StayGalleryPreview } from './StayGalleryPreview'
// import { stayDetailsSvg } from "../assets/svg/stay-details-svg/stay-details-svg"

export function StayDetails() {
    const safetyAmenities = ['Carbon monoxide alarm', 'Smoke alarm']
    const { stayId } = useParams()
    const [stay, setStay] = useState('')

    // is guest favorite - if truthy - show a cmp of guest fav
    useEffect(() => {
        if (stayId) {
            loadStay()
        }
    }, [])

    function countBedsInBedrooms() {
        const numOfBeds = stay.bedrooms.reduce((acc, bedroomObj) => {
            acc += bedroomObj.beds.length
            return acc
        }, 0)
        return numOfBeds
    }

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log(err)
        }
    }

    // function _checkForSafetyAmenities() {
    //     let issafetyAmenities = stay.amenities.map(amenity => safetyAmenities.filter(safetyAmenity => safetyAmenity === amenity))
    //     return safetyAmenities
    // }

    function _findHostName() {
        const host = stay.host
        const spaceIdx = host.fullName.indexOf(' ')
        const hostName = host.fullName.slice(0, spaceIdx)
        return hostName
    }

    return (
        <>
            {stay && <section className='stay-details'>
                <div className="stay-details-header">
                    {/* {stayDetailsSvg.couch} */}
                    <h1>{stay.summary}</h1>
                    <span></span><button>Share</button>
                    <span></span><button>Save</button>
                </div>
                {/* <StayGalleryPreview /> */}
                <div className="type-and-info">
                    <h1>Entire {stay.type} in {stay.loc.city}, {stay.loc.country}</h1>
                    <p>{stay.capacity} guests ・ {stay.bedrooms.length} bedrooms ・ {countBedsInBedrooms()} beds ・ {stay.baths} baths</p>
                    <p>★ No reviews yet</p>
                    <hr />
                </div>
                <div className="hosted-by">
                    {/* <img src={stay.host.imgUrl} /> */}
                    <div className="hosted-by-txt">
                        <h3>Hosted by {_findHostName()}</h3>
            //superhost, two years hosting - add properties
                    </div>
                    <hr />
                </div>
        //if there is a special policy to stay - add policy cmp. now we do not have it in data
                {/* <div className="stay-rooms">
                    <h1>Where you'll sleep</h1>
                    {stay.bedrooms.map(bedroom => {
                        <div>

                        </div>
                    })}
                </div> */}
                <div className="amenities-of-stay"> // grid with two columns. first col - 5 first amenities, sec col - 5 others.
                    <h1>What this place offers: </h1>
                    {/* <span>{stayDetailsSvg.couch.replaceAll('`', '')</span> */}
                    <ul className="first-col-amenity-ul">
                        {stay.amenities.slice(0, 3).map(amenity => <li key={amenity}>{amenity}</li>)}
                        <li className={stay.amenities.includes(safetyAmenities[0]) ? '' : 'no-safety-amenity'}>{safetyAmenities[0]}</li>
                    </ul>
                    <ul>
                        {stay.amenities.slice(4, 9).map(amenity => <li key={amenity}>{amenity}</li>)}
                        <li className={stay.amenities.includes(safetyAmenities[1]) ? '' : 'no-safety-amenity'}>{safetyAmenities[1]}</li>
                    </ul>
                </div>
            </section>
            }
        </>
    )
}