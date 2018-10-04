const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    }
}, {
        versionKey: false
    });

const model = mongoose.model('actor', schema);

module.exports = { schema, model };