import { useState } from 'react';
import { DateFilter } from '../cmps/DateFilter';

export function HeaderFilter() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    console.log(isModalOpen);


    return <section className="header-filter flex">
        <div className="destination">Where<span className='grayTxt'>Search destination</span></div>
        <div className="dates" onClick={() => setIsModalOpen(true)}> Check in<span>Add dates</span></div>
        <div className="dates" onClick={() => setIsModalOpen(true)}>Check out<span>Add dates</span></div>
        <div className="guests"><div className="flex column justify-center">Who<span>Add guests</span></div><button className='search-btn'></button></div>

        {isModalOpen && <DateFilter />}


    </section>

}