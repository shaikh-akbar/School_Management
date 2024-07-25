
const Student = require('../models/studentModel');

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find()
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addStudent = async (req, res) => {
    const { name, gender, dob, contactDetails, feesPaid, className } = req.body;
    try {
      const newStudent = new Student({ name, gender, dob, contactDetails, feesPaid, className });
      const savedStudent = await newStudent.save();
      res.status(201).json(savedStudent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedStudent) {
            res.json(updatedStudent);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (deletedStudent) {
            res.json({ message: 'Student deleted' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllStudents,
    addStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
};
