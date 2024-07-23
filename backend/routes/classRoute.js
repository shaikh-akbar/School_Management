const express = require('express')
const { AddClass, getAllClasses, getAClass, updateClass, deleteClass } = require('../controller/classCtrl')

const router = express.Router()


router.post('/add/new-class',AddClass)
router.get('/getAllClasses',getAllClasses)
router.get('/getASingleClass/:id',getAClass)
router.put('/updateASingleClass/:id',updateClass)
router.delete('/deleteASingleClass/:id',deleteClass)

module.exports = router