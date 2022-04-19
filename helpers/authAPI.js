const mongoose = require('mongoose');
const userSchema = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userDataCollection = mongoose.model('user', userSchema);

const authAPI = async (req,res, next) => {
    const authHeader = req.header('authorization');

    try{
        const token = authHeader.split(' ')[1];
        if(token == undefined){
            throw new Error('not authorized');
        }

        jwt.verify(token, process.env.PUBLIC_KEY, async (err, decoded) => {
            if(err) {
                res.status(400).send({"message" : "unauthorized request"});
            }else {
                let isUser = await userDataCollection.findOne({ 'email' : decoded.email , 'password' : decoded.password}).exec();
                console.log(isUser)
                if(isUser){
                    req.body.userId = decoded.userId;
                    req.body.email = decoded.email;
                    req.body.password = decoded.password;
                    req.body.role = decoded.role;
                    next();
                }else {
                    throw new Error('unauthorised');
                }
            }
        })
    }catch(err){
        res.status(400).send({'messages' : err});
    }
}

module.exports = {authAPI};