const mongoose = require('mongoose')
var MongoClient = require('mongodb').MongoClient

module.exports = function () {
    // mongoose.connect('mongodb+srv://mirsoonuzbsila001:afZ7bRKwEBmQnoPo@cluster0.g6pmv37.mongodb.net/cargo')
    mongoose.connect('mongodb://127.0.0.1:27017/cargo')
    .then(() => {
        console.log('Mongo ishladi');
    }).catch((err) => {
        console.log('Mongoda hatolik bor', err);
    })
    
}

