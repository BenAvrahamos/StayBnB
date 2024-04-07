
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { stays } from '../data/stay.js'
const STAY_DB = 'stay_db'

_createDemoStay(stays)

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
    getDefaultHeaderFilter
}

utilService.generateStaysArray()

async function query(filterBy, headerFilterBy) {

    filterBy = { ...filterBy, ...headerFilterBy }



    try {

        let stayArr = await storageService.query(STAY_DB)





        if (filterBy.loc.region) {

            stayArr = stayArr.filter(stay => stay.loc.region === filterBy.loc.region)
        }

        if (filterBy.loc.country) {

            stayArr = stayArr.filter(stay => stay.loc.country === filterBy.loc.country)
        }

        if (filterBy.loc.countryCode) {

            stayArr = stayArr.filter(stay => stay.loc.countryCode === filterBy.loc.countryCode)
        }

        if (filterBy.loc.city) {

            stayArr = stayArr.filter(stay => stay.loc.city === filterBy.loc.city)
        }


        if (filterBy.loc.address) {

            stayArr = stayArr.filter(stay => stay.loc.address === filterBy.loc.address)
        }



        if (filterBy.entryDate) {

            stayArr = stayArr.filter(stay => {
                return !stay.booked.some(booking => {


                    return (

                        (booking.entryDate >= filterBy.entryDate && booking.entryDate <= filterBy.exitDate) ||
                        (booking.exitDate >= filterBy.entryDate && booking.exitDate <= filterBy.exitDate) ||
                        (booking.entryDate <= filterBy.entryDate && booking.exitDate >= filterBy.exitDate)
                    )
                })
            })
        }



        if (filterBy.guestCount) {

            if (filterBy.guestCount.adults || filterBy.guestCount.children) {

                const filterCapacity = filterBy.guestCount.adults + filterBy.guestCount.children


                stayArr = stayArr.filter(stay => stay.capacity >= filterCapacity)
            }


            if (filterBy.guestCount.infants) {


                stayArr = stayArr.filter(stay => stay.amenities.includes('crib'))
            }

            if (filterBy.guestCount.pets) {

                stayArr = stayArr.filter(stay => stay.amenities.includes('pets_allowed'))
            }
        }

        // if (filterBy.labels) {

        //     stayArr = stayArr.filter(stay => stay.labels.includes(filterBy.labels))

        // }

        if (filterBy.amenities.length) {

            stayArr = stayArr.filter(stay => filterBy.amenities.every(amenity => stay.amenities.includes(amenity)))

        }

        if (filterBy.placeType !== 'any type') {

            stayArr = stayArr.filter(stay => stay.type === filterBy.placeType)

        }

        // if (filterBy.priceRange) {
        //     stayArr = stayArr.filter(stay => stay.price >= filterBy.priceRange.min && stay.price <= filterBy.priceRange.max)

        // }



        // if (filterBy.bbb.bedrooms !== 'any') {
        //     stayArr = stayArr.filter(stay => stay.bedrooms.length >= filterBy.BBB.Bedrooms)
        // }

        // if (filterBy.bbb.beds !== 'any') {
        //     stayArr = stayArr.filter(stay =>
        //         stay.bedrooms.reduce((acc, room) => acc + room.beds.length, 0) >= filterBy.BBB.Beds
        //     )
        // }

        // if (filterBy.bbb.bathrooms !== 'any') {
        //     stayArr = stayArr.filter(stay => stay.baths >= filterBy.BBB.Bathrooms)
        // }




        if (filterBy.propType.length) {
            stayArr = stayArr.filter(stay => filterBy.propType.includes(stay.propType))
        }

        // console.log(stayArr);

        return stayArr
    } catch (err) {
        console.log(err)
    }
}

async function getById(stayId) {
    try {
        const stay = await storageService.get(STAY_DB, stayId)
        return stay
    } catch (err) {
        console.log(err)
    }
}

async function remove(stayId) {
    try {
        await storageService.remove(STAY_DB, stayId)
    } catch (err) {
        console.log(err)
    }
}

async function save(stay) {
    try {
        if (stay._id) {
            const updatedStay = await storageService.put(STAY_DB, stay)
            return updatedStay
        } else {
            const stayToAdd = await storageService.post(STAY_DB, stay)
            return stayToAdd
        }
    } catch (err) {
        console.log(err)
    }
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
            region: '',
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
        labels: [],
        placeType: 'any type',       // any type / room / entire home
        priceRange: {
            min: 0,
            max: Infinity
        },
        bbb: {
            bedrooms: 'any',
            beds: 'any',
            bathrooms: 'any'
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

function getDefaultHeaderFilter() {
    return {
        loc: {
        },
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

function _createDemoStay(stays) {
    if (utilService.loadFromStorage(STAY_DB)) return utilService.loadFromStorage(STAY_DB)
    else return utilService.saveToStorage(STAY_DB, stays)
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))
