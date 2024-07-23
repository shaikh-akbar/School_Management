const express = require('express')
const { addTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher } = require('../controller/teacherCtrl')

const router = express.Router()


router.post('/add/new-teacher',addTeacher)
router.get('/getAllTeachers',getAllTeachers)
router.get('/getATeacher/:id', getTeacherById)
router.put('/updateATeacher/:id', updateTeacher)
router.delete('/deleteATeacher/:id', deleteTeacher);




module.exports = router