const User = require('../model/User');
const express = require('express');
// const argon2 = require('argon2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


require('dotenv').config();

const authController = {
    //REGISTER
    registerUser: async (req, res) => {

        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //Create new user
            const newUser = await new User({
                username: req.body.username,
                password: hashed,
                role : req.body.role,
            });

            //Svae to mongoDB
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                res.status(401).json({
                    success: false, message: 'Wrong username'
                });
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (user && validPassword) {
                const accessToken = jwt.sign({
                    id: user.id,
                    role: user.role
                },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }
                );
                const {password, ...others} = user._doc;
                    res.status(200).json({ ...others, accessToken });
}
        } catch (error) {
    res.status(500).json(error);
}
    }

}



module.exports = authController;