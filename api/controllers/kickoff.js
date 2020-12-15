const express = require('express');
const router =  express.Router();
const db = require('../models');
const auth = require('../middleware/authentication');

router.get('/', async (req, res) => {
    try {
        const kickoffs = await db.Kickoff.find({});
        res.json(kickoffs)
    } catch (err) {
        console.log(err)
    }
})

router.get('/related', auth,  async ( req, res ) => {
    try {
        const user = await db.User.findById(req.user)
        const related = await db.Kickoff.find({interests: {$in: user.interests}});
        
        res.json(related)
    } catch (err) {
        console.log(err)
    }
})

router.post('/', async ( req, res ) => {
    try {
        const { title,  startTime, description, interests, user, group } = req.body
        const newKickoff = new db.Kickoff({
            title,
            startTime,
            user,
            group,
            description,
            interests
        })
        const user = await db.User.findById(req.params.id).select('-password')
        await user.createdEvents.push(newKickoff)
        const kickoff = await newKickoff.save();
        res.json(kickoff)
    } catch (err) {
        console.log(err)
    }
})



router.get('/:id', async (req, res) => {
    try {
        const kickoff = await db.Kickoff.findById(req.params.id);
        res.json(kickoff)
    } catch (err) {
        console.log(err)
    }
})

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

            if (group.creator === user._id || kickoff.creator === user._id){ 

                //  if the creator of the group is also the creator of the kickoff, this removes the id from the users created kickoffs
                if(group.creator !== user._id) {
                    await user.createdKickoffs.remove(kickoff);
                    await user.save();
                }

                await group.upcomingKickoffs.remove(kickoff);
                await group.save()
                await kickoff.remove();
                res.json('Deleted!')
            }
        }

        if ( kickoff.creator === user._id) {
            await user.createdKickoffs.remove(kickoff);
            await user.save();
            await kickoff.remove();
            res.json('Deleted!')
        }
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})


module.exports = router