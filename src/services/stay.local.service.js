
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { stays } from '../data/stay.js'
const STAY_DB = 'stay_db'

// createDemoStay(stays)

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
    createDemoStay,
    guestCountStringForReservation
}


async function query(filterBy) {
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
                stayArr = stayArr.filter(stay =>
                    stay.amenities.includes('pets allowed') ||
                    stay.amenities.includes('Pets are welcome') ||
                    stay.amenities.includes('Allows pets on property') ||
                    stay.amenities.includes('Allows pets as host')
                )
            }
        }

        // if (filterBy.label) {
        //     stayArr = stayArr.filter(stay => stay.labels.includes(filterBy.label))
        // }

        if (filterBy.amenities.length) {
            stayArr = stayArr.filter(stay => filterBy.amenities.every(amenity => stay.amenities.includes(amenity)))
        }

        // if (filterBy.placeType !== 'any') {
        //     console.log(stayArr[0].type);
        //     console.log(filterBy.placeType);
        //     stayArr = stayArr.filter(stay => stay.type === filterBy.placeType)
        // }



        // if (filterBy.priceRange) {
        //     stayArr = stayArr.filter(stay => stay.price >= filterBy.priceRange.min && stay.price <= filterBy.priceRange.max)
        // }

        if (filterBy.bedrooms !== 'any') {
            stayArr = stayArr.filter(stay => stay.bedrooms.length >= filterBy.bedrooms)
        }

        if (filterBy.beds !== 'any') {
            stayArr = stayArr.filter(stay => stay.bedrooms.reduce((acc, room) => acc + room.beds.length, 0) >= filterBy.beds)
        }

        if (filterBy.bathrooms !== 'any') {
            stayArr = stayArr.filter(stay => stay.baths >= filterBy.bathrooms)
        }

        if (filterBy.propType.length) {
            stayArr = stayArr.filter(stay => filterBy.propType.includes(stay.propType))
        }

        if (filterBy.hostLngs.length) {
            // stayArr = stayArr.filter(stay => filterBy.hostLngs.includes(stay.host.lng))
        }


        // stays = stays.map({_id, title, price, imgUrl}) => ({})

        return stayArr
    }

    catch (err) { console.log(err) }
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
        _id: utilService.makeId(10),
        type: '',
        previewImg: '',
        price: 0,
        imgUrls: [],
        summary: '',
        capacity: 0,
        bedrooms: [],
        booked: [],
        baths: 0,
        labels: [],
        amenities: [],
        host: {
            _id: '',
            fullName: '',
            imgUrl: '',
            userName: '',
            password: '',
            experience: {
                isSuper: false,
                hostingTime: 0
            }
        },
        loc: {
            region: '',
            country: '',
            countryCode: '',
            city: '',
            address: '',
            lat: 0,
            lng: 0
        },
        reviews: []
    };
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

function createDemoStay(stays) {
    if (utilService.loadFromStorage(STAY_DB)) return utilService.loadFromStorage(STAY_DB)
    else return utilService.saveToStorage(STAY_DB, stays)
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



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))
