export const UPDATE_RESERVATION = 'UPDATE_RESERVATION'

// DEMO DATA FOR NOW
const checkout = new Date()
const checkIn = new Date(checkout)
checkIn.setDate(new Date(checkIn.getDate() - 1))

const initialState = {
    reservation: {
        checkIn: checkIn,
        checkout: checkout,
        guests: {adults: 1, children: 0, infants: 0, pets: 0, sum: 1},
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
