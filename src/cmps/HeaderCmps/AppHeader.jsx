import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect, useRef } from "react"






import { HeaderFilter } from "./HeaderFilter"
import { DemoDataService } from "../../services/demoData.service"
import { stayService } from "../../services/stay.local.service"
import { setStayFilter, setStayHeaderFilter } from "../../store/actions/stay.actions"

export function AppHeader() {
    const ref = useRef(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [modalType, setModalType] = useState()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setModalType('')
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }

    }, [ref])

    function goHome() {
        const defaultHeaderFilter = stayService.getDefaultHeaderFilter()
        const defaultMainFilter = stayService.getDefaultFilter()

        setStayHeaderFilter(defaultHeaderFilter)
        setStayFilter(defaultMainFilter)

        navigate('/')
    }



    return <section  className="app-header flex column center">
        <section className="expanded-header flex space-between align-center">

            <div className="logo-section" onClick={goHome}>
                <div className="logo flex align-center">
                    <img src="src\assets\img\airbnb-logo.png" alt="" />
                    Staybnb
                </div>
            </div>

            <div className="nav-section flex justify-center">
                <nav className="nav flex space-evenly">
                    <NavLink onClick={goHome} to="/">Stays</NavLink>
                    <NavLink to="/unActive" className='grayTxt'>Experiences</NavLink>
                    {/* <NavLink to="/" className='grayTxt'>Online Experiences</NavLink> */}
                </nav>
            </div>

            <div ref={ref} className="compact-header">
                <div onClick={() => setModalType(modalType === 'map' ? null : 'map')} className="map">Anywhere</div>
                <div onClick={() => setModalType(modalType === 'check-in' ? null : 'check-in')} className="calendar">Any week</div>
                <div onClick={() => setModalType(modalType === 'guest' ? null : 'guest')} className="guests">Add guests <div className="search-btn"></div> </div>
            </div>

            <div className="user-section flex align-center" >
                Staybnb your home

                <button className="flex align-center space-between">☰
                    <div className="profile"></div>
                </button>

            </div>
        </section>

        <HeaderFilter ref={ref} modalType={modalType} setModalType={setModalType} />
    </section>
}