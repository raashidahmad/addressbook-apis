var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const Contact = require('./models/contact');

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.statusCode = 400;
        res.statusMessage = err;
    }
});

router.post('/', async(req, res) => {
    try {
        const contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
        });

        const newContact = await contact.save();
        res.json(newContact);
    } catch (err) {
        res.statusCode = 400;
        res.statusMessage = err;
    }
});
module.exports = router;