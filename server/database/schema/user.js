const mongoose = require('mongoose');
const { db } = require('../mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    password: {
        type: String,
    },
    previousTransactions: {
        type: [booking]
    }
})

module.exports = {
    User: db.model('User' , userSchema),
}