const { db } = require('../database/mongoose');
const { Concert, Performer, Row, Seat } = require('../database/schema/concert');

async function filterByMonth(key){
    const data = await Concert.find({month: key});
    return data;
}

async function filterByGenre(key){
    const data = await Concert.find({genre: key});
    return data;
}

async function filterByCity(key){
    const data = await Concert.find({city: key});
    return data;
}

module.exports = {
    filterByMonth,
    filterByCity,
    filterByGenre
}