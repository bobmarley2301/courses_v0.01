const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const Video = require('../models/video');

// Отримати всі курси
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().populate('videos');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Отримати курс за ID
router.get('/:courseId', async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId).populate('videos');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Створити новий курс
router.post('/', async (req, res) => {
    const course = new Course({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    });

    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
