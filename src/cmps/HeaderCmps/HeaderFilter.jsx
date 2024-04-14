import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'



import { DateFilter } from './DateFilter'
import { MapFilter } from './MapFilter'
import { GuestFilter } from './GuestFilter'
import { loadStays, setStayFilter } from '../../store/actions/stay.actions'
import { stayService } from '../../services/stay.local.service'
import { store } from '../../store/store'


export function HeaderFilter({ modalType, setModalType, }) {
    const header = useRef(null)
    const navigate = useNavigate()
    const headerFilterBy = useSelector(storeState => storeState.stayModule.headerFilterBy)
    let filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (header.current && !header.current.contains(event.target)) {
                setModalType('')
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }

    }, [header])

    function onLoadStays(ev) {
        ev.stopPropagation()

        const filterByStore = stayService.mergeFiltersStore(filterBy, headerFilterBy)

        navigate('/')
        setModalType('')

        setStayFilter(filterByStore)
        loadStays()
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp)
        const month = date.toLocaleString('default', { month: 'short' })
        const day = date.getDate()
        return `${month} ${day}`
    }

    return <section ref={header} className={`header-filter flex ${modalType && modalType !== 'user-nav' ? 'grey' : ''}`}>
        <div className={`destination ${modalType === 'map' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'map' ? null : 'map')}>
            Where<span className=' grayTxt'>{headerFilterBy.loc.region ? headerFilterBy.loc.region : "search destinations"}</span>
        </div>

        <span className='splitter-1'></span>

        <div className={`dates ${modalType === 'check-in' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'check-in' ? null : 'check-in')}>
            Check in<span>{headerFilterBy.entryDate ? formatDate(headerFilterBy.entryDate) : 'add dates'}</span>
        </div>

        <span className='splitter-2'></span>

        <div className={`dates ${modalType === 'check-out' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'check-out' ? null : 'check-out')}>
            Check out<span>{headerFilterBy.exitDate ? formatDate(headerFilterBy.exitDate) : 'add dates'}</span>
        </div>

        <span className='splitter-3'></span>

        <div className={`guests ${modalType === 'guest' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'guest' ? null : 'guest')}>
            <div className="flex column justify-center">Who<span className='guest-count'>{stayService.guestCountString(headerFilterBy)}</span></div>
            <button onClick={onLoadStays} className={`search-btn ${modalType !== '' && modalType !== 'user-nav' ? 'compact' : ''}`} ><span>Search</span></button>
        </div>

        {modalType === 'map' && <MapFilter setModalType={setModalType} headerFilterBy={headerFilterBy} />}
        {(modalType === 'check-in' || modalType === 'check-out') && <DateFilter setModalType={setModalType} headerFilterBy={headerFilterBy} />}
        {modalType === 'guest' && <GuestFilter headerFilterBy={headerFilterBy} />}

    </section>

}