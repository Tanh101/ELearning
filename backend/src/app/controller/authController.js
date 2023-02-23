const User = require('../model/User');
const express = require('express');
// const argon2 = require('argon2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cookiePaser = require('cookie-parser');


require('dotenv').config();
let refreshTokens = [];

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
                role: req.body.role,
            });

            //Svae to mongoDB
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '20s' }
        );
    },
    //GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "365d"
            }
        );
    },

    //LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(401).json({
                    success: false, message: 'Wrong username'
                });
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);

                const refreshToken = authController.generateRefreshToken(user);

                refreshTokens.push(refreshToken);

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    samesite: "strict",
                });

                const { password, ...others } = user._doc;
                return res.status(200).json({ ...others, accessToken });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    requestRefreshToken: async (req, res) => {
        //Take refresh token from user
        // const refreshToken = req.cookies.refreshToken;
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken)
            return res.status(401).json("You are not authenticated");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err);

            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

            //Create new accessToken, refreshToken
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);

            refreshTokens.push(newRefreshToken);
            //save to cookie
            res.cookie('refreshToken', newRefreshToken, {
                httponly: true,
                secure: false,
                path: "/",
                samesite: "strict",
            });
            res.status(200).json({ accessToken: newAccessToken });
        })
    },

    logoutUser: async (req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        return res.status(200).json("logout successful!");
    }

};
//STORE TOKEN
//1LOCAL STORAGE
//LOI XSS
//2 COOKIES:
//IT BI ANH HUONG XSS HON STORAGE
//tan cong csrf (web gia mao keu nhap gi do => danh cap)
//khac phuc: crft => samesite
//3. redux store -> access token
// 4. httponly cookies -> refreshToken
// 5. safe: bff pattern (backend for frontend)


module.exports = authController;