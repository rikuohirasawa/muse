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
    try {
        await client.connect();
        const user = await db.collection('users').findOne({email: req.body.email});
        if (user) {
            return res.status(200).json({
                status: 200,
                data: user
            })
        } else {
            const newUser = await db.collection('users').insertOne({
                email: req.body.email,
                nickname: req.body.nickname,
                profileSetup: false,
                favorites: []
            })
            if (newUser) {
                res.status(201).json({
                    status: 201,
                    data: {
                    email: req.body.email,
                    nickname: req.body.nickname,
                    profileSetup: false,
                    favorites: []
                    }
                })
            } else {
                res.status(404).json({
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
    const updateUser = await db.collection('users').findOneAndUpdate(
        { email: req.body.email },
        {$set: 
            {
            avatarSrc: req.body.avatarSrc,
            name: req.body.name,
            bio: req.body.bio,
            profileSetup: true,
            following: [],
            followers: [],
            favorites: []
        }}, { upsert: false }
    );
    // previously I tried to use updateOne instead of findOneAndUpdate and it returned
    // only information regarding the update itself, and not the item itself 
    // this solution is not nearly as clean but does return the value I'm looking for
    if (updateUser.value && Object.values(updateUser.value).length > 0) {
        res.status(200).json({
            status: 200,
            data: updateUser.value
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

const findAllUsers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db('muse');
    try {
        await client.connect();
        const users = await db.collection('users').find().toArray();
        if (users) {
            return res.status(200).json({
                status: 200,
                data: users
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'Error fetching all users'
            })};
} catch(err) {
    res.status(505).json({
        status: 505,
        message: err.message
    })
}
}


const findAllFollowedUsers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db('muse');
    try {
        await client.connect();
        const users = await db.collection('users').findOne({email: req.params.email})
        const followedUsers = await Promise.all(users.following.map(async e=>{
            return (
                await db.collection('users').findOne({email: e})
            )
        }))
        if (users && followedUsers) {
            res.status(200).json({
                status: 200,
                data: followedUsers
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'Error finding followed users'
            })};
} catch(err) {
    res.status(505).json({
        status: 505,
        message: err.message
    })
}
}


// I only figured out the ObjectId class late in the project, before I was using email
// for everything, I can go back and fix this later
const getUserById = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db('muse');
    const ObjectId = require('mongodb').ObjectId;
    try {
    await client.connect();
    const user = await db.collection('users').findOne({'_id': ObjectId(req.params.id)});
    if (user) {
        res.status(200).json({
            status: 200,
            data: user
        })
    } else {
    res.status(404).json({
        status: 404,
        message: 'User not found'
    })};
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    };
}

module.exports = { getUserByEmail, addNewUser, updateUserProfile, findAllUsers, findAllFollowedUsers, getUserById }