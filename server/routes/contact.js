const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = new Contact({ name, email, message });
        await contact.save();

        res.status(201).json({
            message: 'Contact form submitted successfully!',
            contact: {
                _id: contact._id,
                name: contact.name,
                email: contact.email,
                message: contact.message,
            },
        });
    } catch (error) {
        console.error('Error handling contact form submission:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 }).limit(3); // Fetch the latest 3 comments
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
