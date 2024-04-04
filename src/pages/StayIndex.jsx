import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { stayService } from '../services/stay.local.service.js'
import { StayList } from '../cmps/StayList.jsx'
import { LabelsFilter } from '../cmps/LabelsFilter.jsx'

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
        <LabelsFilter
            onSetFilter={onSetFilter}
            filterBy={filterBy}
        />
        <StayList
            stays={stays}
            filterBy={filterBy}
        />
        <section className='index-end-section flex column center'>
        <h1>Continue exploring homes</h1>
        <button>Show more</button>
        </section>
    </section>
}