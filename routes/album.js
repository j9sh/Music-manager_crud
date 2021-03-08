const express = require('express');
const router = express.Router();
const Album = require('../models/album');

router.get('/', async (req,res) => {
    var albums = [];
    try {
        albums = await Album.find({}).sort({name : 'ascending'});
    } catch {
        albums = []
    }
    res.render('albums/album.ejs', {albums:albums});
});

router.get('/new', (req,res) => {
    res.render('albums/new');
});

router.get('/:id', async (req,res) => {
    try {
        var album = await Album.find({ _id : req.params.id });
        console.log("Viewed " + album[0].artist + "'s album : " + album[0].name);
        res.render("albums/view", {
            album : album
        });
    } catch {
        res.render("albums/view", {
            errorMsg : "Failed to view album id : " + req.params.id
        })
    }
})

router.get('/edit/:id', async (req,res) => {
    try {
        var album = await Album.find({ _id : req.params.id });
        res.render('albums/edit', {
            album : album
        });
    } catch {
        res.render('albums/album', {
            errorMsg:"Failed to update album"
        });
    }
});

router.post('/', async (req,res) => {
    const album = new Album({
        name : req.body.name,
        artist : req.body.artist,
        genre : req.body.genre,
        no_of_songs : req.body.no_of_songs,
        release_date : req.body.release_date
    });
    try {
        await album.save();
        res.redirect('/albums');
        console.log("New Album added !!");
    } catch {
        res.render('albums/new', {
            albums : album,
            errorMsg : "Failed to create new Album"
        });
    }
});

router.post('/:id', async (req,res) => {
    try {
        await Album.updateOne({ _id : req.params.id }, {
            name : req.body.name,
            artist : req.body.artist,
            genre : req.body.genre,
            no_of_songs : req.body.no_of_songs,
            release_date : req.body.release_date
        });
        console.log("Updated entry for Album ID : " + req.params.id);
        res.redirect('/albums');
    } catch {
        res.render('albums/edit', {
            errorMsg : "Failed to update album entry"
        });
    }
});

router.delete('/:id', async (req,res) => {
    const id = req.params.id;
    try {
        await Album.findOneAndDelete({ _id : id });
        console.log('Deleted album with id : ' + id);
        var albums = await Album.find({});
        res.render('albums/album', {
            albums : albums
        });
    } catch {
        res.render('albums/album', {
            errorMsg : 'Failed to delete album'
        });
    }
});

module.exports = router;