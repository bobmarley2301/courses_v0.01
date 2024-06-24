const express = require('express');
const router = express.Router();
const Video = require('../models/video');
const Course = require('../models/course');

// Отримати всі відео для курсу
router.get('/:courseId', async (req, res) => {
    try {
        const videos = await Video.find({ course: req.params.courseId });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Додати нове відео до курсу
router.post('/:courseId', async (req, res) => {
    const video = new Video({
        title: req.body.title,
        description: req.body.description,
        videoUrl: req.body.videoUrl, // Додано поле для URL відео
        course: req.params.courseId
    });

    try {
        const newVideo = await video.save();
        const course = await Course.findById(req.params.courseId);
        course.videos.push(newVideo);
        await course.save();
        res.status(201).json(newVideo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Отримати відео за courseId і videoId
router.get('/:courseId/video/:videoId', async (req, res) => {
    try {
        const video = await Video.findOne({ _id: req.params.videoId, course: req.params.courseId });
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.json(video);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;


module.exports = router;
