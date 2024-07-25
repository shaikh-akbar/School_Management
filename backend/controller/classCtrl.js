
const Class = require('../models/classsModel');
const Teacher = require('../models/teacherModel');
const Student = require('../models/studentModel');



const AddClass = async (req, res) => {
    const { className, year, teacher, studentFees, maxStudents,students } = req.body;
    try {
        const newClass = new Class({ className, year, teacher, studentFees, maxStudents,students });
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
        const classes = await Class.find()
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAClass = async (req, res) => {
    console.log(req.params.id, "id not getting form the request");
    try {
      const classDetails = await Class.findById(req.params.id);
      if (!classDetails) return res.status(404).send('Class not found');
  
      res.json(classDetails);
    } catch (err) {
      console.error(err); // Log the error to identify the issue
      res.status(500).send(err.message);
    }
  };
  
  

const updateClass = async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );
        if (!updatedClass) return res.status(404).send('Class not found');
        
        res.json(updatedClass);
      } catch (err) {
        res.status(400).send(err.message);
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
