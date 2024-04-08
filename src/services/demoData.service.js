import { utilService } from "./util.service"

export const DemoDataService = {
    getRandomAmenities: getRandomFilterLabels,
    randomStay,
    generateStay,
    generateStaysArray,

}




function getFilterLabels() {
    return ['new', 'off-the-grid', 'iconic_cities', 'rooms', 'creative_spaces', 'boats', 'grand_pianos', 'vineyards', 'historical_homes', 'mansions', 'lake', 'bed_&_breakfasts', 'treehouses', 'farms', 'skiing', 'earth_homes', 'countryside', 'amazing_views', 'beach', 'desert', 'a-frames',
        'design', 'beachfront', 'caves', 'national_parks', 'castles', 'lakefront', 'islands', 'trulli', 'tropical', 'cabins', 'campers', 'camping', 'arctic', 'tiny_homes', 'surfing', 'barns', 'cycladic_homes', 'hanoks', 'ryokans', 'domes', 'shepard_huts', 'yurts', 'minsus', 'casas_particulares']
}

function getAmenities() {
    return [
        "Air conditioning",
        "Portable air conditioning unit",
        "Pets are welcome",
        "Allows pets on property",
        "Allows pets as host",
        "Bathtub",
        "Cable TV",
        "Satellite TV",
        "Cribs available",
        "Tumble dryer",
        "Washer dryer",
        "Dryer",
        "Braille elevator",
        "Elevator",
        "Free parking",
        "Free parking with garage",
        "Gym in the building",
        "Residence gym",
        "Hair dryer",
        "Central heating",
        "Floor heating",
        "Baby high chair",
        "Computer with free ASDL internet access",
        "Internet (computer supplied)",
        "Free cable internet",
        "Wireless internet",
        "Iron",
        "Ironing board on request",
        "Hot tub",
        "Hot tub (private)",
        "Hot tub (common)",
        "Jacuzzi bath with shower",
        "Kitchen",
        "Kitchen in the living/dining room",
        "Modern kitchen",
        "Kitchenette",
        "Bedroom/living room with kitchen corner",
        "Cooking hob",
        "Desk with lamp",
        "Laptop workspace",
        "Outlet adapters",
        "Swimming pool",
        "Spa pool",
        "Heated pool",
        "Indoor pool",
        "Outdoor pool",
        "Communal pool",
        "Private pool",
        "Shared swimming pool",
        "Separate entry",
        "TV",
        "TV (local channels only)",
        "Flat screen plasma TV",
        "Big screen TV",
        "LCD flat screen TV",
        "Widescreen TV",
        "Smart TV",
        "Washing machine with dryer",
        "Washing machine",
        "Smoking allowed",
        "Allows smoking on property",
        "Allows smoking as host",
        "Breakfast",
        "Fireplace",
        "Wood burning fireplace",
        "Smoke detectors",
        "Bed linen & towels",
        "Toiletries",
        "No children under 4",
        "No children under 12",
        "No children under 6",
        "Infants not allowed",
        "Children not allowed",
        "Family-friendly",
        "Allows children as host",
        "Allows infants as host",
        "Hanger",
        "Wheelchair access possible",
        "Ramp access to buildings",
        "Grab bars in bathroom",
        "Toilet paper",
        "Soap",
        "Beach chair",
        "Beach",
        "Baby listening device",
        "Babysitting/child services",
        "Children area",
        "Video game system",
        "On street parking",
        "Paid parking with garage",
        "Cleaning before checkout",
        "Baby bath",
        "Changing table",
        "Children's books and toys",
        "Electric vehicle charger",
        "Complimentary soap/shampoo/conditioner",
        "Extra pillows and blankets",
        "Ski in and out",
        "Window guards",
        "Accessible parking",
        "Wifi USB adapter",
        "Designated smoking area",
        "Parties allowed",
        "Shared kitchen, living room, and garden with another guest",
        "Shared bathroom",
        "Pets paid",
        "Grab bars in bathroom",
        "Free parking on the street",
        "Living room",
        "Security camera at entrance"
    ]


}


function getRandomFilterLabels(amount) {
    const filterLabels = []
    const allFilterLabels = getFilterLabels()

    for (let i = 0; i < amount; i++) {
        const randomIndex = Math.floor(Math.random() * allFilterLabels.length)
        filterLabels.push(allFilterLabels[randomIndex])
    }

    return filterLabels
}

