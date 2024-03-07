const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    genres: {
        type: [String],
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model('Artist', artistSchema);