import { httpService } from './http.service.js'

export const stayService = {
    query,
    getById,
    remove,
    save,
    addStayMsg,
    getEmptyStay,
    getDefaultFilter,
    getEmptyOrder,
    getLabels
}

const BASE_URL = 'stay/'

const amenityLabels = ['wifi', 'kitchen', 'washer', 'dryer', 'air conditioning', 'refrigerator','heating', 'dedicated workspace', 'TV', 'hair dryer', 'iron', 'pool', 'hot tub', 'free parking', 'ev charger', 'crib', 'king bed', 'gym', 'BBQ grill', 'breakfast', 'indoor fireplace', 'smoking allowed']
const filterLabels = ['iconic cities', 'new', 'off-the-grid', 'rooms', 'creative spaces', 'boats', 'grand pianos', 'vineyards', 'historical homes', 'mansions', 'lake', 'treehouses', 'farms', 'skiing', 'earth homes', 'countryside', 'amazing views', 'beach', 'desert', 'a-frames',
    'design', 'beachfront', 'caves', 'national parks', 'castles', 'lakefront', 'island', 'tropical', 'cabin', 'camper', 'camping', 'tiny homes', 'surfing', 'bed & breakfasts']

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(stayId) {
    return httpService.get(BASE_URL + stayId)
}

function getLabels(stay) {
    return stay.labels
}

function remove(stayId) {
    return httpService.delete(BASE_URL + stayId)
}

function save(stay) {
    if (stay._id) return httpService.put(BASE_URL, stay)
    else return httpService.post(BASE_URL, stay)
}

function addStayMsg(stay, msg) {
    return httpService.post(BASE_URL + stay._id + '/msg', { txt: msg.txt })
}

function getEmptyStay() {
    return {              // add _id on save
        name: '',
        type: '',
        price: 0,
        capacity: 8,
        imgUrls: [],
        summary: '',
        amenities: [],
        labels: [],
        host: {},
        loc: {
            country: '',
            countryCode: '',
            city: '',
            address: '',
            lat: 0,
            lng: 0
        },
        reviews: [],
        likedByUsers: []
    }
}

function getDefaultFilter() {
    return {
        loc: {
            country: '',
            countryCode: '',
            city: '',
            address: '',
            lat: 0,
            lng: 0
        },
        availability: [],            // dates
        guestCount: '',                // number of guests
        labels: [],
        placeType: 'any type',       // any type / room / entire home
        priceRange: {
            min: 0,
            max: Infinity
        },
        BBB: {
            Bedrooms: 'any',
            Beds: 'any',
            Bathrooms: 'any'
        },
        propType: [],                // house / apartment / guesthouse / hotel
        amenities: [],
        bookingOpts: {
            instant: false,
            selfCheckIn: false,
            allowsPets: false
        }
    }
}

function getEmptyOrder() {
    return {              // add _id on save
        hostId: '',
        buyer: {
            _id: '',
            fullName: ''
        },
        totalPrice: 0,
        entryDate: '',
        exitDate: '',
        guests: {
            adults: 0,
            children: 0,
            infants: 0,
            pets: 0
        },
        stay: {
            _id: '',
            name: '',
            price: 0
        },
        msgs: [],
        status: "pending"           // approved / rejected
    }
}