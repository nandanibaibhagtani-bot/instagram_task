const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Vercel /tmp directory path
const filePath = process.env.VERCEL 
    ? path.join('/tmp', 'users.json') 
    : path.join(__dirname, '../data/users.json');

// Safe function to get users without blocking server startup
const getUsers = () => {
    try {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        if (!fs.existsSync(filePath)) {
            if (process.env.VERCEL) {
                const initialDataPath = path.join(__dirname, '../data/users.json');
                if (fs.existsSync(initialDataPath)) {
                    try {
                        fs.copyFileSync(initialDataPath, filePath);
                        const data = fs.readFileSync(filePath, 'utf8');
                        return JSON.parse(data);
                    } catch (e) {}
                }
            }
            fs.writeFileSync(filePath, JSON.stringify([]));
            return [];
        }
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

router.post('/signup', async (req, res) => {
    try {
        const { emailOrPhone, fullName, username, password, birthday } = req.body;
        
        const users = getUsers();

        const existingUser = users.find(u => u.emailOrPhone === emailOrPhone || u.username === username);
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
        
        users.push(newUser);
        
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        
        res.status(201).json({ message: "Account created successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;
        
        const users = getUsers();
        const user = users.find(u => u.emailOrPhone === emailOrPhone || u.username === emailOrPhone);
        
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