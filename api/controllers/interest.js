const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const db = require('../models')

router.post('/', auth, async ( req, res ) => {
    try {
        const newInterest = new db.Interest({
            tag : req.body,tag
        })
        await newInterest.save();
        res.json(newInterest);
    } catch (err) {
        res.json(err)
    }
})

router.get('/:search', async ( req, res ) => {
    try {
        
    } catch (err) {
        
    }
})

module.exports = router;