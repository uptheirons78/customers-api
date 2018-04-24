const mongoose = require("mongoose");

const Customer = mongoose.model('Customer', {
    first_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },    
    last_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    country: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {Customer};