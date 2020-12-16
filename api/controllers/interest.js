const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const db = require('../models')

router.post('/', auth, async ( req, res ) => {
    try {
        const newInterest = new db.Interest({
            tag : req.body.tag
        })
        const savedInterest = await newInterest.save();
        res.json(savedInterest);
    } catch (err) {
        res.json(err)
    }
})



router.get('/all', async ( req, res ) => {
    try {
        const tags = await db.Interest.find({});
        res.json(tags)
    } catch (err) {
        res.json(err)
    }
})

router.get('/:search', async ( req, res ) => {
    const search = new RegExp(req.params.search)
    try {
        const foundTags = await db.Interest.find({
            tag: {
                $regex: search
            }
        });
        res.json(foundTags)
    } catch (err) {
        res.json(err)
    }
})

module.exports = router;