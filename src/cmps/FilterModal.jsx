import { useState } from "react"

export function FilterModal({ setShowFilter, onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    function clearFilter() {
        setFilterByToEdit(filterBy)
    }

    function leaveFilter() {
        setShowFilter(false)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
                value = +value
                break
            case 'checkbox':
                target.checked
                break
        }
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    }

    function submitFilter() {
        onSetFilter(filterByToEdit)
        setShowFilter(false)
    }

    return <>
        <div className="overlay" onClick={leaveFilter}></div>

        <section className="filter-modal">
            <header className="flex center">
                <button className="exit-btn flex center" onClick={leaveFilter}><span>X</span></button>
                <h1>Filters</h1>
            </header>

            <main>
                <div>
                    <h2>Type of place</h2>
                    <p>Search rooms, entire homes, or any type of place</p>
                </div>
                <div>
                    <h2>Price range</h2>
                    <p>Nightly prices including fees and taxes</p>
                </div>
                <div>
                    <h2>Rooms and beds</h2>
                    <h4>Bedrooms</h4>
                    <h4>Beds</h4>
                    <h4>Bathrooms</h4>
                </div>
                <div>
                    <h2>Property type</h2>
                </div>
                <div>
                    <h2>Amenities</h2>
                    <h3>Essentials</h3>
                    <h3>Features</h3>
                    <h3>Location</h3>
                    <h3>Safety</h3>
                </div>
                <div>
                    <h2>Booking options</h2>
                    <h4>Instant Book</h4>
                    <p>Listings you can book without waiting for Host approval</p>
                    <h4>Self check-in</h4>
                    <p>Easy access to the property once you arrive</p>
                    <h4>Allows pets</h4>
                    <p>Bringing a service animal?</p>
                </div>
                <div>
                    <h2>Accessibility features</h2>
                    <h3>Guest entrance and parking</h3>
                    <h3>Bedroom</h3>
                    <h3>Bathroom</h3>
                    <h3>Adaptive equipment</h3>
                </div>
                <div>
                    <h2>Host language</h2>
                </div>
            </main>

            <footer className="flex align-center space-between">
                <button className="clear-btn" onClick={clearFilter}>Clear all</button>
                <button className="submit-btn" onClick={submitFilter}>Show ### places</button>
            </footer>
        </section>
    </>
}