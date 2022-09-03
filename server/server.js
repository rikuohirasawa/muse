const express = require('express');
const morgan = require('morgan');

const { getArtIds } = require('./handlers/apiCalls');
const { getSampleArt } = require('./handlers/sampleArt');
const { 
    getUserByEmail, 
    addNewUser, 
    updateUserProfile,
    findAllUsers,
    findAllFollowedUsers,
    getUserById
    } = require('./handlers/userHandlers');

const { 
    updateUserFavorites,
    deleteUserFavorite,
    followUser
    } = require('./handlers/userActionHandlers')

express()
.use(morgan("tiny"))
.use(express.json())
.use(express.urlencoded({ extended: false }))
    .get('/testing', getArtIds)
    .get('/api/sample-art', getSampleArt)
    //user endpoints for database
    .get('/user/:email', getUserByEmail)
    .get('/users/find-all', findAllUsers)
    .get('/users/following/:email', findAllFollowedUsers)
    .post('/user/new-user', addNewUser)
    .get('/userId/:id', getUserById)

    .patch('/user/update-user', updateUserProfile)
    .patch('/user/update-favorites', updateUserFavorites)
    .patch('/user/delete-favorite', deleteUserFavorite)
    .patch('/user/follow-user', followUser)

    .listen(8000, ()=>{
        console.log('server launched on 8000')
    });