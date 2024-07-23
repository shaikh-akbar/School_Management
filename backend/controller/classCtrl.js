// const Class = require('../models/classsModel'); 
// const Student = require('../models/studentModel');

// const AddClass = async (req, res) => {
//     try {
//       const { className, year, teacher, studentFees, maxStudents } = req.body;
  
//       const newClass = new Class({
//         className,
//         year,
//         teacher,
//         studentFees,
//         maxStudents,
//         currentStudentCount: 0 
//       });
  
//       await newClass.save();
//       res.status(201).json(newClass);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
  
//   const enrollStudent = async (req, res) => {
//     try {
//       const { classId, studentId } = req.body;
//       console.log(classId, studentId);
  
//       // Find class by ID
//       const classObj = await Class.findById(classId);
//       if (!classObj) {
//         return res.status(404).json({ error: 'Class not found' });
//       }
  
//       // Check if class is full
//       if (classObj.studentList.length >= classObj.maxStudents) {
//         return res.status(400).json({ error: 'Class has reached the maximum student limit' });
//       }
  
//       // Add student to the class
//       classObj.studentList.push(studentId); // Ensure this field name matches the schema
//       classObj.currentStudentCount = classObj.studentList.length;
//       await classObj.save();
  
//       // Add class to student's list (if necessary)
//       const student = await Student.findById(studentId);
//       if (student) {
//         student.class = classId; // Ensure this field name matches the schema
//         await student.save();
//       }
  
//       res.status(200).json(classObj);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
  
  
  

// const getAllClasses = async (req, res, next) => {
//     try {
//         const classes = await Class.find().populate('teacher students');
//         res.status(200).json(classes);
//     } catch (error) {
//         next(error); // Use next to pass the error to your global error handler
//     }
// };

// const getAClass = async (req, res, next) => {
//     try {
//         const classData = await Class.findById(req.params.id).populate('teacher students');
//         if (!classData) {
//             return res.status(404).json({ message: 'Class not found' });
//         }
//         res.status(200).json(classData);
//     } catch (error) {
//         next(error); // Use next to pass the error to your global error handler
//     }
// };

// const updateClass = async (req, res, next) => {
//     try {
//         const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedClass) {
//             return res.status(404).json({ message: 'Class not found' });
//         }
//         res.status(200).json(updatedClass);
//     } catch (error) {
//         next(error); // Use next to pass the error to your global error handler
//     }
// };

// const deleteClass = async (req, res, next) => {
//     try {
//         const deletedClass = await Class.findByIdAndDelete(req.params.id);
//         if (!deletedClass) {
//             return res.status(404).json({ message: 'Class not found' });
//         }
//         res.status(200).json({ message: 'Class deleted' });
//     } catch (error) {
//         next(error); // Use next to pass the error to your global error handler
//     }
// };

// module.exports = { AddClass,enrollStudent, getAllClasses, getAClass, updateClass, deleteClass };
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
        const classObj = await Class.findById(req.params.id).populate('teacher').populate('students');
        if (classObj) {
            res.json(classObj);
        } else {
            res.status(404).json({ message: 'Class not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
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
