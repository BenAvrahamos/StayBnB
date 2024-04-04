import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { stayService } from '../services/stay.local.service.js'
import { StayList } from '../cmps/StayList.jsx'
import { LabelFilter } from '../cmps/LabelFilter.jsx'

export function StayIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [stays, setStays] = useState(stayService.query())
    const [filterBy, setFilter] = useState(stayService.getFilterFromParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        loadStays()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilter(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    async function loadStays() {
        try {
            const stays = await stayService.query()
            setStays(stays)
        }
        catch (err) {
            console.log(err)
        }
    }

    if (!stays || !stays.length) return <p>loading</p>
    return <section className='index-section'>
        <LabelFilter
            onSetFilter={onSetFilter}
            filterBy={filterBy}
        />
        <StayList
            stays={stays}
            filterBy={filterBy}
        />
    </section>
}