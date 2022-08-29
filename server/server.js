const express = require('express');
const morgan = require('morgan');

const { getArtIds } = require('./handlers/apiCalls');
const { getSampleArt } = require('./handlers/sampleArt');
const { getUserByEmail, addNewUser, updateUserProfile} = require('./handlers/userHandlers');

express()
.use(morgan("tiny"))
.use(express.json())
.use(express.urlencoded({ extended: false }))
    .get('/testing', getArtIds)
    .get('/api/sample-art', getSampleArt)
    //user endpoints for database
    .get('/user/:email', getUserByEmail)
    .post('/user/new-user', addNewUser)

    .patch('/user/update-user', updateUserProfile)

    .listen(8000, ()=>{
        console.log('server launched on 8000')
    });