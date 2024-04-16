import { login, signup } from "../store/actions/user.actions"
import { userService } from "../services/user.service"
import { useNavigate } from "react-router"
import { useState } from "react"

export function LoginLogout() {
    const navigate = useNavigate()
    const [isSignup, setIsSignup] = useState(true)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    async function onSubmitLoginSignup(ev) {
        ev.preventDefault()
        try {
            const user = isSignup ? await signup(credentials) : await login(credentials)
            if (user) {
                console.log(user)
                navigate('/')
            }
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    function onChangeField(ev) {
        ev.stopPropagation()
        const { value, id } = ev.target
        setCredentials(prevCredentials => ({ ...prevCredentials, [id]: value }))
    }

    return <section className="login-signup">
        <h1>Before we start out journey together, please sign up</h1>
        <p>Already signed in? click <span onClick={() => setIsSignup(false)}>here</span> to login</p>
        <form onSubmit={(ev) => onSubmitLoginSignup(ev)}>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" value={credentials.username} onChange={(ev) => onChangeField(ev)} />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={credentials.password} onChange={(ev) => onChangeField(ev)} />
            {isSignup && <>
                <label htmlFor="fullname">Full name</label>
                <input id="fullname" type="text" value={credentials.fullname} onChange={(ev) => onChangeField(ev)} />
                <label htmlFor="about">About</label>
                <input id="about" type="text" value={credentials.about} onChange={(ev) => onChangeField(ev)} />
                <label htmlFor="location">Location</label>
                <input id="location" type="text" value={credentials.location} onChange={(ev) => onChangeField(ev)} />
                <label htmlFor="gender">Gender</label>
                <select id="gender" value={credentials.gender} onChange={(ev) => onChangeField(ev)}>
                    <option id="female" value="female">Female</option>
                    <option id="male" value="male">Male</option>
                    <option id="other" value="other">Other</option>
                </select>
            </>}
            <button>Submit</button>
        </form>
    </section>

}