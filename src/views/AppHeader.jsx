import { NavLink } from "react-router-dom";
import { HeaderFilter } from "./HeaderFilter";

export function AppHeader() {
    return <section className="app-header flex column center">


        <section className="expanded-header flex space-between align-center">

            <div className="logo-section">
                <div className="logo flex align-center">
                    <img src="src\assets\img\airbnb-logo.png" alt="" />
                    StayBnb
                </div>
            </div>

            <div className="nav-section flex justify-center">
                <nav className="nav flex space-between">
                    <NavLink to="/">Stays</NavLink>
                    <NavLink to="/" className='grayTxt'>Experiences</NavLink>
                    <NavLink to="/" className='grayTxt'>Online Experiences</NavLink>
                </nav>
            </div>


            <div className="user-section flex align-center">
                Staybnb your home

                <button className="flex align-center space-between">☰
                    <div className="profile"></div>
                </button>

            </div>
        </section>

        <HeaderFilter />

    </section>
}