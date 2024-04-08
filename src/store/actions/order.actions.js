import { SET_ORDERS, ADD_ORDER, REMOVE_ORDER, UPDATE_ORDER} from '../reducers/order.reducer'
import { orderService } from '../../services/order.local.service'

export async function addOrder(order) {
    try {
        const addedOrder = await orderService.save(order)
        store.dispatch( {ADD_ORDER, order: addedOrder})
    } catch (err) {
        console.log(err)
    }  
}

export async function loadOrders() {
    try {
        const orders = await orderService.query()
        store.dispatch( { SET_ORDERS, orders })
    } catch(err) {
        console.log(err)
    }
}

export async function removeOrder(orderId) {
    try {
        await orderService.remove(orderId)
        store.dispatch({ type: REMOVE_ORDER, orderId })
    } catch (err) {
        console.log('order action -> Cannot remove order', err)
        throw err
    }
}

export async function updateOrder(order) {
    try {
        await orderService.save(order)
        store.dispatch({ type: UPDATE_ORDER, order })
    } catch(err) {
        console.log(err)
    }
}