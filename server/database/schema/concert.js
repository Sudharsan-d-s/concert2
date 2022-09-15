const mongoose = require('mongoose');

const { db } = require('../mongoose');

const performerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    picture: {
        type: String,
    }
})

const seatSchema = new mongoose.Schema({
    row: {
        type: Number,
    },
    col: {
        type: Number,
    },
    status: {
        type: String,
    }
})


const conscertSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    genre: {
        type: String,
    },
    city: {
        type: String,
    },
    venue: {
        type: String,
    },
    date: {
        type: Date,
    },
    month: {
        type: String,
    },
    poster1: {
        type: String,
    },
    poster2: {
        type: String
    },
    seatLayout: {
        type: [[seatSchema]]
    },
    performers: {
        type: [performerSchema],
    },
    likes: {
        type: Number,
    }
})



module.exports = { 
    Performer: db.model('Performer' , performerSchema),
    Seat : db.model('Seat' , seatSchema),
    Concert : db.model('Concert' , conscertSchema),
}