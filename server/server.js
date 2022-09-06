const express = require('express');
const morgan = require('morgan');

const { getSampleArt } = require('./handlers/sampleArt');
const { getCarouselArt } = require('./handlers/getCarouselArt')
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
    followUser,
    unFollowUser
    } = require('./handlers/userActionHandlers')

express()
.use(morgan("tiny"))
.use(express.json())
.use(express.urlencoded({ extended: false }))
    // this endpoint is not used for now as it takes too long to load
    // however it does return random art, whereas the following one
    // loads much faster but is a static array of my selections
    .get('/api/sample-art', getSampleArt)
    .get('/api/carousel-art', getCarouselArt)
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
    .patch('/user/unfollow-user', unFollowUser)


    .listen(8000, ()=>{
        console.log('server launched on 8000')
    });