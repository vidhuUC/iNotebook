const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req,res)=>{
    res.json({success: true, message: "Welcome to iNotebook API"})
})

// create a new user using: POST "/api/auth/createUser". Doesn't require Auth
router.post('/', async (req,res)=>{
    try {
        // Create a new user
        const user = await User.create(req.body);
        res.json({success: true, message: "Successfully created a new user", user: user})
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error", error: error.message})
    }
})

module.exports = router;