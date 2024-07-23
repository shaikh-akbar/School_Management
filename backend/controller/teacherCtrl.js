// const Teacher = require('../models/teacherModel');

// // Add a new teacher
// const addTeacher = async (req, res, next) => {
//     try {
//         const newTeacher = new Teacher(req.body);
//         await newTeacher.save();
//         res.status(201).json(newTeacher);
//     } catch (error) {
//         next(error);
//     }
// };

// // Get all teachers
// const getAllTeachers = async (req, res, next) => {
//     try {
//         const teachers = await Teacher.find().populate('assignedClass');
//         res.status(200).json(teachers);
//     } catch (error) {
//         next(error);
//     }
// };

// // Get a teacher by ID
// const getTeacherById = async (req, res, next) => {
//     try {
//         const teacher = await Teacher.findById(req.params.id).populate('assignedClass');
//         if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
//         res.status(200).json(teacher);
//     } catch (error) {
//         next(error);
//     }
// };

// // Update a teacher by ID
// const updateTeacher = async (req, res, next) => {
//     try {
//         const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
//         res.status(200).json(teacher);
//     } catch (error) {
//         next(error);
//     }
// };

// // Delete a teacher by ID
// const deleteTeacher = async (req, res, next) => {
//     try {
//         const teacher = await Teacher.findByIdAndDelete(req.params.id);
//         if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
//         res.status(200).json({ message: 'Teacher deleted' });
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = { addTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher };
const Teacher = require('../models/teacherModel');

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().populate('assignedClass');
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addTeacher = async (req, res) => {
    const { name, gender, dob, contactDetails, salary, assignedClass } = req.body;
    try {
        const newTeacher = new Teacher({ name, gender, dob, contactDetails, salary, assignedClass });
        const savedTeacher = await newTeacher.save();
        res.status(201).json(savedTeacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id).populate('assignedClass');
        if (teacher) {
            res.json(teacher);
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTeacher = async (req, res) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedTeacher) {
            res.json(updatedTeacher);
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTeacher = async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
        if (deletedTeacher) {
            res.json({ message: 'Teacher deleted' });
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTeachers,
    addTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
};
