import { format, getDate, getDay, getYear } from "date-fns"

export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    animateCSS,
    debounce,
    generateStay,
    generateStaysArray,
    calcSumToPay,
    timestampToDate,
    calcSumOfDays
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

// In our utilService
function animateCSS(el, animation) {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`

        el.classList.add(`${prefix}animated`, animationName)

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }
        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

function generateStay() {
    let currentDate = new Date()

    let minDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)

    let maxDate = new Date(currentDate.getTime() + 6 * 30 * 24 * 60 * 60 * 1000)

    let rangeInDays = (maxDate.getTime() - minDate.getTime()) / (24 * 60 * 60 * 1000)

    let randomDays = Math.floor(Math.random() * (rangeInDays + 1))

    let entryDate = new Date(minDate.getTime() + randomDays * 24 * 60 * 60 * 1000)

    let exitDate = new Date(entryDate.getTime() + 7 * 24 * 60 * 60 * 1000)

    entryDate.setUTCHours(0, 0, 0, 0)

    exitDate.setUTCHours(0, 0, 0, 0)

    return { entryDate: entryDate.getTime(), exitDate: exitDate.getTime() }
}

function generateStaysArray() {
    const staysArray = []
    for (let i = 0; i < 5; i++) {
        staysArray.push(generateStay())
    }

}

function calcSumToPay(reservation, stay) {
    let diff = reservation.checkout - reservation.checkIn
    diff = diff / (1000 * 60 * 60 * 24)
    return diff * stay.price
}

function timestampToDate(dateTimestamp) {
    const date = new Date(dateTimestamp);
    const dayOfDate = date.toLocaleString('en-US', { weekday: 'short' });
    const dateOfDate = date.getDate();
    const monthName = date.toLocaleString('en-US', { month: 'short' });
    const yearOfDate = date.getFullYear();
    let str = dayOfDate + ', ' + dateOfDate + ' ' + monthName + ' ' + yearOfDate;
    return str;
}

function calcSumOfDays(reservation) {
    const date1 = reservation.checkIn
    const date2 = reservation.checkout
    const differenceInMilliseconds = date2 - date1
    const differenceInDays = Math.ceil(differenceInMilliseconds / (24 * 60 * 60 * 1000))
    return differenceInDays
}