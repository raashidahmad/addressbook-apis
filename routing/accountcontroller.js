var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
require('dotenv').config();
const Contact = require('./models/contact');

router.post('/token', async(req, res) => {
    try {
        const email = req.body.email;
        const userObj = {};
        if (!email) {
            res.statusCode = 400;
            res.statusMessage = 'Provide an email address';
            const errorObj = { 'token': null, 'message': 'Provide an email address'};
            res.json(errorObj);
        } else {
            email = 'fake';
            Contact.find({ 'email': email }).then((contact, error) => {
                if (contact.length > 0) {
                    const token = jwt.sign(email, process.env.JWT_ACCESS_TOKEN);
                    res.json({ 'token': token });
                } 
            });
            res.statusCode = 400;
            res.statusMessage = 'Invalid email address provided';
            const errorObj = { 'token': null, 'message': 'Invalid email address provided' };
            res.json(errorObj);
        }
    } catch (err) {
        res.statusCode = 400;
        res.statusMessage = err;
    }
});
module.exports = router;