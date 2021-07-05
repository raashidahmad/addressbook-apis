var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
require('dotenv').config();
const Contact = require('./models/contact');

router.post('/token', async(req, res) => {
    try {
        let email = req.body.email;
        if (!email) {
            res.statusCode = 400;
            res.statusMessage = 'Provide an email address';
            const errorObj = { 'token': null, 'message': 'Provide an email address'};
            res.json(errorObj);
        } else {
            Contact.findOne({ 'email': email }, 'name phone email' ,function (error, contact) {
                if (error) {
                    res.statusCode = 400;
                    res.statusMessage = 'Invalid email address provided';
                    const errorObj = { 'token': null, 'message': 'Invalid email address provided' };
                    res.json(errorObj);
                }

                let token = null;
                if (contact && contact.email) {
                    token = jwt.sign(contact.email, process.env.JWT_ACCESS_TOKEN);
                } 
                res.json({ 'token': token });
            });
        }
    } catch (err) {
        res.statusCode = 400;
        res.statusMessage = err;
        const errorObj = { error: err, token: null };
        res.json(errorObj);
    }
});
module.exports = router;