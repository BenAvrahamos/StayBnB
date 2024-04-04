import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export function DateFilter() {
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })
    return <section className="date-filter">

        <DateRangePicker
            ranges={[date]}
            onChange={()=>{}}
        />

    </section>


}