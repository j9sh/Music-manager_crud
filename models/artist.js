const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema ({
    name : {
        type : String,
        required : true
    },
    label : {
        type : String,
        required : false
    },
    no_of_albums : {
        type : Number,
        required : true
    },
    solo : {
        type : String,
        required : false
    },
    createdAt : {
        type : Date,
        required : true,
        default : Date.now
    }
});

module.exports = mongoose.model('Artist', artistSchema);