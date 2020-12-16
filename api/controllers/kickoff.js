const express = require('express');
const router =  express.Router();
const db = require('../models');
const auth = require('../middleware/authentication');


// Get All kickoffs
// This has been tested
router.get('/', async (req, res) => {
    try {
        const kickoffs = await db.Kickoff.find({});
        res.json(kickoffs)
    } catch (err) {
        console.log(err)
        res.json('An error occured')
    }
})

router.get('/related', auth,  async ( req, res ) => {
    try {
        const user = await db.User.findById(req.user)
        const related = await db.Kickoff.find({interests: {$in: user.interests}}).populate('interests');
        
        res.json(related)
    } catch (err) {
        console.log(err)
    }
})


// Create new kickoff
// This has been tested
router.post('/', auth, async ( req, res ) => {
    const { title, photo, startTime, description, interests, user, group } = req.body
    try {
        const newKickoff = new db.Kickoff({
            title,
            photo,
            startTime,
            user,
            group,
            description,
            interests
        })
        const foundUser = await db.User.findById(req.user).select('-password')
        await foundUser.createdKickoffs.push(newKickoff);
        await foundUser.save();
        const kickoff = await newKickoff.save();
        res.json(kickoff)
    } catch (err) {
        res.json(err.message)
    }
})


// Get kickoff by id
// This has been tested
router.get('/:id', async (req, res) => {
    try {
        const kickoff = await db.Kickoff.findById(req.params.id);
        res.json(kickoff)
    } catch (err) {
        console.log(err)
    }
})


// Edit kickoff found by id
router.put('/:id', async ( req, res ) => {
    try {
        const updatedKickoff = await db.Kickoff.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedKickoff)
    } catch (err) {
        console.log(err)
    }
})


router.delete('/:id', auth, async ( req, res ) => {
    try {

        const kickoff = await db.Kickoff.findById(req.params.id)
        const user = await db.User.findById(req.user)

        // if there is a group associated with the kickoff, the kickoff creator or group creator can delete it.

        if (kickoff.group !== null) {
            const group = await db.Group.findById(kickoff.group);

            if (group.creator.toString() === user._id.toString() || kickoff.user.toString() === user._id.toString()){ 

                //  if the creator of the group is also the creator of the kickoff, this removes the id from the users created kickoffs
                if(group.creator !== user._id) {
                    await user.createdKickoffs.remove(kickoff);
                    await user.save();
                }

                await group.upcomingKickoffs.remove(kickoff);
                await group.save()
                await kickoff.remove();
                res.json({message: 'Deleted!'})
            }
        }

        if ( kickoff.user.toString() === user._id.toString()) {
            await user.createdKickoffs.remove(kickoff._id);
            await user.save();
            const deletedKickoff = await kickoff.remove();
            deletedKickoff.save();
            return res.json(deletedKickoff)
        }
    } catch (err) {
        console.log(err)
        res.json(err.message)
    }
})


module.exports = router