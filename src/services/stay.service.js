import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'stay/'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getNumberOfNights,
    getFilterFromParams,
    getEmptyOrder,
    getEmptyStay,
    getDefaultFilter,
    getDefaultHeaderFilter,
    getEmptyModalFilter,
    mergeFiltersSP,
    mergeFiltersStore,
    guestCountString,
    createDemoData,
    guestCountStringForReservation
}

const amenityLabels = ['wifi', 'kitchen', 'washer', 'dryer', 'air_conditioning', 'refrigerator', 'heating', 'dedicated_workspace', 'TV', 'hair_dryer', 'iron', 'pool', 'hot_tub', 'free_parking', 'ev_charger', 'crib', 'king_bed', 'gym', 'BBQ_grill', 'breakfast', 'indoor_fireplace', 'smoking_allowed', 'pets_allowed']
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
    const difference = exitDate - entryDate

    const stayLength = Math.ceil(difference / (1000 * 60 * 60 * 24))
    return stayLength
}

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    return {
        loc: searchParams.get('loc') || defaultFilter.loc,
        entryDate: searchParams.get('entryDate') || defaultFilter.entryDate,
        exitDate: searchParams.get('exitDate') || defaultFilter.exitDate,
        guestCount: searchParams.get('guestCount') || defaultFilter.guestCount,
        label: searchParams.get('label') || defaultFilter.label,
        placeType: searchParams.get('placeType') || defaultFilter.placeType,
        priceRange: searchParams.get('priceRange') || defaultFilter.priceRange,
        bedrooms: searchParams.get('bedrooms') || defaultFilter.bedrooms,
        beds: searchParams.get('beds') || defaultFilter.beds,
        bathrooms: searchParams.get('bathrooms') || defaultFilter.bathrooms,
        propType: searchParams.get('propType') || defaultFilter.propType,
        amenities: searchParams.get('amenities') || defaultFilter.amenities,
        bookingOpts: searchParams.get('bookingOpts') || defaultFilter.bookingOpts,
        hostLngs: searchParams.get('hostLngs') || defaultFilter.hostLngs
    }
}

function getEmptyStay() {
    return {
        amenities: [],
        bathrooms: 0,
        baths: 0,
        bedrooms: [],
        bookedDates: [],
        capacity: 0,
        desc: "",
        host: {
            id: "",
            fullname: "",
            location: "",
            about: "",
            responseTime: "",
            experience : {isSuperhost: false}
           
        },
        imgUrls: [
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436496/ihozxprafjzuhil9qhh4.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg",
            "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg",
          ],
        isInstantBooking: false,
        labels: [],
        likedByUsers: [],
        loc: {
            country: "",
            countryCode: "",
            city: "",
            address: "",
            lng: 0,
        
        },
        name: "",
        placeType: "",
        price: 0,
        propertyType: "",
        reviews: [],
        roomType: "",
        sumOfBeds: 0,
        summary: "",
        _id: ""
    }
}

function getDefaultFilter() {
    return {
        loc: {
            // region : '',
            // country: '',
            // countryCode: '',
            // city: '',
            // address: '',
            // lat: 0,
            // lng: 0
        },
        entryDate: '',
        exitDate: '',            // dates
        guestCount: { adults: 0, children: 0, infants: 0, pets: 0 },                // number of guests
        label: '',
        placeType: 'any',       // any / room / entire home
        priceRange: {
            min: 0,
            max: Infinity
        },
        bedrooms: 'any',
        beds: 'any',
        bathrooms: 'any',
        propType: [],                // house / apartment / guesthouse / hotel
        amenities: [],
        bookingOpts: {
            instant: false,
            selfCheckIn: false,
            allowsPets: false
        },
        accessibility: [],
        hostLngs: []
    }
}

function getDefaultHeaderFilter() {
    return {
        loc: {},
        entryDate: '',
        exitDate: '',            // dates
        guestCount: { adults: 0, children: 0, infants: 0, pets: 0 },                // number of guests
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

function getEmptyModalFilter() {
    return {
        placeType: 'any',       // any / room / entire home
        priceRange: {
            min: 0,
            max: Infinity
        },
        bedrooms: 'any',
        beds: 'any',
        bathrooms: 'any',
        propType: [],                // house / apartment / guesthouse / hotel
        amenities: [],
        bookingOpts: {
            instant: false,
            selfCheckIn: false,
            allowsPets: false
        },
        accessibility: [],
        hostLngs: []
    }
}

function createDemoData(key, value) {
    if (utilService.loadFromStorage(key)) return utilService.loadFromStorage(key)
    else return utilService.saveToStorage(key, value)
}


function mergeFiltersSP(mainFilter, headerFilter) {
    const { label, amenities, bathrooms, beds, bookingOpts, hostLngs, bedrooms, placeType, priceRange, propType } = mainFilter
    const { loc, guestCount, entryDate, exitDate } = headerFilter
    const mergeFilter = {
        amenities, bathrooms, beds, ...bookingOpts, hostLngs, bedrooms, placeType, ...priceRange,
        propType, ...loc, label, ...guestCount, entryDate, exitDate
    }

    return mergeFilter
}

function mergeFiltersStore(mainFilter, headerFilter) {
    const { label, amenities, bathrooms, beds, bookingOpts, hostLngs, bedrooms, placeType, priceRange, propType } = mainFilter
    const { loc, guestCount, entryDate, exitDate } = headerFilter

    return { amenities, bathrooms, beds, bookingOpts, hostLngs, bedrooms, placeType, priceRange, propType, loc, label, guestCount, entryDate, exitDate }
}

function guestCountString(headerFilterBy) {
    const guestsCount = headerFilterBy.guestCount.adults + headerFilterBy.guestCount.children
    let guests = ''
    if (guestsCount > 0) {
        guests = guestsCount === 1 ? '1 guest' : `${guestsCount} guests`
    }



    const infants = headerFilterBy.guestCount.infants > 0 ? `${headerFilterBy.guestCount.infants} infants` : ''
    const pets = headerFilterBy.guestCount.pets > 0 ? `${headerFilterBy.guestCount.pets} pets` : ''

    const parts = [guests, infants, pets].filter(Boolean)

    if (parts.length === 0) {
        return "Add guests"
    }

    return parts.join(', ')
}


function guestCountStringForReservation(params) {
    const guestsCount = +params.adults + +params.children
    let guests = ''
    if (guestsCount > 0) {
        guests = guestsCount === 1 ? '1 guest' : `${guestsCount} guests`
    }


    const infants = params.infants > 0 ? `${params.infants} infants` : ''
    const pets = params.pets > 0 ? `${params.pets} pets` : ''

    const parts = [guests, infants, pets].filter(Boolean)

    if (parts.length === 0) {
        return "Add guests"
    }

    return parts.join(', ')
}
