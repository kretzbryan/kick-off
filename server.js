const express = require('express');
const app = express();
const cors = require('cors')
const controllers = require('./api/controllers');
const db = require('./api/models');
const connectDB = db.connectDB;

connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', ( req, res ) => {
    res.send('API Running')
})

app.use('/api/landing', controllers.landing)

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})