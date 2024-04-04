export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'


const initialState = {
    user: userService.getLoggedInUser(),
    users: []
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_SCORE:
            return { ...state, user: { ...state.user, score: action.score } }
        default:
            return state
    }
}