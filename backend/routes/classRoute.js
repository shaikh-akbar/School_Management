const express = require('express')
const { AddClass, getAllClasses, getAClass, updateClass, deleteClass, enrollStudent, getStudentGenderCount } = require('../controller/classCtrl')

const router = express.Router()


router.post('/add/new-class',AddClass)
router.post('/enroll-student', enrollStudent);
router.get('/getAllClasses',getAllClasses)
router.get('/getASingleClass/:id',getAClass)
router.get('/class/:classId/gender-count',getStudentGenderCount)
router.put('/updateASingleClass/:id',updateClass)
router.delete('/deleteASingleClass/:id',deleteClass)

module.exports = router