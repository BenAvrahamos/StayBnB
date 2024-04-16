import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { userService } from '../../services/user.service'
import { login } from '../../store/actions/user.actions'

export function UserNavModal() {
    const [isLoggedInUser, checkIsLoggedInUser] = useState()

    async function onGuestClick() {
        try {
            const user = login({ username: 'guest', password: 'guest' })
            if (user) checkIsLoggedInUser(true)
        } catch (err) {
            console.log(err)
            throw err
        }
    }
    
    useEffect(() => {
        checkIsLoggedInUser(Boolean(userService.getLoggedInUser()))
    })

    return <section className="user-nav-modal" >
        {!isLoggedInUser && <NavLink to="/loginsignup" className="grayTxt">Login / Signup</NavLink>}
        {!isLoggedInUser && <NavLink to="/" onClick={() => onGuestClick()}>Continue as Guest</NavLink>}
        <NavLink to="/unActive" className='grayTxt'>Messages</NavLink>
        <NavLink to="/trips" className='grayTxt'>Trips</NavLink>
        <NavLink to="/wishlist" className='grayTxt'>Wishlist</NavLink>
        <NavLink to="/edit" className='grayTxt'>Airbnb your home</NavLink>
        <NavLink to="/dashboard" className='grayTxt'>Dashboard</NavLink>
        {isLoggedInUser && <NavLink to="/unActive" className='grayTxt'>Log out</NavLink>}
    </section>

}