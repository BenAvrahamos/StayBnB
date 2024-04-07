import { useState } from "react"

import { ButtonGroup } from './HelperCmps/ButtonGroup'
import { stayService } from "../services/stay.local.service"
import { PriceRangeChart } from "./PriceRangeChart"

export function FilterModal({ setShowFilter, setStayFilter, filterBy }) {
    const [selected, setSelected] = useState(filterBy)
    const [filteredCount, setFilteredCount] = useState(null)

    async function getFilteredCount() {
        try {
            const stays = await stayService.query(selected)
            setFilteredCount(stays.length)
        } catch (err) { console.log('Error:', err) }
    }

    function clearFilter() {  //add rerender here
        setSelected(filterBy)
    }

    function leaveFilter() {
        setShowFilter(false)
    }

    function submitFilter() {
        setStayFilter(selected)
        setShowFilter(false)
    }

    function handleChange(field, value) {
        setSelected(prevFilterBy => {
            if (field !== 'propType') {
                return { ...prevFilterBy, [field]: value };
            } else {
                const propTypeArray = prevFilterBy[field] || []
                const updatedPropTypeArray = propTypeArray.includes(value) ?
                    propTypeArray.filter(item => item !== value) : [...propTypeArray, value]
                return { ...prevFilterBy, [field]: updatedPropTypeArray }
            }
        })
    }

    const placeTypeItems = [{ value: 'any', label: 'Any type' }, { value: 'room' }, { value: 'entire home' }]
    const bbbItems = [{ value: 'any' }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: '8+' },]
    const propTypeItems = [{ value: 'house' }, { value: 'apartment' }, { value: 'guesthouse' }, { value: 'hotel' }]
    const amenityEssentials = ['wifi', 'kitchen', 'washer', 'dryer', 'air_conditioning', 'heating', 'dedicated_workspace', 'TV', 'hair_dryer', 'iron']
    const amenityFeatures = ['pool', 'hot_tub', 'free_parking', 'ev_charger', 'crib', 'king_bed', 'gym', 'BBQ_grill', 'breakfast', 'indoor_fireplace', 'smoking_allowed']
    const amenityLocation = ['beachfront', 'waterfront']
    const amenitySafety = ['smoke_alarm', 'carbon_monoxide-alarm']

    return <>
        <div className="overlay" onClick={leaveFilter}></div>

        <section className="filter-modal">
            <header className="flex center">
                <button className="exit-btn flex center" onClick={leaveFilter}><span>X</span></button>
                <h1>Filters</h1>
            </header>

            <main>
                <div className="place-type">
                    <h2>Type of place</h2>
                    {filterBy.placeType === 'any type' && <p>Search rooms, entire homes, or any type of place</p>}
                    {filterBy.placeType === 'room' && <p>A room in a home, plus access to shared spaces.</p>}
                    {filterBy.placeType === 'entire home' && <p>A home all to yourself.</p>}
                    <ButtonGroup
                        type={'placeType'}
                        items={placeTypeItems}
                        selectedValue={selected.placeType}
                        handleChange={handleChange}
                    />
                </div>

                <div className="price-range">
                    <h2>Price range</h2>
                    <p>Nightly prices including fees and taxes</p>
                    <PriceRangeChart/>
                </div>

                <div className="rooms-beds">
                    <h2>Rooms and beds</h2>

                    <h4>Bedrooms</h4>
                    <ButtonGroup
                        type={'bedrooms'}
                        items={bbbItems}
                        selectedValue={selected.bedrooms}
                        handleChange={handleChange}
                    />

                    <h4>Beds</h4>
                    <ButtonGroup
                        type={'beds'}
                        items={bbbItems}
                        selectedValue={selected.beds}
                        handleChange={handleChange}
                    />

                    <h4>Bathrooms</h4>
                    <ButtonGroup
                        type={'bathrooms'}
                        items={bbbItems}
                        selectedValue={selected.bathrooms}
                        handleChange={handleChange}
                    />
                </div>

                <div className="prop-type">
                    <h2>Property type</h2>
                    <ButtonGroup
                        type={'propType'}
                        items={propTypeItems}
                        selectedValue={selected.propType}
                        handleChange={handleChange}
                    />
                </div>

                <div className="amenities">
                    <h2>Amenities</h2>
                    <h3>Essentials</h3>
                    <h3>Features</h3>
                    <h3>Location</h3>
                    <h3>Safety</h3>
                </div>

                <div className="booking-opts">
                    <h2>Booking options</h2>
                    <h4>Instant Book</h4>
                    <p>Listings you can book without waiting for Host approval</p>
                    <h4>Self check-in</h4>
                    <p>Easy access to the property once you arrive</p>
                    <h4>Allows pets</h4>
                    <p>Bringing a service animal?</p>
                </div>

                <div className="accessibility">
                    <h2>Accessibility features</h2>
                    <h3>Guest entrance and parking</h3>
                    <h3>Bedroom</h3>
                    <h3>Bathroom</h3>
                    <h3>Adaptive equipment</h3>
                </div>

                <div className="host-lng">
                    <h2>Host language</h2>
                </div>
            </main>

            <footer className="flex align-center space-between">
                <button className="clear-btn" onClick={clearFilter}>Clear all</button>
                <button className="submit-btn" onClick={submitFilter}>Show {filteredCount !== null ? filteredCount : '###'} places</button>
            </footer>
        </section>
    </>
}