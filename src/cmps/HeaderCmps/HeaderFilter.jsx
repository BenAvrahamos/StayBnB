import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'


import { DateFilter } from './DateFilter';
import { MapFilter } from './MapFilter';
import { GuestFilter } from './GuestFilter';
import { loadStays, removeStay, saveStay, setStayHeaderFilter } from '../../store/actions/stay.actions'
import { stayService } from '../../services/stay.local.service';
import { store } from '../../store/store';

export function HeaderFilter() {
    const [modalType, setModalType] = useState()
    const headerFilterBy = useSelector(storeState => storeState.stayModule.headerFilterBy)

  
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setModalType('')
            }
        };

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }

    }, [ref])



    function guestCountString() {
        const guestsCount = headerFilterBy.guestCount.adults + headerFilterBy.guestCount.children
        let guests = ''
        if (guestsCount > 0) {
            guests = guestsCount === 1 ? '1 guest' : `${guestsCount} guests`
        }
    
        const infants = headerFilterBy.guestCount.infants > 0 ? `${headerFilterBy.guestCount.infants} infants` : ''
        const pets = headerFilterBy.guestCount.pets > 0 ? `${headerFilterBy.guestCount.pets} pets` : ''
    
        const parts = [guests, infants, pets].filter(Boolean)
    
        if (parts.length === 0) {
            return "Add guests"
        }
    
        return parts.join(', ')
    }

    function onLoadStays(ev){
        ev.stopPropagation()
        loadStays()

    }

    function formatDate(timestamp) {
        const date = new Date(timestamp)
        const month = date.toLocaleString('default', { month: 'short' })
        const day = date.getDate()
        return `${month} ${day}`
    }



    return <section ref={ref} className={`header-filter flex ${modalType ? 'grey' : ''}`}>
        <div className={`destination ${modalType === 'map' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'map' ? null : 'map')}>
            Where<span className='grayTxt'>{headerFilterBy.loc.region ? headerFilterBy.loc.region : "search destinations"}</span>
        </div>

        <div className={`dates ${modalType === 'check-in' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'check-in' ? null : 'check-in')}>
            Check in<span>{headerFilterBy.entryDate ? formatDate(headerFilterBy.entryDate) : 'add dates'}</span>
        </div>
        <div className={`dates ${modalType === 'check-out' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'check-out' ? null : 'check-out')}>
            Check out<span>{headerFilterBy.exitDate ? formatDate(headerFilterBy.exitDate) : 'add dates'}</span>
        </div>

        <div className={`guests ${modalType === 'guest' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'guest' ? null : 'guest')}>
            <div className="flex column justify-center">Who<span className='guest-count'>{guestCountString()}</span></div>
            <button onClick={onLoadStays} className='search-btn'></button>
        </div>


        {modalType === 'map' && <MapFilter setModalType={setModalType} headerFilterBy={headerFilterBy}  />}
        {(modalType === 'check-in' || modalType === 'check-out') && <DateFilter setModalType={setModalType} headerFilterBy={headerFilterBy} />}
        {modalType === 'guest' && <GuestFilter headerFilterBy={headerFilterBy} />}


    </section>

}