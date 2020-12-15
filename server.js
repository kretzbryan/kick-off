const express = require('express');
const app = express();
const cors = require('cors')
const controllers = require('./api/controllers');
const db = require('./api/models');
const connectDB = db.connectDB;

///setting up for socket io (when needed) -----
// const socketio = require("socket.io");
// const http = require("http");
// const server = http.createServer(app);
// const io = socketio(server);

///USER CONTROLLER(ROUTE)
const userController = require("./api/controllers/UserController");


connectDB();

const PORT = process.env.PORT || 5000;

/////      MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//          ROUTES
app.use(cors()); /// if cors is required
app.get('/', (req, res) => {
    res.send('API Running');
});

app.use('/api/kickoff', controllers.kickoff)
app.use('/api/interest', controllers.interest);
app.use('/user', userController);

//run when client connects
// io.on("connection", (socket) => {
//     console.log("new ws connection...");
// });

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

///CHANGING FROM APP.LISTEN TO SERVER.LISTEN BECUASE OF SOCKETIO

// server.listen(PORT, () => {
//     console.log(`Server on port ${PORT}`)
// })