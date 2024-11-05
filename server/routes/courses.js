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
        console.error(err); // Логування помилок
        res.status(500).json({ message: 'Failed to retrieve courses.' });
    }
});

// Отримати курс за ID
router.get('/:courseId', async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId).populate('videos');
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }
        res.json(course);
    } catch (err) {
        console.error(err); // Логування помилок
        res.status(500).json({ message: 'Failed to retrieve the course.' });
    }
});

// Створити новий курс
router.post('/', async (req, res) => {
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
        return res.status(400).json({ message: 'Missing required fields: title, description, or image.' });
    }

    const course = new Course({
        title,
        description,
        image
    });

    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (err) {
        console.error(err); // Логування помилок
        res.status(400).json({ message: 'Failed to create the course.' });
    }
});

// Видалити курс за ID
router.delete('/:courseId', async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        // Видалити всі відео, пов'язані з курсом
        await Video.deleteMany({ course: req.params.courseId });

        await Course.findByIdAndDelete(req.params.courseId);
        res.json({ message: 'Course deleted successfully.' });
    } catch (err) {
        console.error(err); // Логування помилок
        res.status(500).json({ message: 'Failed to delete the course.' });
    }
});

// Отримати всі відео для курсу
router.get('/:courseId/video', async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId).populate('videos');
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }
        res.json(course.videos);
    } catch (err) {
        console.error(err); // Логування помилок
        res.status(500).json({ message: 'Failed to retrieve videos.' });
    }
});

// Отримати відео за ID
router.get('/:courseId/video/:videoId', async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoId);
        if (!video || video.course.toString() !== req.params.courseId) {
            return res.status(404).json({ message: 'Video not found.' });
        }
        res.json(video);
    } catch (err) {
        console.error(err); // Логування помилок
        res.status(500).json({ message: 'Failed to retrieve the video.' });
    }
});

// Створити нове відео для курсу
router.post('/:courseId/video', async (req, res) => {
    const { title, videoUrl, description, image } = req.body;  // Переконайтеся, що тут використовується videoUrl

    if (!title || !videoUrl) {
        return res.status(400).json({ message: 'Missing required fields: title or videoUrl.' });
    }

    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return res.status(404).json({ message: 'Course not found.' });
    }

    const video = new Video({
        title,
        description,
        image,
        videoUrl,
        course: req.params.courseId
    });

    try {
        const newVideo = await video.save();
        course.videos.push(newVideo);
        await course.save();
        res.status(201).json(newVideo);
    } catch (err) {
        console.error(err); // Логування помилок
        res.status(400).json({ message: 'Failed to create the video.' });
    }
});


// Видалити відео за ID
router.delete('/:courseId/video/:videoId', async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoId);
        if (!video || video.course.toString() !== req.params.courseId) {
            return res.status(404).json({ message: 'Video not found.' });
        }

        await Video.findByIdAndDelete(req.params.videoId);
        const course = await Course.findById(req.params.courseId);
        course.videos = course.videos.filter(v => v.toString() !== req.params.videoId);
        await course.save();

        res.json({ message: 'Video deleted successfully.' });
    } catch (err) {
        console.error(err); // Логування помилок
        res.status(500).json({ message: 'Failed to delete the video.' });
    }
});

module.exports = router;