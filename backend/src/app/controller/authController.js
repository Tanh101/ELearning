const User = require('../model/User');
const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {
    registerUser: async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400)
                .json({ success: false, message: 'Missing username or password' });
        }
        try {
            const user = await User.findOne({ username });
            if (user) {
                return res.status(400).json({ success: false, message: 'username already taken' });
            }

            //All good
            const hashedPassword = await argon2.hash(password);

            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();

            //return token
            const accessToken = jwt.sign(
                { userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET
            )

            res.status(200).json({ success: true, message: 'Create User Successfully!', accessToken });

        } catch (error) {
            return res.status(401).json(error);
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
            const validPassword = await argon2.compare(req.body.password, user.password);
            console.log(validPassword);
            if(user && validPassword){
                res.status(200).json({success: true, user});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

}



module.exports = authController;