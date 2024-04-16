import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { stays } from '../data/stay.js'
import { httpService } from './http.service.js'
const BASE_URL = 'order/'

export const orderService = {
    query,
    getById,
    getUserOrdersById,
    filterUserOrders,
    save,
    remove,
    getOrder,
}

function query() {
    return httpService.get(BASE_URL)
}

function getById(orderId) {
    return httpService.get(BASE_URL + orderId)
}

function remove(orderId) {
    return httpService.delete(BASE_URL + orderId)
}

function save(order) {
    if (order._id) return httpService.put(BASE_URL, order)
    else return httpService.post(BASE_URL, order)
}

async function getUserOrdersById(userId) {
    try {
        const orders = await httpService.get(BASE_URL + 'user/' + userId)
        const filteredOrders = orders.filter(order => order.buyer._id === userId)
        return filteredOrders
    } catch (err) {
        console.log(err)
        throw err
    }
}

function filterUserOrders(userOrders, filter) {
    if (filter.tense !== 'all') {
        const today = new Date().getTime()
        if (filter.tense === 'future') userOrders = userOrders.filter(order => order.exitDate >= today)
        else if (filter.tense === 'current') userOrders = userOrders.filter(order => order.entryDate <= today && order.exitDate >= today)
        else if (filter.tense === 'past') userOrders = userOrders.filter(order => order.exitDate <= today)
    }
    if (filter.status !== 'all') {
        userOrders = userOrders.filter(order => order.status === filter.status)
    }
    return userOrders.sort((a, b) => a.entryDate - b.entryDate)
}

async function getOrder(stay, loggedInUser, params) {
    try {
        return {
            hostId: stay.host.id,
            buyer: {
                _id: loggedInUser._id || '0000000',
                fullname: loggedInUser.fullname || 'Guest'
            },
            totalPrice: utilService.calcSumToPay(params, stay),
    
            entryDate: params.entryDate,
            exitDate: params.exitDate,
            guests: {
                adults: +params.adults || 0,
                children: +params.children || 0,
                infants: +params.infants || 0,
                pets: +params.pets || 0
            },
            stay: {
                _id: stay._id,
                name: stay.name,
                price: stay.price,
                location: {
                    address: stay.loc.address,
                    city : stay.loc.city,
                    country:stay.loc.country
                },
                img: stay.imgUrls[0]
            },
            msgs: [],
            status: "pending"
        }
    } catch (err) {
        console.log('err', err)
        throw err
    }
}

