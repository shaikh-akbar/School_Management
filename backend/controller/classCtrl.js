
const Class = require('../models/classsModel');
const Teacher = require('../models/teacherModel');
const Student = require('../models/studentModel');



const AddClass = async (req, res) => {
    const { className, year, teacher, studentFees, maxStudents } = req.body;
    try {
        const newClass = new Class({ className, year, teacher, studentFees, maxStudents });
        const savedClass = await newClass.save();
        res.status(201).json(savedClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const enrollStudent = async (req, res) => {
    const { classId, studentId } = req.body;
    try {
        const classObj = await Class.findById(classId);
        if (!classObj) {
            return res.status(404).json({ message: 'Class not found' });
        }
        if (classObj.students.length >= classObj.maxStudents) {
            return res.status(400).json({ message: 'Class is full' });
        }
        classObj.students.push(studentId);
        await classObj.save();
        res.status(200).json(classObj);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate('teacher').populate('students');
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAClass = async (req, res) => {
    try {
        const classDetails = await Class.findById(req.params.id).populate('teacher').populate('students');
        if (!classDetails) return res.status(404).send('Class not found');
    
        // Fetch students and their genders
        const students = await Student.find({ _id: { $in: classDetails.students } });
    
        res.json({ classDetails, students });
      } catch (err) {
        res.status(500).send(err.message);
      }
};

const updateClass = async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedClass) {
            res.json(updatedClass);
        } else {
            res.status(404).json({ message: 'Class not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteClass = async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (deletedClass) {
            res.json({ message: 'Class deleted' });
        } else {
            res.status(404).json({ message: 'Class not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    AddClass,
    enrollStudent,
    getAllClasses,
    getAClass,
    updateClass,
    deleteClass
};
