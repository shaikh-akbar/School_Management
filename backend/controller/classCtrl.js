const Class = require('../models/classsModel'); 

const AddClass = async (req, res, next) => {
    try {
        const newClass = new Class(req.body);
        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        next(error); // Use next to pass the error to your global error handler
    }
};

const getAllClasses = async (req, res, next) => {
    try {
        const classes = await Class.find().populate('teacher students');
        res.status(200).json(classes);
    } catch (error) {
        next(error); // Use next to pass the error to your global error handler
    }
};

const getAClass = async (req, res, next) => {
    try {
        const classData = await Class.findById(req.params.id).populate('teacher students');
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json(classData);
    } catch (error) {
        next(error); // Use next to pass the error to your global error handler
    }
};

const updateClass = async (req, res, next) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json(updatedClass);
    } catch (error) {
        next(error); // Use next to pass the error to your global error handler
    }
};

const deleteClass = async (req, res, next) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json({ message: 'Class deleted' });
    } catch (error) {
        next(error); // Use next to pass the error to your global error handler
    }
};

module.exports = { AddClass, getAllClasses, getAClass, updateClass, deleteClass };
