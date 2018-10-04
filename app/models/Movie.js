const mongoose = require('mongoose');
const Actor = require('./Actor').schema;
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    releaseDate: {
        type: Date,
        required: false
    },
    actors: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'actor'
        }]
    }
}, {
    versionKey: false
});

const model = mongoose.model('movie', schema);

module.exports = {schema, model};