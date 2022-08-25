const express = require('express');
const morgan = require('morgan');

express()
    .get('/hi', (req, res) =>{
        res.status(200).json({
            status: 200,
            message: 'success'
        })
    })

    .listen(8000, ()=>{
        console.log('server launched on 8000')
    });