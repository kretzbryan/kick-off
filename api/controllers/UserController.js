const Router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

///adding the file from the middleware
const auth = require("../middleware/authentication");




Router.post("/sign-up", async (req, res) => {
    try {
        //SET UP VALUES FROM THE BODY TO NEW FIELDS
        const { email, password, passwordCheck, firstName, lastName, username } = req.body;

        //LETS GET VALIDATION (exception handling)
        if (!email || !password || !passwordCheck) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }
        if (password.length < 5) {
            return res.status(400).json({ msg: "The password needs to be at least 5 characters long." });
        }
        if (password !== passwordCheck) {
            return res.status(400).json({ msg: "Make sure the Password and the Password verification match." });
        }

        const existingUser = await User.findOne({ email: email });
        const existingUsername = await User.findOne({ username: username });
        // console.log(existingUser , );
        if (existingUser) {
            return res.status(400).json({ msg: "An account with this email already exists." });
        }
        if (existingUsername) {
            return res.status(400).json({ msg: "Username already exists" });
        }
        // console.log("looks good");

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        // console.log(passwordHash);

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: passwordHash,
        })
        // const savedUser = await newUser.save();
        const savedUser = await User.create(newUser);
        res.json(savedUser);

        // return res.send("user created", savedUser);

    } catch (error) {
        res.status(500).json({ msg: error.message })
        console.log(error);
    }
});

Router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        ///LETS CHECK FOR VALIDATION    
        if (!username || !password) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }

        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ msg: "No account with this username has been registered." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials." });
        }

        //NEXT IT WILL SIGN AN OBJECT A PAYLOAD
        //FROM THE USER ID
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastname: user.lastName,
            },
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }
});


// Edits profile
Router.put('/', auth, async ( req, res ) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user, req.body, { new: true })
        res.json(updatedUser)
    } catch (err) {
        res.json(err.message)
    }
})


//router to delete an account
Router.delete("/deleteAccount", auth, async (req, res) => {
    // console.log(req.user);
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        //this incase we want to add a message using the deleted user.
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }
});

//AND ENDPOINT THAT RETURNS TRUE OR FALSE ON TOKEN VALIDATION
Router.post("/isTokenValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.json(false);
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.json(false);
        }
        const user = await User.findById(verified.id);
        if (!user) {
            return res.json(false);
        }
        return res.json(true);
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }
});


Router.get("/info", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        res.status(200).json({
            username: user.username,
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
    } catch (error) {
        res.status(418).json({ error: error.message })
        console.log(error);
    }

});


module.exports = Router;