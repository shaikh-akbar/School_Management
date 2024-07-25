
const Teacher = require('../models/teacherModel');

const getAllTeachers = async (req, res) => {
    const { page = 1, limit = 10, filter = '', sortBy = 'name', sortOrder = 'asc' } = req.query;

    try {
      const query = filter ? { name: new RegExp(filter, 'i') } : {};
      const teachers = await Teacher.find(query)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .exec();
      const count = await Teacher.countDocuments(query);
      res.json({ data: teachers, total: count });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const addTeacher = async (req, res) => {
    try {
        const { name, gender, dob, contactDetails, salary, assignedClass } = req.body;
    
        // Validate the request body
        if (!name || !gender || !dob || !contactDetails || !salary || !assignedClass) {
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        const newTeacher = new Teacher({
          name,
          gender,
          dob,
          contactDetails,
          salary,
          assignedClass
        });
    
        await newTeacher.save();
        res.status(201).json({ message: 'Teacher added successfully', data: newTeacher });
      } catch (error) {
        console.error('Error adding teacher:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
};

const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id)
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
    console.log('Request parameters:', req.params);
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'ID parameter is missing' });
        }

        const deletedTeacher = await Teacher.findByIdAndDelete(id);
        if (deletedTeacher) {
            res.json({ message: 'Teacher deleted' });
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ message: 'An error occurred while deleting the teacher' });
    }
};


module.exports = {
    getAllTeachers,
    addTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
};
