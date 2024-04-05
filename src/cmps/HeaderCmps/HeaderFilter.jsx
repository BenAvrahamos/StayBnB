import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'

import { DateFilter } from './DateFilter';
import { MapFilter } from './MapFilter';
import { GuestFilter } from './GuestFilter';

export function HeaderFilter() {
    const [modalType, setModalType] = useState()
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)


    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setModalType('');
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, [ref])

    function guestCountString() {
        const guestsCount = filterBy.guestCount.adults + filterBy.guestCount.children
        let guests = ''
        if (guestsCount > 0) {
            guests = guestsCount === 1 ? '1 guest' : `${guestsCount} guests`
        }

        const infants = filterBy.guestCount.infants > 0 ? `${filterBy.guestCount.infants} infants` : ''
        const pets = filterBy.guestCount.pets > 0 ? `${filterBy.guestCount.pets} pets` : ''

        const parts = [guests, infants, pets].filter(Boolean)

        return parts.join(', ')
    }



    return <section ref={ref} className={`header-filter flex ${modalType ? 'grey' : ''}`}>
        <div className={`destination ${modalType === 'map' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'map' ? null : 'map')}>
            Where<span className='grayTxt'>{filterBy.loc.region ? filterBy.loc.region : "search destinations"}</span>
        </div>

        <div className={`dates ${modalType === 'check-in' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'check-in' ? null : 'check-in')}>
            Check in<span>Add dates</span>
        </div>
        <div className={`dates ${modalType === 'check-out' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'check-out' ? null : 'check-out')}>
            Check out<span>Add dates</span>
        </div>

        <div className={`guests ${modalType === 'guest' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'guest' ? null : 'guest')}>
            <div className="flex column justify-center">Who<span className='guest-count'>{guestCountString()}</span></div>
            <button className='search-btn'></button>
        </div>


        {modalType === 'map' && <MapFilter setModalType={setModalType} filterBy={filterBy} />}
        {(modalType === 'check-in' || modalType === 'check-out') && <DateFilter modalType={modalType} filterBy={filterBy} />}
        {modalType === 'guest' && <GuestFilter filterBy={filterBy} />}


    </section>

}