const express = require('express');
const router = express.Router();
const Artist = require('../models/artist');

router.get('/', async (req,res) => {
    var artists = [];
    try {
        artists = await Artist.find({}).sort({name : 1});
    } catch {
        artists = []
    }
    res.render('artists/artist.ejs', {artists:artists});
});

router.get('/new', (req,res) => {
    res.render('artists/new')
});

router.get('/:id', async (req,res) => {
    try {
        var artist = await Artist.find({ _id : req.params.id });
        console.log("Viewed artist : " + artist[0].name);
        res.render('artists/view', {
            artist : artist
        });
    } catch {
        res.render('artists/view', {
            errorMsg : "Failed to view artist ID : " + req.params.id
        });
    }
});

router.get('/edit/:id', async (req,res) => {
    var artist = [];
    try {
        artist = await Artist.find({ _id: req.params.id });
        res.render('artists/edit', {
            artist : artist
        });
    } catch {
        res.render('artists/artist', {
            errorMsg : 'Failed to edit artist'
        });
    }   
})

router.post('/', async (req,res) => {
    const artist = new Artist({
        name : req.body.name,
        label : req.body.label,
        no_of_albums : req.body.no_of_albums,
        solo : req.body.solo
    });
    try {
        await artist.save();
        res.redirect('/artists');
        console.log("New Artist Added !");
    } catch {
        res.render('artists/new', {
            artists : artist,
            errorMsg : 'Failed to create new artist'
        });
    }
});

router.post('/:id', async (req,res) =>{
    try {
        await Artist.updateOne({ _id : req.params.id }, {
            name : req.body.name,
            label : req.body.label,
            no_of_albums : req.body.no_of_albums
        });
        console.log("Updated entry for artist ID : "+req.params.id);
        res.redirect('/artists');
    } catch {
        res.render('artists/edit', {
            errorMsg : "Failed to update artist"
        });
    }
});

router.delete('/:id', async (req,res) => {
    var id = req.params.id;
    try {
        await Artist.findOneAndDelete({ _id : id});
        console.log('Deleted Artist with id : ' + id);
        var artists = await Artist.find({});
        res.render('artists/artist', {
            artists : artists
        });
    } catch {
        res.render('artists/artist', {
            errorMsg : 'Failed to remove artist'
        });
    }
});

module.exports = router;