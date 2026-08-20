const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// In-memory storage array to ensure serverless function NEVER hangs or times out
let usersList = [];

router.post('/signup', async (req, res) => {
    try {
        const { emailOrPhone, fullName, username, password, birthday } = req.body;
        
        const existingUser = usersList.find(u => u.emailOrPhone === emailOrPhone || u.username === username);
        if (existingUser) {
            return res.status(400).json({ message: "This user already have account." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = { 
            emailOrPhone, 
            fullName, 
            username, 
            password: hashedPassword, 
            birthday 
        };
        
        usersList.push(newUser);
        
        res.status(201).json({ message: "Account created successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;
        
        const user = usersList.find(u => u.emailOrPhone === emailOrPhone || u.username === emailOrPhone);
        
        if (!user) {
            return res.status(400).json({ message: "Please sign up first." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password!" });
        }

        res.status(200).json({ message: "Login successful!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;