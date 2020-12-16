const express = require('express');
const router = express.Router();
const GroupModel = require('../models/Group');
const auth = require('../middleware/authentication')

//Create a group

router.post('/create', auth, async (req, res) => {
    const { name, photo, interests, users, upcomingKickoffs} = req.body
    
    try {
        const group = new GroupModel({
            name,
            photo,
            creator: req.user,
            interests,
            users,
            upcomingKickoffs,
        });

        await group.save();
        res.json(group);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// GET Routes
//get all groups

router.get('/all', async (req, res) => {

    try {
        const groups = await GroupModel.find({})
        res.json(groups);
    } catch (err) {
        res.status(500).json(err.message);
    }
})

//get a users groups

router.get('/usergroups', auth, async (req, res) => {

    try{
        const usergroups = await GroupModel.find({creator: req.user})
        res.json(usergroups)
    } catch (err) {
        res.status(500).send(err);
    }
})

//get a group by id

router.get('/:id', async (req, res) => {

    try{
        const group = await GroupModel.findOne({_id: req.params.id})
        res.json(group);
    }catch (err) {
        res.status(500).send(err);
    }
});
//Update Group
router.put('/:id/update', async (req, res) => {
    const query = {_id: req.params.id}
    const updates =  {name: req.body.name, photo: req.body.photo, interests: req.body.interests, users: req.body.users, upcomingKickoffs: req.body.upcomingKickoffs}

    try {
        const update = await GroupModel.findOneAndUpdate(query, updates, {new: true});
        await update.save();
        res.json(update)
    } catch (err) {
        res.status(500).json(err.message)
    }
})


module.exports = router;