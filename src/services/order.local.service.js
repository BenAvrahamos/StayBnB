
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { orders } from '../data/stay.js'
const ORDER_DB = 'order_db'

_createDemoStay(orders)

export const orderService = {
    query,
    getById,
    save,
    remove,
    getEmptyOrder,
}

utilService.generateStaysArray()

async function query() {
    try {
        let orders = await storageService.query(ORDER_DB)
        return orders
    }
    catch (err) { 
        console.log(err) 
    }
}

async function getById(orderId) {
    try {
        const order = await storageService.get(ORDER_DB, orderId)
        return order
    } catch (err) {
        console.log(err)
    }
}

async function remove(orderId) {
    try {
        await storageService.remove(ORDER_DB, orderId)
    } catch (err) {
        console.log(err)
    }
}

async function save(order) {
    try {
        if (order._id) {
            const updatedOrder = await storageService.put(ORDER_DB, order)
            return updatedOrder
        } else {
            order._id = utilService.makeId()
            const orderToAdd = await storageService.post(ORDER_DB, order)
            return orderToAdd
        }
    } catch (err) {
        console.log(err)
    }
}

function getEmptyOrder(stay) {
    return {
            hostId: stay.host._id,
            buyer: {
              _id: "u101",
              fullName: "User 1"
            }, // change afterwards to connected user
            totalPrice: '',
            entryDate: '',
            exitDate: '',
            guests: {
              adults: '',
              kids: '',
            },
            stay: {
              _id: stay._id,
              name: stay.name,
              price: stay.price
            },
            msgs: [],
            status: "approved" // approved / rejected change when there is a host and sockets
          }
}

function _createDemoStay(stays) {
    if (utilService.loadFromStorage(ORDER_DB)) return utilService.loadFromStorage(ORDER_DB)
    return utilService.saveToStorage(ORDER_DB, orders)
}