const express = require('express');
const router = express.Router();
const GroupModel = require('../models/Group')

//Create a group

router.get('/create', (req, res) => {
    const group = new GroupModel(req.body);

    try {
        await group.save();
        res.send(group);
    } catch (err) {
        res.status(500).send(err);
    }
});


// GET Routes
//get all groups

router.get('/all', async (req, res) => {
    const groups = await GroupModel.find({})

    try {
        res.send(groups);
    } catch (err) {
        res.status(500).send(err);
    }
})

//get a users groups

router.get('/usergroups', async (req, res) => {
    const usergroups = await GroupModel.find({users: req.params.user_id})

    try{
        res.send(usergroups)
    } catch (err) {
        res.status(500).send(err);
    }
})

//get a group by id

router.get('/group/:id', async (rec, res) => {
    const group = await GroupModel.findOne({id: req.params.id})

    try{
        res.send(group);
    }catch (err) {
        res.status(500).send(err);
    }
});
//Update Group
router.put('/update/:id', async (req, res) => {
    const query = {id: req.params.id}
    const updates =  {interests: req.body.interests, users: req.body.users, upcomingKickoffs: req.body.upcomingKickoffs}
    const update = GroupModel.findOneAndUpdate(query, updates, {new: true});

    try {
        await update.save();
        res.send(update)
    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router;