const express = require('express');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes');
const {errorHandler,errorConverter} = require('./utils/error')
require('dotenv').config({path: path.join(__dirname, '../.env')});

const app = express();

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log("Listening on port:", process.env.PORT)
    })
})

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/', routes)

app.use((req, res, next)=>{
    res.statusCode(httpStatus.NOT_FOUND).json("API endpoint not found")
})

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;