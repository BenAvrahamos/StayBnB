import { httpService } from './http.service.js'

export const stayService = {
    query,
    getById,
    remove,
    save,
    addStayMsg,
    getNumberOfNights,
    getFilterFromParams,
    getEmptyStay,
    getDefaultFilter,
    getEmptyOrder,
    getLabels
}

const BASE_URL = 'stay/'

const amenityLabels = ['wifi', 'kitchen', 'washer', 'dryer', 'air_conditioning', 'refrigerator', 'heating', 'dedicated_workspace', 'TV', 'hair_dryer', 'iron', 'pool', 'hot_tub', 'free_parking', 'ev_charger', 'crib', 'king_bed', 'gym', 'BBQ_grill', 'breakfast', 'indoor_fireplace', 'smoking_allowed']
const filterLabels = ['iconic_cities', 'new', 'off-the-grid', 'rooms', 'creative_spaces', 'boats', 'grand_pianos', 'vineyards', 'historical_homes', 'mansions', 'lake', 'bed_&_breakfasts', 'treehouses', 'farms', 'skiing', 'earth_homes', 'countryside', 'amazing_views', 'beach', 'desert', 'a-frames',
    'design', 'beachfront', 'caves', 'national_parks', 'castles', 'lakefront', 'islands', 'trulli', 'tropical', 'cabins', 'campers', 'camping', 'arctic', 'tiny_homes', 'surfing', 'barns', 'cycladic_homes', 'hanoks', 'ryokans', 'domes', 'shepard_huts', 'yurts', 'minsus', 'casas_particulares']

function query(filterBy = getDefaultFilter()) {
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

function getNumberOfNights({ entryDate, exitDate }) {
    const entryTimestamp = new Date(entryDate).getTime()
    const exitTimestamp = new Date(exitDate).getTime()

    const difference = exitTimestamp - entryTimestamp
    const stayLength = Math.ceil(difference / 1000 * 60 * 60 * 24)
    return stayLength
}

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    return {
        loc: searchParams.get('loc') || defaultFilter.loc,
        entryDate: searchParams.get('entryDate') || defaultFilter.entryDate,
        exitDate: searchParams.get('exitDate') || defaultFilter.exitDate,
        guestCount: searchParams.get('guestCount') || defaultFilter.guestCount,
        labels: searchParams.get('labels') || defaultFilter.labels,
        placeType: searchParams.get('placeType') || defaultFilter.placeType,
        priceRange: searchParams.get('priceRange') || defaultFilter.priceRange,
        BBB: searchParams.get('BBB') || defaultFilter.BBB,
        propType: searchParams.get('propType') || defaultFilter.propType,
        amenities: searchParams.get('amenities') || defaultFilter.amenities,
        bookingOpts: searchParams.get('bookingOpts') || defaultFilter.bookingOpts,
    }
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
            city: ''
        },
        entryDate: '',
        exitDate: '',
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