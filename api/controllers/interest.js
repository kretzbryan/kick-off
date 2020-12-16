const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const db = require('../models')

router.post('/', async ( req, res ) => {
    try {
        const newInterest = new db.Interest({
            tag : req.body.tag
        })
        const interest = await newInterest.save();
        res.json({interest});
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

router.get('/tag/:tag', async ( req, res ) => {
    try {
        let interest = await db.Interest.findOne({tag: req.params.tag});
        if (interest === {}) {
            const newInterest = new db.Interest({
            tag : req.body.tag
            })
            const interest = await newInterest.save();
            res.json(interest);
        }
        res.json(interest)
    } catch (err) {
        res.json(err)
    }
})

router.get('/:value', async ( req, res ) => {
    const search = new RegExp(req.params.value)
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


router.get('/:id', async ( req, res ) => {
    try {
        const tag = await db.Interest.findById(req.params.id);
        res.json(tag)
    } catch (err) {
        res.json(err)
    }
})


module.exports = router;