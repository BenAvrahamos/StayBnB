import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { stayService } from "../services/stay.service"
import { filterLists } from "../services/filterLists.service"

import { PriceRangeChart } from "./PriceRangeChart"
import { ButtonGroup } from "./HelperCmps/ButtonGroup"
import { CheckboxGroup } from "./HelperCmps/CheckboxGroup"
import { Accordion } from "./HelperCmps/Accordion"
import { SwitchCmp } from "./HelperCmps/SwitchCmp"


export function FilterModal({ setShowFilter, setStayFilter, filterBy }) {
    const [selected, setSelected] = useState(filterBy)
    const [filteredStays, setFilteredStays] = useState(stayService.query(selected))
    
    useEffect(() => {
        setFilteredStays(stayService.query(selected))
    }, [selected])

    function clearFilter() {
        const emptyFilterPart = stayService.getEmptyModalFilter()
        setSelected({ ...selected, ...emptyFilterPart })
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
            if (field === 'bedrooms' || field === 'beds' || field === 'bathrooms' || field === 'placeType') {
                return { ...prevFilterBy, [field]: value }
            } else if (field === 'priceRange') {
                // doesn't have input.
            } else if (field === 'bookingOpts') {
                // return { ...prevFilterBy, [field][value] = !field.value }
            } else {
                const propTypeArray = prevFilterBy[field] || []
                const updatedPropTypeArray = propTypeArray.includes(value) ?
                propTypeArray.filter(item => item !== value) : [...propTypeArray, value]
                return { ...prevFilterBy, [field]: updatedPropTypeArray }
            }
        })
    }

    return <>
        <div className="overlay" onClick={leaveFilter}></div>

        <section className="filter-modal">
            <header className="flex center">
                <button className="exit-btn flex center" onClick={leaveFilter}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '3', overflow: 'visible' }}><path d="m6 6 20 20M26 6 6 26"></path></svg></button>
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
                        items={filterLists.placeTypeItems}
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
                        items={filterLists.bbbItems}
                        selectedValue={selected.bedrooms}
                        handleChange={handleChange}
                    />

                    <h4>Beds</h4>
                    <ButtonGroup
                        type={'beds'}
                        items={filterLists.bbbItems}
                        selectedValue={selected.beds}
                        handleChange={handleChange}
                    />

                    <h4>Bathrooms</h4>
                    <ButtonGroup
                        type={'bathrooms'}
                        items={filterLists.bbbItems}
                        selectedValue={selected.bathrooms}
                        handleChange={handleChange}
                    />
                </div>

                <div className="prop-type">
                    <h2>Property type</h2>
                    <ButtonGroup
                        type={'propType'}
                        items={filterLists.propTypeItems}
                        selectedValue={selected.propType}
                        handleChange={handleChange}
                    />
                </div>

                <div className="amenities">
                    <h2>Amenities</h2>

                    <h3>Essentials</h3>
                    <CheckboxGroup
                        type={'amenities'}
                        items={filterLists.amenityEssentialsShown}
                        selectedValues={selected.amenities}
                        handleChange={handleChange}
                    />
                    <Accordion>
                        <CheckboxGroup
                            type={'amenities'}
                            items={filterLists.amenityEssentialsHidden}
                            selectedValues={selected.amenities}
                            handleChange={handleChange}
                        />

                        <h3>Features</h3>
                        <CheckboxGroup
                            type={'amenities'}
                            items={filterLists.amenityFeatures}
                            selectedValues={selected.amenities}
                            handleChange={handleChange}
                        />

                        <h3>Location</h3>
                        <CheckboxGroup
                            type={'label'}
                            items={filterLists.amenityLocation}
                            selectedValues={selected.label}
                            handleChange={handleChange}
                        />

                        <h3>Safety</h3>
                        <CheckboxGroup
                            type={'amenities'}
                            items={filterLists.amenitySafety}
                            selectedValues={selected.amenities}
                            handleChange={handleChange}
                        />
                    </Accordion>
                </div>

                <div className="booking-opts">
                    <h2>Booking options</h2>
                    <div className="flex align-center space-between">
                        <div>
                            <h4>Instant Book</h4>
                            <p>Listings you can book without waiting for Host approval</p>
                        </div>
                        <SwitchCmp />
                    </div>
                    <div className="flex align-center space-between">
                        <div>
                            <h4>Self check-in</h4>
                            <p>Easy access to the property once you arrive</p>
                        </div>
                        <SwitchCmp />
                    </div>
                    <div className="flex align-center space-between">
                        <div>
                            <h4>Allows pets</h4>
                            <p>Bringing a service animal?</p>
                        </div>
                        <SwitchCmp />
                    </div>
                </div>

                <div className="accessibility">
                    <h2>Accessibility features</h2>
                    <h3>Guest entrance and parking</h3>
                    <CheckboxGroup
                        type={'accessibility'}
                        items={filterLists.accessEntrance}
                        selectedValues={selected.accessibility}
                        handleChange={handleChange}
                    />
                    <Accordion>
                        <h3>Bedroom</h3>
                        <CheckboxGroup
                            type={'accessibility'}
                            items={filterLists.accessBedrooms}
                            selectedValues={selected.accessibility}
                            handleChange={handleChange}
                        />
                        <h3>Bathroom</h3>
                        <CheckboxGroup
                            type={'accessibility'}
                            items={filterLists.accessBathrooms}
                            selectedValues={selected.accessibility}
                            handleChange={handleChange}
                        />
                        <h3>Adaptive equipment</h3>
                        <CheckboxGroup
                            type={'accessibility'}
                            items={filterLists.accessEquipment}
                            selectedValues={selected.accessibility}
                            handleChange={handleChange}
                        />
                    </Accordion>
                </div>

                <div className="host-lng">
                    <h2>Host language</h2>
                    <CheckboxGroup
                        type={'hostLngs'}
                        items={filterLists.hostLngsShown}
                        selectedValues={selected.hostLngs}
                        handleChange={handleChange}
                    />
                    <Accordion>
                        <CheckboxGroup
                            type={'hostLngs'}
                            items={filterLists.hostLngsHidden}
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