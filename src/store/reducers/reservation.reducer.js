export const UPDATE_RESERVATION = 'UPDATE_RESERVATION'

const initialState = {
    reservation: {
        checkIn: new Date(),
        checkout: newDate(),
        guests: 1,
        isClickedForBooking: false
    }
}

export function reservationReducer(state = initialState, action = {}) {
    switch (action.type) {
        case UPDATE_RESERVATION:
            return { ...state, reservation: action.reservation }
        default:
            return state
    }
} 
