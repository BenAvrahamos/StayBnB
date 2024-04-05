import { stayService } from "../../services/stay.local.service"

export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'

export const SET_FILTER = 'SET_FILTER'
export const SET_PAGE_IDX = 'SET_PAGE_IDX'

const initialState = {
    stays: [],
    filterBy: stayService.getDefaultFilter()
}



export function stayReducer(state = initialState, action = {}) {
    let stays
    let lastStays
    switch (action.type) {
        //Stays
        case SET_STAYS:
            lastStays = [...action.stays]
            return { ...state, stays: action.stays, lastStays }

        case REMOVE_STAY:
            lastStays = [...state.stays]
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            return { ...state, stays, lastStays }

        case ADD_STAY:
            stays = [...state.stays, action.stay]
            return { ...state, stays }

        case UPDATE_STAY:
            stays = state.stays.map(stay => stay._id === action.stay._id ? action.stay : stay)
            return { ...state, stays }

        //Filter
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }
        case SET_PAGE_IDX:
            return { ...state, filterBy: { ...state.filterBy, pageIdx: action.pageIdx } }

        default:
            return state
    }
}