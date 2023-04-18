const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
    res.json({ success: true, message: "Welcome to iNotebook API" })
})

// create a new user using: POST "/api/auth/createUser". Doesn't require Auth
router.post('/', [
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

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success: false, message: "Sorry a user with this email already exists" })

        }
         user = await User.create(req.body);
        res.json({ success: true, message: "Successfully created a new user", user: user })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
    }
})

module.exports = router;