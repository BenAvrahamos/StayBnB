
import { loadStays, removeStay, saveStay, setStayFilter } from '../../store/actions/stay.actions'
import { store } from '../../store/store.js'


export function MapFilter({ setModalType ,filterBy}) {


    function switchToDatesFilter(ev) {
        ev.stopPropagation()
        setModalType('check-in')
    }


    function onSelectRegion(region) {
        setStayFilter({ ...filterBy, loc: { ...filterBy.loc, region } })
    }

    return <section className="map-filter">
        <h1>Search by region</h1>



        <section className="regions">

      <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('') }}>
                <img src="src\assets\img\flexible.png" alt="" />
                <div>
                    I'm flexible
                </div>
            </article>

            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('Middle East') }}>
                <img src="src\assets\img\middle east.png" alt="" />
                <div>
                    Middle East
                </div>
            </article>

            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('Italy') }}>
                <img src="src\assets\img\italy.png" alt="" />
                <div>
                    Italy
                </div>
            </article>

            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('United States') }}>
                <img src="src\assets\img\us.png" alt="" />
                <div>
                    United States
                </div>
            </article>
            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('Greece') }}>
                <img src="src\assets\img\greece.png" alt="" />
                <div>
                    Greece
                </div>
            </article>

            <article className="region" onClick={(event) => { switchToDatesFilter(event), onSelectRegion('South America') }}>
                <img src="src\assets\img\south america.png" alt="" />
                <div>
                    South America
                </div>
            </article>
        </section>



    </section>
}