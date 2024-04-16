
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { orders } from '../data/orders.js'
import { httpService } from './http.service.js'

const BASE_URL = 'order/'

export const orderService = {
    query,
    getById,
    getHostOrdersById,
    getUserOrdersById,
    filterUserOrders,
    save,
    remove,
    getOrder,
    createDemoOrder
}

async function query() {
    try {
        let orders = await httpService.get(BASE_URL)
        return orders
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const order = await httpService.get(BASE_URL + orderId)
        return order
    } catch (err) {
        console.log(err)
    }
}

async function getHostOrdersById(userId) {
    try {
        let orders = await query()
        orders = orders.filter(order => order.hostId === userId)
        return orders
    } catch (err) {
        console.log(err)
    }
}

async function getUserOrdersById(userId) {
    try {
        let orders = await query()
        orders = orders.filter(order => order.buyer._id === userId)
        return orders
    } catch (err) {
        console.log(err)
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

async function remove(orderId) {
    try {
        await httpService.delete(BASE_URL + orderId)
    } catch (err) {
        console.log(err)
    }
}

async function save(order, user) {
    try {
        if (order._id) {
            const updatedOrder = await httpService.put(BASE_URL, order)
            return updatedOrder
        } else {
            order._id = utilService.makeId()
            const orderToAdd = await await httpService.post(BASE_URL, order)
            return orderToAdd
        }
    } catch (err) {
        console.log(err)
    }
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

function createDemoOrder() {
    if (utilService.loadFromStorage(ORDER_DB)) return utilService.loadFromStorage(ORDER_DB)
    return utilService.saveToStorage(ORDER_DB, orders)
}
