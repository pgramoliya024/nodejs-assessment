const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/userModel');


dotenv.config();

const userDataCollection = mongoose.model('user', userSchema);

// login api
exports.loginUser = async (req, res , next) => {
    console.log(' Login Api called');
    let email = req.body.email;
    let password = req.body.password;
    let user = await userDataCollection.findOne({email});

    if(user) {
        bcrypt.compare(password, user.password, (err, matched) => {
            if(matched) {
                const userData = {
                    userId : user._id,
                    email: user.email,
                    role: user.role,
                    password: user.password
                }
                const token = jwt.sign(userData, process.env.SECRET_KEY, { algorithm: 'RS512', expiresIn: '1d' });
                req.session.token = token;
                return res.status(200).json({"token": token});
            }else {
                res.status(400).json({"message" : "Email or password does not matched"});
            }
        });
    }else {
        res.status(404).json({"message" : "user not Found"});
    }
}


// register user
exports.registerUser = (req, res, next) => {
    console.log("register api called");
    bcrypt.hash(req.body.password, 10, (err, encrypted) => {

        let userObj;
        if(err) {
            res.send(err);
        }else {
            userObj = new userDataCollection({
                firstName : req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: encrypted,
                dateOfBirth: req.body.dateOfBirth,
                role: req.body.role
            });
            userObj.save((err, user) => {
                if(err) {
                    console.log(err);
                    res.send(err);
                }else {
                    console.log(user);
                    res.send(user);
                }
            });

        }
    })
}