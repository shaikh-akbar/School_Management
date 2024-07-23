const express = require('express')
const { addStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } = require('../controller/studentCtrl')

const router = express.Router()


router.post('/add/new-student',addStudent)
router.get('/getAllStudents',getAllStudents)
router.get('/getAStudent/:id', getStudentById);
router.put('/updateAStudent/:id', updateStudent);
router.delete('/deleteAStudent/:id', deleteStudent);




module.exports = router