const express = require('express');
const router = express.Router();
const Album = require('../models/album');
const Artist = require('../models/artist');

router.get('/', async (req,res) => {
    var albums = [], artists = [];
    try {
        albums = await Album.find({}).sort({createdAt : 'descending'}).limit(5);
        artists = await Artist.find({}).sort({createdAt : 'descending'}).limit(5);
    } catch {
        albums = [];
        artists = [];
    }
    res.render('index.ejs', {
        albums:albums,
        artists : artists
    });
});

module.exports = router;