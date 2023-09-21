const mongoose = require('mongoose')

// Mongoose Schema of my product called shoes
const shoeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const Shoe = mongoose.model('Shoe', shoeSchema);

module.exports = Shoe;