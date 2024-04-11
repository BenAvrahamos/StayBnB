import { NavLink } from 'react-router-dom';

export function UserNavModal(){

    return <section className="user-nav-modal" >
           <NavLink to="/unActive" className='grayTxt'>Messages</NavLink>
           <NavLink to="/trips" className='grayTxt'>Trips</NavLink>
           <NavLink to="/wishlist" className='grayTxt'>Wishlist</NavLink>
           <NavLink to="/unActive" className='grayTxt'>Airbnb your home</NavLink>
           <NavLink to="/unActive" className='grayTxt'>Log out</NavLink>
    </section>

}