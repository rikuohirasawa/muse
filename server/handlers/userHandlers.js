'use strict';

// mongodb and dotenv setup
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

// get user data
const getUserByEmail = async (req, res) => {
    // create new mongoclient promise
    const client = new MongoClient(MONGO_URI, options);
    // specify database
    const db = client.db('muse');
    try {
    // connect to client
    await client.connect();
    // find user by email
    const user = await db.collection('users').findOne({email: req.params.email});
    if (user) {
    // if user is found - respond with user data
        res.status(200).json({
            status: 200,
            data: user
        })
    } else {
    // else respond with 404
    res.status(404).json({
        status: 404,
        message: 'User not found'
    })};
    } catch (err) {
    // catch sends 505 response, error message sent to help troubleshoot
        res.status(500).json({
            status: 500,
            message: err.message
        })
    };
};

// add new user
const addNewUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db('muse');
    console.log(req.body)
    try {
        await client.connect();
        const user = await db.collection('users').findOne({email: req.body.email});
        if (user) {
            return res.status(200).json({
                status: 200,
                message: 'User already exists'
            })
        } else {
            const newUser = await db.collection('users').insertOne({
                email: req.body.email,
                nickname: req.body.nickname,
                profileSetup: false
            })
            if (newUser) {
                res.status(200).json({
                    status: 200,
                    data: newUser
                })
            } else {
                res.status(400).json({
                    status: 404,
                    message: 'Error adding user to database'
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    };
};


// update user profile
const updateUserProfile = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db('muse');
    try {
    await client.connect();
    const updateUser = await db.collection('users').updateOne(
        { email: req.body.email },
        {$set: 
            {
            avatarSrc: req.body.avatarSrc,
            name: req.body.name,
            bio: req.body.bio,
            profileSetup: true,
            friends: [],
            favorites: []
        }}, { upsert: false }
    );
    if (updateUser) {
        res.status(200).json({
            status: 200,
            data: updateUser
        })
    } else {
        res.status(404).json({
            status: 400,
            message: 'Error updating user profile'
        })
    }
} catch (err) {
    res.status(505).json({
        status: 505,
        message: err.message
    })
}
}

module.exports = { getUserByEmail, addNewUser, updateUserProfile }