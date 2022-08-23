const Product_Item = {
    id: '',
    name: '',// document name
    desc: '',
    price: '',
    mrp: '',
    delay: 'time',
    locations: [],
    category: '',
    availableAtTime: '',
    media: []
}

const cart = {
    items: [{
        type: 'cab|food|accessories',
        quantity: 0,
        id : Product_Item.id,
    }],
    user: '',
    coupon: '',
    location: '',
    trainDetails: {}
}

const order = {
    completed: true,
    razorpayId : '',
    cart: {},
    total: '',
    actualCost: ''
}


const trainDetails = {
    userId : '',
    "PnrNumber": "6719687062",
    "Status": "SUCCESS",
    "ResponseCode": "200",
    "TrainNumber": "13164",
    "TrainName": "HATE BAZARE EXP",
    "JourneyClass": "SL",
    "ChatPrepared": "YES",
    "From": "NIMITITA [NILE]",
    "To": "SEALDAH [SDAH]",
    "JourneyDate": "23-09-2018",
    "Passangers": [
        {
            "Passenger": "Passenger 1",
            "BookingStatus": "RLWL/-/16/GN",
            "CurrentStatus": "CNF/S6/71/GN"
        },
        {
            "Passenger": "Passenger 2",
            "BookingStatus": "RLWL/-/17/GN",
            "CurrentStatus": "CNF/S6/72/GN"
        }
    ]
}