function getRandomAmenities(amount) {
    const amenities = getAmenities();
    const selectedAmenities = [];

    for (let i = 0; i < amount; i++) {
        let amenityToAdd;
        const randomIndex = Math.floor(Math.random() * amenities.length);
        const randomAmenity = amenities[randomIndex];
        
        if (randomAmenity === "Pets are welcome" ||
            randomAmenity === "Allows pets on property" ||
            randomAmenity === "Allows pets as host") {
            // If the randomly selected amenity is related to pets,
            // check if any of the three exists in the selected amenities
            const petsAmenities = ["Pets are welcome", "Allows pets on property", "Allows pets as host"];
            let found = false;
            for (const amenity of selectedAmenities) {
                if (petsAmenities.includes(amenity)) {
                    found = true;
                    break;
                }
            }
            // If none of the pet-related amenities exist, add the random one
            if (!found) {
                amenityToAdd = randomAmenity;
            }
        } else {
            amenityToAdd = randomAmenity;
        }
        
        if (amenityToAdd) {
            selectedAmenities.push(amenityToAdd);
        }
    }

    return selectedAmenities;
}




function getRandomStayType() {
    const accommodationTypes = ['house', 'apartment', 'hotel', 'guesthouse'];
    const randomIndex = Math.floor(Math.random() * accommodationTypes.length);
    return accommodationTypes[randomIndex];
}

function getRandomPrice() {
    const minPrice = 50.00;
    const maxPrice = 200.00;
    return (Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2);
}

function getRandomSummary() {
    const adjectives = ['Fantastic', 'Lovely', 'Charming', 'Cozy', 'Beautiful', 'Stunning', 'Quaint', 'Modern', 'Rustic', 'Luxurious'];
    const types = ['duplex', 'penthouse', 'studio', 'apartment', 'house', 'cottage', 'villa', 'chalet', 'cabin', 'loft'];
    const locations = ['mountain', 'beach', 'city', 'countryside', 'lake', 'island', 'forest', 'river', 'desert', 'coast'];
    const propertyTypes = ['house', 'apartment', 'hotel', 'guesthouse'];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomPropertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];

    return `${randomAdjective} ${randomType} ${randomLocation} ${randomPropertyType}`;
}
function createRoom() {
    const roomName = Math.random() < 0.5 ? 'Living Room' : 'Bedroom';
    const bedTypes = ['couch', 'double bed', 'sofa bed', 'single bed', 'king size bed'];
    const numBeds = Math.floor(Math.random() * 3) + 1; // Random number of beds from 1 to 3
    const beds = Array.from({ length: numBeds }, () => bedTypes[Math.floor(Math.random() * bedTypes.length)]);

    return { name: roomName, beds };
}

function createRooms(numPeople) {
    const rooms = [];

    // Determine the number of rooms needed based on the number of people
    const numRooms = Math.ceil(numPeople / 3); // Each room can accommodate up to 3 people

    // Create rooms until the total number of beds is enough to accommodate all people
    let totalBeds = 0;
    while (totalBeds < numPeople) {
        const room = createRoom();
        rooms.push(room);
        totalBeds += room.beds.length;
    }

    // If there are more beds than needed, remove excess beds
    while (totalBeds > numPeople) {
        const roomToRemoveFrom = rooms[Math.floor(Math.random() * rooms.length)];
        if (roomToRemoveFrom.beds.length > 1) {
            roomToRemoveFrom.beds.pop();
            totalBeds--;
        }
    }

    return rooms;

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
    const staysArray = [];
    for (let i = 0; i < 10; i++) {
        staysArray.push(generateStay());
    }
    return staysArray;
}



function randomStay() {
    return {
        _id: utilService.makeId(),
        type: getRandomStayType(),
        price: getRandomPrice(),
        summary: getRandomSummary(),
        capacity: utilService.getRandomIntInclusive(2, 16),
        bedrooms: [
            createRooms(10)
        ],
        booked: generateStaysArray(),
        baths: utilService.getRandomIntInclusive(1, 3),
        labels: getRandomFilterLabels(3),
        amenities: getRandomAmenities(10),
    }
}



