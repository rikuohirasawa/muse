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

const getUser = async (req, res) => {
    // create new mongoclient promise
    const client = new MongoClient(MONGO_URI, options);
    // specify database
    const db = client.db('muse')
    try {
    // connect to client
    await client.connect();
    console.log('connected');

    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
};

module.exports = { getUser }