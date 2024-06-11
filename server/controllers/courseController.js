// backend/controllers/courseController.js
const Course = require('../models/courseModel');

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course == null) {
            return res.status(404).json({ message: 'Cannot find course' });
        }
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createCourse = async (req, res) => {
    const course = new Course({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration
    });

    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course == null) {
            return res.status(404).json({ message: 'Cannot find course' });
        }

        if (req.body.title != null) {
            course.title = req.body.title;
        }
        if (req.body.description != null) {
            course.description = req.body.description;
        }
        if (req.body.duration != null) {
            course.duration = req.body.duration;
        }

        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course == null) {
            return res.status(404).json({ message: 'Cannot find course' });
        }

        await course.remove();
        res.json({ message: 'Deleted Course' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};
