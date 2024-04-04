import { useState } from 'react';
import { DateFilter } from '../cmps/DateFilter';
import { MapFilter } from '../cmps/MapFilter';
import { GuestFilter } from '../cmps/GuestFilter';

export function HeaderFilter() {
    const [modalType, setModalType] = useState()


    return <section className={`header-filter flex ${modalType ? 'grey' : ''}`}>
        <div className={`destination ${modalType === 'map' ? 'selected' : ''}`} onClick={() => setModalType('map')}>
            Where<span className='grayTxt'>Search destination</span>
        </div>

        <div className={`dates ${modalType === 'check-in' ? 'selected' : ''}`} onClick={() => setModalType('check-in')}>
            Check in<span>Add dates</span>
        </div>
        <div className={`dates ${modalType === 'check-out' ? 'selected' : ''}`} onClick={() => setModalType('check-out')}>
            Check out<span>Add dates</span>
        </div>

        <div className={`guests ${modalType === 'guest' ? 'selected' : ''}`} onClick={() => setModalType('guest') }>
            <div className="flex column justify-center">Who<span>Add guests</span></div>
            <button className='search-btn'></button>
        </div>


        {(modalType === 'check-in' || modalType === 'check-out') && <DateFilter />}
        {modalType === 'map' && <MapFilter />}
        {modalType === 'guest' && <GuestFilter />}


    </section>

}