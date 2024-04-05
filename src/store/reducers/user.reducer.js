export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'
export const ADD_STAY_TO_FAVORITES = 'ADD_STAY_TO_FAVORITES'
export const REMOVE_STAY_FROM_FAVORITES = 'REMOVE_STAY_FROM_FAVORITES'


const initialState = {
    user: 'user',
    users: [],
    userFavoriteStays: []
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
        
        //Favorite stays

        case ADD_STAY_TO_FAVORITES: 
        return { ...state, userFavoriteStays: [...state.userFavoriteStays, action.stay] } 

        case REMOVE_STAY_FROM_FAVORITES: 
        return { ...state, favoriteStays: state.userFavoriteStays.filter(stay => stay !== action.stayToRemove)}

        default:
            return state
    }
}