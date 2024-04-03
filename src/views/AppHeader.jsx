import { NavLink } from "react-router-dom";
import { HeaderFilter } from "./HeaderFilter";

export function AppHeader() {
    return <section className="app-header">

    
<section className="expanded-header">

        <div className="logo-section">
            <div className="logo">
                <img src="src\assets\img\airbnb-logo.png" alt="" />
                StayBnb
            </div>
        </div>

        <div className="nav-section">
            <nav className="nav">
                <NavLink to="/">Stays</NavLink>
                <NavLink to="/">Experiences</NavLink>
                <NavLink to="/">Online Experiences</NavLink>
            </nav>
        </div>


        <div className="user-section">
            Staybnb your home

            <button>☰
                <div className="profile"></div>
            </button>

        </div>
        </section>

        <HeaderFilter />

    </section>
}