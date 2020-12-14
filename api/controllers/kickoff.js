const express = require('express');
const router =  express.Router();
const db = require('../models')

router.get('/', async (req, res) => {
    try {
        // const kickoffs = await db.Kickoff.find({});
        // res.json(kickoffs)
    } catch (err) {
        console.log(err)
    }
})


router.post('/', async ( req, res ) => {
    try {
        // const { title,  startTime, description, interests } = req.body
        // const newKickoff = new db.Kickoff({
        //     title,
        //     startTime,
        //     description,
        //     interests
        // // })
        // const user = await db.User.findById(req.params.id).select('-password')
        // await user.createdEvents.push(newKickoff)
        // const kickoff = await newKickoff.save();
        // res.json(kickoff)
    } catch (err) {
        console.log(err)
    }
})



router.get('/:id', async (req, res) => {
    try {
        // const kickoff = await db.Kickoff.findById(req.params.id);
        // res.json(kickoff)
    } catch (err) {
        console.log(err)
    }
})

router.put('/:id', async ( req, res ) => {
    try {
        // const updatedKickoff = await db.Kickoff.findByIdAndUpdate(req.params.id, req.body, { new: true })
        // res.json(updatedKickoff)
    } catch (err) {
        console.log(err)
    }
})


module.exports = router