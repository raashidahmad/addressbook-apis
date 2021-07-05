const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const url = 'mongodb://localhost/AddressBook';
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
const con = mongoose.connection;

con.on('open', () => {
    console.log('Connected to MongoDb')
});

app.use(express.json());

app.use('/contacts', require('./routing/contactcontroller'));
app.use('/account', require('./routing/accountcontroller'));

app.listen('4000', () => {
    console.log('Server started');
});