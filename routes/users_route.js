const express = require('express');
const routes = express.Router();
const User = require('../models/db/users');
routes.route('/create').post(async (req, res) => {
    try {
        console.log("hello ", req.body);
        const user = new User(req.body);
        const result = await user.save();
        res.json({ message: 'User created successfully', result });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
});

module.exports = routes;