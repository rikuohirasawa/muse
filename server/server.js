const express = require('express');
const morgan = require('morgan');
const {getArtIds} = require('./handlers/apiCalls')

express()
    .get('/testing', getArtIds)

    .listen(8000, ()=>{
        console.log('server launched on 8000')
    });