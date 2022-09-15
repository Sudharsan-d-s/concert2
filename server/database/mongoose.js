const mongoose = require('mongoose');

const con = mongoose.createConnection('mongodb+srv://newUser:Cn9Brmbu8sYtEi7a@cluster0.6m0xwm9.mongodb.net/?retryWrites=true&w=majority')

const db = con.useDb('new');

// mongoose.connect('mongodb+srv://newUser:Cn9Brmbu8sYtEi7a@cluster0.6m0xwm9.mongodb.net/?retryWrites=true&w=majority').then(()=>console.log('connected'))

module.exports = { db }