'use strict';

// mongodb and dotenv setup
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };


const updateUserFavorites = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db('muse');
    try {
        await client.connect();
        const updateFavorites = await db.collection('users').findOneAndUpdate(
            { email: req.body.email },
            { $push: {favorites: req.body.artworkId }}
            )
        if (updateFavorites) {
            res.status(200).json({
                status: 200,
                data: updateFavorites
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'Error adding user favorites'
            })
        }
    } catch(err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    };
};

const deleteUserFavorite = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db('muse');
    try {
        await client.connect();
        const deleteFavorite = await db.collection('users').findOneAndUpdate(
            { email: req.body.email },
            { $pull: {favorites: req.body.artworkId}},
            // return document after to get the updated value (by default return original)
            {returnDocument: 'after'}
        )
        console.log(deleteFavorite)
        if (deleteFavorite) {
            res.status(200).json({
                status: 200,
                data: deleteFavorite
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'Error deleting user favorite'
            })
        }
    } catch(err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    };
}


const followUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db('muse');
    try {
        await client.connect();
        // add to users following array
        const followUser = await db.collection('users').findOneAndUpdate(
            { email: req.body.email },
            { $push: {following: req.body.followEmail}},
            // return document after to get the updated value (by default return original)
            {returnDocument: 'after'}
        )
        // add to followed users followers array
        const addFollowing = await db.collection('users').findOneAndUpdate(
            { email: req.body.followEmail },
            { $push: {followers: req.body.email}},
            // return document after to get the updated value (by default return original)
            {returnDocument: 'after'}
        )
        if (followUser && addFollowing) {
            res.status(200).json({
                status: 200,
                data: followUser
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'Error following user'
            })
        }
    } catch(err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    };
}
module.exports = { updateUserFavorites, deleteUserFavorite, followUser }