const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
    storeBy: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = Item = mongoose.model('item',ItemSchema);