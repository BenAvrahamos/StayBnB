import { userService } from "../services/user.service";
import { useState } from 'react'
export function UserDashboard() {
    const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedInUser())
    return (
        <div className="orders-dashboard flex column">
            <h2>My orders</h2>
            <div className="orders-container">

            </div>
        </div>
    )
}