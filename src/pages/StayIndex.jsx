import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStays, removeStay, saveStay, setStayFilter } from '../store/actions/stay.actions.js'
import { StayList } from '../cmps/StayList.jsx'
import { LabelsFilter } from '../cmps/LabelsFilter.jsx'
import { store } from '../store/store.js'
import { stayService } from '../services/stay.local.service.js'
import { createNewDemoData } from '../services/data.modification.temp.js'


export function StayIndex({dynamicPageLayOut}) {
    const [searchParams, setSearchParams] = useSearchParams()

    const { stays } = useSelector(storeState => storeState.stayModule)
    const { filterBy } = useSelector(storeState => storeState.stayModule)
    const { headerFilterBy } = store.getState().stayModule

    useEffect(() => {
        setSearchParams(stayService.mergeFilters(filterBy, headerFilterBy))
        loadStays()
        createNewDemoData()
    }, [filterBy])

    if (!stays || !stays.length) return <section className='index-section'>
        <LabelsFilter
            setStayFilter={setStayFilter}
            filterBy={filterBy}
        />
        <p>loading</p>
    </section>

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