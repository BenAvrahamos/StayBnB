import React, { useState } from "react"
import { DateRangePicker } from "react-date-range"

import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file


export function StayDetailsDateModal({ updateParams, params }) {

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

        if (!params.entryDate && !params.exitDate) {

            updateParams({ ...params, entryDate: startDateTimestamp })

        } else if (params.entryDate && !params.exitDate) {

            updateParams({ ...params, exitDate: endDateTimestamp })
        } else {

            updateParams({ ...params, entryDate: startDateTimestamp, exitDate: null })
        }

        setDateRange([ranges.selection])



    }

    return (
        <section className='stay-details-date-filter'>



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
            // disabledDates={disabledDates}

            />
        </section>
    )
}
