const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    },
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }],
    dateReleased: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Song', songSchema);