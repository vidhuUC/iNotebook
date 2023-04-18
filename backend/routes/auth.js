const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');

const JWT_SECRET = "iNotebookisverygood";

router.get('/', (req, res) => {
    res.json({ success: true, message: "Welcome to iNotebook API" })
})

// create a new user using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    try {
        // Create a new user
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success: false, message: "Sorry a user with this email already exists" })

        }
        user = await User.create({ name: req.body.name, email: req.body.email, password: hash });
        const data = { user: { id: user.id } };

        const token = jwt.sign(data, JWT_SECRET);

        res.json({token});
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
})


// Authenticate a user using: POST "/api/auth/login". Doesn't require Auth
router.post('/login', [
    body('email').isEmail(),
    body('password').exists(),
], async (req, res) => {
    try {
        // Create a new user
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Please enter correct email and password" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({ success: false, message: "Please enter correct email and password" })
        }

        const data = { user: { id: user.id } };

        const token = jwt.sign(data, JWT_SECRET);
        res.json({token});



        
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
})

// Get logged in user details using: POST "/api/auth/getuser". Requires Auth
router.post('/getuser', fetchUser, async (req, res) => {
    try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
    }catch(error){
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }



})

module.exports = router;