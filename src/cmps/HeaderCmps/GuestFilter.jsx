
import { loadStays, removeStay, saveStay, setStayFilter } from '../../store/actions/stay.actions'
import { store } from '../../store/store.js'


export function GuestFilter({ filterBy }) {


    function updateGuestCounts(guestType, countChange) {
        const newGuestCounts = { ...filterBy.guestCount }

        newGuestCounts[guestType] += countChange

        setStayFilter({ ...filterBy, guestCount: newGuestCounts })
    }
    return <section className="guest-filter">

        <div className="options">

            <article className="option">
                <div className="description">
                    Adults
                    <span>Ages 13 or above</span>
                </div>

                <div className="count">
                    <button onClick={() => {
                        if (filterBy.guestCount.adults > 0) {
                            updateGuestCounts('adults', -1);
                        }
                    }}>-</button>
                    {filterBy.guestCount.adults}
                    <button onClick={() => {
                        if (filterBy.guestCount.adults + filterBy.guestCount.children < 16) {
                            updateGuestCounts('adults', +1);
                        }
                    }}>+</button>
                </div>

            </article>



            <article className="option">
                <div className="description">
                    Children
                    <span>Ages 2 - 12</span>
                </div>

                <div className="count">
                    <button onClick={() => {
                        if (filterBy.guestCount.children > 0) {
                            updateGuestCounts('children', -1);
                        }
                    }}>-</button>
                    {filterBy.guestCount.children}
                    <button onClick={() => {
                        if (filterBy.guestCount.adults + filterBy.guestCount.children < 16) {
                            updateGuestCounts('children', +1);
                        }
                    }}>+</button>
                </div>


            </article>

            <article className="option">
                <div className="description">
                    Infants
                    <span>Under 2</span>
                </div>

                <div className="count">
                    <button onClick={() => {
                        if (filterBy.guestCount.infants > 0) {
                            updateGuestCounts('infants', -1);
                        }
                    }}>-</button>
                    {filterBy.guestCount.infants}
                    <button onClick={() => {
                        if (filterBy.guestCount.infants < 5) {
                            updateGuestCounts('infants', +1);
                        }
                    }}>+</button>
                </div>

            </article>

            <article className="option">
                <div className="description">
                    Pets
                </div>

                <div className="count">
                <button onClick={() => {
                        if (filterBy.guestCount.pets > 0) {
                            updateGuestCounts('pets', -1);
                        }
                    }}>-</button>
                    {filterBy.guestCount.pets}
                    <button className='disabled' onClick={() => {
                        if (filterBy.guestCount.pets < 5) {
                            updateGuestCounts('pets', +1);
                        }
                    }}>+</button>
                </div>

            </article>

        </div>



    </section>
}