const Teacher = require('../models/teacherModel');

// Add a new teacher
const addTeacher = async (req, res, next) => {
    try {
        const newTeacher = new Teacher(req.body);
        await newTeacher.save();
        res.status(201).json(newTeacher);
    } catch (error) {
        next(error);
    }
};

// Get all teachers
const getAllTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.find().populate('assignedClass');
        res.status(200).json(teachers);
    } catch (error) {
        next(error);
    }
};

// Get a teacher by ID
const getTeacherById = async (req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.params.id).populate('assignedClass');
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
        res.status(200).json(teacher);
    } catch (error) {
        next(error);
    }
};

// Update a teacher by ID
const updateTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
        res.status(200).json(teacher);
    } catch (error) {
        next(error);
    }
};

// Delete a teacher by ID
const deleteTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
        res.status(200).json({ message: 'Teacher deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { addTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher };
