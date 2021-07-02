const express = require('express');
const mongoose = require('mongoose');

const app = express();
const url = 'mongodb://localhost/AddressBook';
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
const con = mongoose.connection;

con.on('open', () => {
    console.log('Connected to MongoDb')
});

app.use(express.json());

const contactRouter = require('./routing/routes');
app.use('/contacts', contactRouter);

app.listen('4000', () => {
    console.log('Server started');
});