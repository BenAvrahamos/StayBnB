
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { stay } from '../data/stay.js'
const STAY_DB = 'stay_db'

_createDemoStay()

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
    getEmptyStay,
    getDefaultFilter,
}

async function query() {
    const stayArr = await storageService.query(STAY_DB)
    return stayArr
}

async function getById(stayId) {
    const stay = await storageService.get(STORAGE_KEY, stayId)
    return stay
}

async function remove(stayId) {
    await storageService.remove(STORAGE_KEY, stayId)
}


async function save(stay) {
    if (stay._id) {
        const updatedStay = await storageService.put(STORAGE_KEY, stay)
        return updatedStay
    } else {
        const stayToAdd = await storageService.post(STORAGE_KEY, stay)
        return stayToAdd
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

function _createDemoStay() {
    utilService.saveToStorage(STAY_DB, stay)
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))
