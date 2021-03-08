const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    artist : {
        type : String,
        required : true
    },
    genre : {
        type : String, 
        required : true
    },
    no_of_songs : {
        type : Number,
        required : true
    },
    release_date : {
        type : Date,
        required : false
    },
    createdAt : {
        type : Date,
        required : true,
        default : Date.now
    }
});

module.exports = mongoose.model('Album', albumSchema);