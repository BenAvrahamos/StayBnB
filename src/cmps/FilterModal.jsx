import { useEffect, useState } from "react"

import { stayService } from "../services/stay.local.service"

import { PriceRangeChart } from "./PriceRangeChart"
import { ButtonGroup } from "./HelperCmps/ButtonGroup"
import { CheckboxGroup } from "./HelperCmps/CheckboxGroup"
import { Accordion } from "./HelperCmps/Accordion"

export function FilterModal({ setShowFilter, setStayFilter, filterBy }) {
    const [selected, setSelected] = useState(filterBy)
    const [filteredStays, setFilteredStays] = useState(stayService.query(selected))

    useEffect(() => {
        setFilteredStays(stayService.query(selected))
    }, [selected])

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
            if (field !== 'propType' && field !== 'amenities' && field !== 'hostLngs' && field !== 'label') {
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
    const amenityEssentialsShown = [{ value: 'wifi' }, { value: 'kitchen' }, { value: 'washer' }, { value: 'dryer' }, { value: 'air_conditioning', label: 'air conditioning' }, { value: 'heating' }]
    const amenityEssentialsHidden = [{ value: 'dedicated_workspace', label: 'dedicated workspace' }, { value: 'TV' }, { value: 'hair_dryer', label: 'hair dryer' }, { value: 'iron' }]
    const amenityFeatures = [{ value: 'pool' }, { value: 'hot_tub', label: 'hot tub' }, { value: 'free_parking', label: 'free parking' }, { value: 'ev_charger', label: 'ev charger' }, { value: 'crib' }, { value: 'king_bed', label: 'king bed' }, { value: 'gym' }, { value: 'BBQ_grill', label: 'BBQ grill' }, { value: 'breakfast' }, { value: 'indoor_fireplace', label: 'indoor fireplace' }, { value: 'smoking_allowed', label: 'smoking allowed' }]
    const amenityLocation = [{ value: 'beachfront' }, { value: 'waterfront' }]
    const amenitySafety = [{ value: 'smoke_alarm', label: 'smoke alarm' }, { value: 'carbon_monoxide-alarm', label: 'carbon monoxide alarm' }]
    const hostLngsShown = [{ value: 'english' }, { value: 'french' }, { value: 'german' }, { value: 'japanese' }]
    const hostLngsHidden = [{ value: 'italian' }, { value: 'russian' }, { value: 'spanish' }, { value: 'chinese (Simplified)' }, { value: 'arabic' }, { value: 'hindi' }, { value: 'portuguese' }, { value: 'turkish' }, { value: 'dutch' }, { value: 'korean' }, { value: 'thai' }, { value: 'greek' }, { value: 'hebrew' }, { value: 'polish' }, { value: 'tagalog' }, { value: 'danish' }, { value: 'swedish' }, { value: 'norwegian' }, { value: 'finnish' }, { value: 'czech' }, { value: 'hungarian' }]
    const accessEntrance = [{ value: 'step-free-entrance', label: 'Step-free guest entrance' },{ value: 'wide-entrance', label: 'Guest entrance wider than 32 inches' },{ value: 'accessible-parking', label: 'Accessible parking spot' },{ value: 'step-free-path-to-entrance', label: 'Step-free path to the guest entrance' }]
    const accessBedrooms = [{ value: 'step-free-bedroom', label: 'Step-free bedroom access' },{ value: 'wide-bedroom', label: 'Bedroom entrance wider than 32 inches' }]
    const accessBathrooms = [{ value: 'step-free-bathroom', label: 'Step-free bathroom access' },{ value: 'wide-bathroom', label: 'Bathroom entrance wider than 32 inches' },{ value: 'Shower-bar', label: 'Shower grab bar' },{ value: 'Toilet-bar', label: 'Toilet grab bar' },{ value: 'Step-free-shower', label: 'Step-free shower' },{ value: 'bath-chair', label: 'Shower or bath chair' }]
    const accessEquipment = [{ value: 'hoist', label: 'Ceiling or mobile hoist' }]

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
                    {filterBy.placeType === 'any' && <p>Search rooms, entire homes, or any type of place</p>}
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
                    <PriceRangeChart />
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
                    <CheckboxGroup
                        type={'amenities'}
                        items={amenityEssentialsShown}
                        selectedValues={selected.amenities}
                        handleChange={handleChange}
                    />
                    <Accordion>
                        <CheckboxGroup
                            type={'amenities'}
                            items={amenityEssentialsHidden}
                            selectedValues={selected.amenities}
                            handleChange={handleChange}
                        />

                        <h3>Features</h3>
                        <CheckboxGroup
                            type={'amenities'}
                            items={amenityFeatures}
                            selectedValues={selected.amenities}
                            handleChange={handleChange}
                        />

                        <h3>Location</h3>
                        <CheckboxGroup
                            type={'label'}
                            items={amenityLocation}
                            selectedValues={selected.label}
                            handleChange={handleChange}
                        />

                        <h3>Safety</h3>
                        <CheckboxGroup
                            type={'amenities'}
                            items={amenitySafety}
                            selectedValues={selected.amenities}
                            handleChange={handleChange}
                        />
                    </Accordion>
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
                    <CheckboxGroup
                        type={'accessibility'}
                        items={accessEntrance}
                        selectedValues={selected.accessibility}
                        handleChange={handleChange}
                    />
                    <Accordion>
                        <h3>Bedroom</h3>
                        <CheckboxGroup
                            type={'accessibility'}
                            items={accessBedrooms}
                            selectedValues={selected.accessibility}
                            handleChange={handleChange}
                        />
                        <h3>Bathroom</h3>
                        <CheckboxGroup
                            type={'accessibility'}
                            items={accessBathrooms}
                            selectedValues={selected.accessibility}
                            handleChange={handleChange}
                        />
                        <h3>Adaptive equipment</h3>
                        <CheckboxGroup
                            type={'accessibility'}
                            items={accessEquipment}
                            selectedValues={selected.accessibility}
                            handleChange={handleChange}
                        />
                    </Accordion>
                </div>

                <div className="host-lng">
                    <h2>Host language</h2>
                    <CheckboxGroup
                        type={'hostLngs'}
                        items={hostLngsShown}
                        selectedValues={selected.hostLngs}
                        handleChange={handleChange}
                    />
                    <Accordion>
                        <CheckboxGroup
                            type={'hostLngs'}
                            items={hostLngsHidden}
                            selectedValues={selected.hostLngs}
                            handleChange={handleChange}
                        />
                    </Accordion>
                </div>
            </main>

            <footer className="flex align-center space-between">
                <button className="clear-btn" onClick={clearFilter}>Clear all</button>
                <button className="submit-btn" onClick={submitFilter}>Show {filteredStays.length ? filteredStays.length : '###'} places</button>
            </footer>
        </section>
    </>
}