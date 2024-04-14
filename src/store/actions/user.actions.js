import { storageService } from '../../services/async-storage.service'
import { userService } from '../../services/user.local.service'
import { utilService } from '../../services/util.service'
import { ADD_STAY_TO_FAVORITES, SET_LOGGED_IN_USER, SET_USERS, REMOVE_STAY_FROM_FAVORITES, ADD_USER, LOGOUT } from "../reducers/user.reducer"
import { store } from "../store"

const LOGGEDINUSER_DB = 'loggedinuser_db'

export async function loadUsers() {
    try {
        const users = await userService.query(USER_DB)
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('stay action -> Cannot load stays', err)
        throw err
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch(SET_LOGGED_IN_USER, user)
    } catch (err) {
        console.log('err', err)
    }
}

export async function signup(userInfo) {
    try {
        const users = await userService.query()
        const isUser = users.find(user => user.username === userInfo.username)
        if (!isUser) {
            const userToLogIn = await userService.signup(userInfo)
            store.dispatch({ ADD_USER, user: userToLogIn })
            store.dispatch({ SET_LOGGED_IN_USER, user: userToLogIn })
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ LOGOUT })
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function addStayToUserFavorites(stayId) {
    try {
        if (userService.getLoggedInUser()) {
            userService.addStayToUserFavorites(stayId)
            store.dispatch({ ADD_STAY_TO_FAVORITES, stayId })
        }
    } catch (err) {
        console.log('stay action -> Cannot save stay', err)
        throw err
    }
}

export async function removeStayToUserFavorites(stayId) {
    try {
        if (userService.getLoggedInUser()) store.dispatch({ REMOVE_STAY_FROM_FAVORITES, stayId })
    } catch (err) {
        console.log('stay action -> Cannot save stay', err)
        throw err
    }
}
