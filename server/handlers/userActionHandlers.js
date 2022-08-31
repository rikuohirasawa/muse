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

}

module.exports = { updateUserFavorites }