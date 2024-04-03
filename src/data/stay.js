export const stays = [{
  _id: "s101",
  name: "A House",
  type: "House",
  imgUrls: ["https://e26e9b.jpg", "otherImg.jpg"],
  price: 80.00,
  summary: "Fantastic duplex apartment...",
  capacity: 8,
  bedrooms: [
    {
      name: 'Living Room',
      beds: ['couch']
    },
    {
      name: 'Bedroom 1',
      beds: ['double bed', 'double bed', 'sofa bed']
    }
  ],
  baths: 2,
  amenities: ['Heating', 'Tv', 'Iron', 'Pool', 'Free parking',
    'Crib', 'Gym', 'Breakfast', 'Smoking allowed', 'Hot tub', 'Ev charger', 'King bed', 'BBQ grill',
    'Indoor fireplace', 'Beachfront', 'Ski-on/Ski-out', 'Waterfront',
    'Smoke alarm'],
  labels: [
    "Top of the world",
    "Trending"
  ],
  host: {
    _id: "u101",
    fullName: "User 1",
    imgUrl: "/img/img1.jpg",
    userName: "user1",
    password: "secret"
  },
  loc: {
    country: "Portugal",
    countryCode: "PT",
    city: "Lisbon",
    address: "17 Kombo st",
    lat: -8.61308,
    lng: 41.1413
  },
  reviews: [],
  likedByUsers: []
},
{
  _id: "s102",
  name: "Bed and breakfast",
  type: "House",
  imgUrls: ["https://e26e9b.jpg", "otherImg.jpg"],
  price: 90.00,
  summary: "Fantastic duplex apartment...",
  capacity: 8,
  bedrooms: [
    {
      name: 'Living Room',
      beds: ['couch']
    },
    {
      name: 'Bedroom 1',
      beds: ['double bed', 'double bed', 'sofa bed']
    },
    {
      name: 'Bedroom 2',
      beds: ['single bed', 'sofa bed', 'king size bed']
    }
  ],
  baths: 2,
  amenities: [
    'Tv', 'Iron', 'Pool', 'Free parking',
    'Crib', 'Gym', 'Breakfast', 'Smoking allowed', 'Hot tub', 'Ev charger', 'King bed', 'BBQ grill',
    'Indoor fireplace', 'Beachfront', 'Ski-on/Ski-out', 'Waterfront',
    'Smoke alarm', 'Carbon monoxide alarm'],
  labels: [
    "Play",
    "Tropical"
  ],
  host: {
    _id: "u101",
    fullName: "User 1",
    imgUrl: "/img/img1.jpg",
    userName: "user1",
    password: "secret"
  },
  loc: {
    country: "Portugal",
    countryCode: "PT",
    city: "Lisbon",
    address: "17 Kombo st",
    lat: -8.61308,
    lng: 41.1413
  },
  reviews: [],
  likedByUsers: []
},
{
  _id: "s103",
  name: "Cabana",
  type: "House",
  imgUrls: ["https://e26e9b.jpg", "otherImg.jpg"],
  price: 80.00,
  summary: "Fantastic duplex apartment...",
  capacity: 8,
  bedrooms: {
    count: 2,

  }
  beds: 2,
  baths: 2,
  amenities: [
    'Wifi', 'Washer', 'Air conditioning', 'Dedicated workspace', 'Hair dryer',
    'Kitchen', 'Dryer', 'Heating', 'Tv', 'Iron', 'Pool', 'Free parking',
    'Crib', 'Gym', 'Breakfast', 'Smoking allowed'
  ],
  labels: [
    "Top of the world",
    "Trending",
    "Tropical"
  ],
  host: {
    _id: "u101",
    fullName: "User 1",
    imgUrl: "/img/img1.jpg",
    userName: "user1",
    password: "secret"
  },
  loc: {
    country: "Portugal",
    countryCode: "PT",
    city: "Lisbon",
    address: "17 Kombo st",
    lat: -8.61308,
    lng: 41.1413
  },
  reviews: [],
  likedByUsers: []
}]


export const orders = [
  {
    _id: "o1225",
    hostId: "u102",
    buyer: {
      _id: "u101",
      fullName: "User 1"
    },
    totalPrice: 160,
    entryDate: "15-10-2025",
    exitDate: "17-10-2025",
    guests: {
      adults: 1,
      kids: 2
    },
    stay: {
      _id: "h102",
      name: "House Of Uncle My",
      price: 80.00
    },
    msgs: [],
    status: "pending" // approved / rejected
  }
]

export const users = [
  {
    _id: "u101",
    fullName: "User 1",
    imgUrl: "/img/img1.jpg",
    userName: "user1",
    password: "secret"
  },
  {
    _id: "u102",
    fullName: "User 2",
    imgUrl: "/img/img2.jpg",
    username: "user2",
    password: "secret",
  }
]

export const amenities = ['Wifi', 'Washer', 'Air conditioning', 'Dedicated workspace', 'Hair dryer',
  'Kitchen', 'Dryer', 'Heating', 'Tv', 'Iron', 'Pool', 'Free parking',
  'Crib', 'Gym', 'Breakfast', 'Smoking allowed', 'Hot tub', 'Ev charger', 'King bed', 'BBQ grill',
  'Indoor fireplace', 'Beachfront', 'Ski-on/Ski-out', 'Waterfront',
  'Smoke alarm', 'Carbon monoxide alarm']
// Homepage: TOP categories: Best Rate / Houses / Kitchen  - show all - link to Explore
// Renders a <StayList> with <StayPreview> with Link to <StayDetails>   url: /stay/123
// See More => /explore?topRate=true
// See More => /explore?type=House
// See More => /explore?amenities=Kitchen
// Explore page:
// stayService.query({type: 'House'})

// UserDetails
//  basic info
//  visitedStays => orderService.query({userId: 'u101'})
//  myStayOrders => orderService.query({hostId: 'u101'})
//  ownedStays => stayService.query({hostId: 'u103'})

// StayEdit - make it super easy to add Stay for development
// StayList, StayPreview
// Order, confirm Order
// Lastly: StayExplore, Filtering



// Example - figuring up if the user is an owner:
// userService.login()
//  const userStays = stayService.query({ownerId: loggeinUser._id})
//  loggeinUser.isOwner = userStays.length > 0
