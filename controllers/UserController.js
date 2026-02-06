const User = require('../models/db/UserModel');

const createUser = async (req, res) => {
    try {
        const userData = req.body;

        const user = new User(userData);
        const savedUser = await user.save();

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: savedUser
        });

    } catch (error) {
        console.error("Create User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    createUser
};
