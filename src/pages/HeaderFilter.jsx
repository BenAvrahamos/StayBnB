import React, { useState, useEffect, useRef } from 'react';
import { DateFilter } from '../cmps/DateFilter';
import { MapFilter } from '../cmps/MapFilter';
import { GuestFilter } from '../cmps/GuestFilter';

export function HeaderFilter() {
    const [modalType, setModalType] = useState()
    console.log(modalType);
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


    return <section ref={ref} className={`header-filter flex ${modalType ? 'grey' : ''}`}>
        <div className={`destination ${modalType === 'map' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'map' ? null : 'map')}>
            Where<span className='grayTxt'>Search destination</span>
        </div>

        <div className={`dates ${modalType === 'check-in' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'check-in' ? null : 'check-in')}>
            Check in<span>Add dates</span>
        </div>
        <div className={`dates ${modalType === 'check-out' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'check-out' ? null : 'check-out')}>
            Check out<span>Add dates</span>
        </div>

        <div className={`guests ${modalType === 'guest' ? 'selected' : ''}`} onClick={() => setModalType(modalType === 'guest' ? null : 'guest')}>
            <div className="flex column justify-center">Who<span>Add guests</span></div>
            <button className='search-btn'></button>
        </div>


        {modalType === 'map' && <MapFilter setModalType={setModalType} />}
        {(modalType === 'check-in' || modalType === 'check-out') && <DateFilter />}
        {modalType === 'guest' && <GuestFilter />}


    </section>

}