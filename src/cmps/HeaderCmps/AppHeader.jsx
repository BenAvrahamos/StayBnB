import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useSearchParams, } from 'react-router-dom'
import { useState, useEffect, useRef } from "react"

import { HeaderFilter } from "./HeaderFilter"
import { DemoDataService } from "../../services/demoData.service"
import { stayService } from "../../services/stay.local.service"
import { setStayFilter, setStayHeaderFilter } from "../../store/actions/stay.actions"
import { UserNavModal } from "./UserNavModal"
import { useLocation } from 'react-router-dom';

export function AppHeader({ dynamicPageLayOut, SetDynamicPageLayOut }) {
    const ref = useRef(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    var filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [modalType, setModalType] = useState()

    console.log(modalType);

    function onNavigate() {
        navigate('/')
    }

    function goHome() {
        const defaultHeaderFilter = stayService.getDefaultHeaderFilter()
        const defaultMainFilter = stayService.getDefaultFilter()

        setStayHeaderFilter(defaultHeaderFilter)
        setStayFilter(defaultMainFilter)

        navigate('/')
    }

    function onOpenUserModal(ev) {
        ev.stopPropagation()
        setModalType(modalType === 'user-nav' ? null : 'user-nav')

    }

    const location = useLocation()
    const getHeaderSize = () => {
        const { pathname } = location
        if (pathname === '/' || pathname === '/trips') {
            return 'large' // Large header for the index
        } else {
            return 'small' // Small header for details & payment
        }
    }


    return <section className={`app-header-container header-${getHeaderSize()} flex column center 
    ${dynamicPageLayOut.header.fixed ? 'fixed-header' : ''}
    ${dynamicPageLayOut.header.expanded ? 'expanded' : ''}`}>
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

                <div className="compact-header">
                    <div onClick={() => { setModalType(modalType === 'map' ? null : 'map'); SetDynamicPageLayOut(false); }} className="map">Anywhere</div>
                    <div onClick={() => setModalType(modalType === 'check-in' ? null : 'check-in')} className="calendar">Any week</div>
                    <div onClick={() => setModalType(modalType === 'guest' ? null : 'guest')} className="guests">Add guests <div className="search-btn"></div> </div>
                </div>

            </div>



            <div className="user-section flex align-center" >
                Staybnb your home

                <button className="flex align-center space-between" onClick={onOpenUserModal}> ☰
                    <div className="profile"></div>
                </button>

            </div>
        </section>

        {modalType === 'user-nav' && <UserNavModal />}

        <HeaderFilter modalType={modalType} setModalType={setModalType} />
    </section>
}