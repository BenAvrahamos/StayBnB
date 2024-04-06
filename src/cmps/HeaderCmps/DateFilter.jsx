import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { loadStays, removeStay, saveStay, setStayFilter } from '../../store/actions/stay.actions'

export function DateFilter({ setModalType, filterBy }) {
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ])

    const handleSelect = (ranges) => {
        const startDateTimestamp = ranges.selection.startDate.getTime()
        const endDateTimestamp = ranges.selection.endDate.getTime()

        // console.log("Start Date (Timestamp):", startDateTimestamp)
        // console.log("End Date (Timestamp):", endDateTimestamp)
        
        
        if (!filterBy.entryDate && !filterBy.exitDate) {
            
            setStayFilter({ ...filterBy, entryDate: startDateTimestamp})
            
        } else if (filterBy.entryDate && !filterBy.exitDate) {
            
            setStayFilter({ ...filterBy, exitDate: endDateTimestamp })
        } else {
            
            setStayFilter({ ...filterBy, entryDate: startDateTimestamp, exitDate: null })
        }
        
        setDateRange([ranges.selection])


        setModalType('check-out')
    };

    return (
        <section className='date-filter'>
            <DateRangePicker
                ranges={dateRange}
                onChange={handleSelect}
                months={2}
                showSelectionPreview={false}
                showPreview={false}
                showMonthAndYearPickers={false}
                showDateDisplay={false}
                direction="horizontal"
                staticRanges={[]}
                inputRanges={[]}
                enableOutsideDays={true}


            />
        </section>
    );
}
