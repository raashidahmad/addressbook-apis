const express = require('express');
const mongoose = require('mongoose');

const app = express();
const url = 'mongodb://localhost/AddressBook';

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
const con = mongoose.connection;

con.on('open', () => {
    console.log('Connected to MongoDb')
});