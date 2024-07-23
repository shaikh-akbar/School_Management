const Student = require('../models/studentModel');

// Add a new student
const addStudent = async (req, res, next) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        next(error);
    }
};

// Get all students
const getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.find().populate('class');
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
};

// Get a student by ID
const getStudentById = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id).populate('class');
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
};

// Update a student by ID
const updateStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
};

// Delete a student by ID
const deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ message: 'Student deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = { addStudent, getAllStudents, getStudentById, updateStudent, deleteStudent };
