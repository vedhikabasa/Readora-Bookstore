const express = require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await User.findOne({ username });

        if (!admin) {
            return res.status(404).send({ message: "Admin not found!" });
        }

        // Check if user is actually an admin
        if (admin.role !== "admin") {
            return res.status(403).send({ message: "Access denied!" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).send({ message: "Invalid password!" });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                username: admin.username,
                role: admin.role,
            },
            JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        return res.status(200).json({
            message: "Authentication successful",
            token,
            user: {
                username: admin.username,
                role: admin.role,
            },
        });

    } catch (error) {
        console.error("Failed to login as admin", error);
        return res.status(500).send({
            message: "Failed to login as admin",
        });
    }
});

module.exports = router;