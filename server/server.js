const express = require('express');
const morgan = require('morgan');

const { getArtIds } = require('./handlers/apiCalls');
const { getSampleArt } = require('./handlers/sampleArt');
const { getUserByEmail } = require('./handlers/userHandlers');

express()
    .get('/testing', getArtIds)
    
    .get('/api/sample-art', getSampleArt)

    //user endpoints for database

    .get('/user/:email', getUserByEmail)

    .listen(8000, ()=>{
        console.log('server launched on 8000')
    });