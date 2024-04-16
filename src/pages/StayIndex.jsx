import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStays, removeStay, saveStay, setStayFilter } from '../store/actions/stay.actions.js'
import { StayList } from '../cmps/StayList.jsx'
import { LabelsFilter } from '../cmps/LabelsFilter.jsx'
import { store } from '../store/store.js'
import { stayService } from '../services/stay.service.js'
import { createNewDemoData } from '../services/data.modification.temp.js'


export function StayIndex({scrolledPage}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const { stays } = useSelector(storeState => storeState.stayModule)
    const { filterBy } = useSelector(storeState => storeState.stayModule)
    const { headerFilterBy } = store.getState().stayModule

    useEffect(() => {
        setSearchParams(stayService.mergeFiltersSP(filterBy, headerFilterBy))
        loadStays()
    }, [filterBy])

    const scrolledHeader = () => {
		if (scrolledPage) {
			return 'index-header-condensed'
		} else {
			return ''
		}
	}

    if (!stays || !stays.length) return <section className='index-section'>
        <LabelsFilter
            setStayFilter={setStayFilter}
            filterBy={filterBy}
            scrolledPage={scrolledPage}
        />
        <p>loading</p>
    </section>

    return <section className={`index-section ${scrolledHeader()}`}>
        <LabelsFilter
            setStayFilter={setStayFilter}
            filterBy={filterBy}
            scrolledPage={scrolledPage}
        />
        <StayList
            stays={stays}
            filterBy={filterBy}
            scrolledPage={scrolledPage}
        />
        <section className='index-end-section flex column center'>
            <h1>Continue exploring homes</h1>
            <button>Show more</button>
        </section>
    </section>
}