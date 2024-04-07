import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStays, removeStay, saveStay, setStayFilter } from '../store/actions/stay.actions.js'

import { StayList } from '../cmps/StayList.jsx'
import { LabelsFilter } from '../cmps/LabelsFilter.jsx'

export function StayIndex() {
    const [searchParams, setSearchParams] = useSearchParams()

    const { stays } = useSelector(storeState => storeState.stayModule)
    const { filterBy } = useSelector(storeState => storeState.stayModule)

    useEffect(() => {
        setSearchParams(filterBy)
        loadStays()
    }, [filterBy])

    if (!stays || !stays.length) return <>
        <LabelsFilter
            setStayFilter={setStayFilter}
            filterBy={filterBy}
        />
        <p>loading</p>
    </>
    return <section className='index-section'>
        <LabelsFilter
            setStayFilter={setStayFilter}
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