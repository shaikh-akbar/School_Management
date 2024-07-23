const express = require('express')
const {config} = require('dotenv')
const dbConnection  = require('./database/dbConnection')
const addClassRouter = require('./routes/classRoute')
const teacherRouter = require('./routes/teacherRoute')
const studentRouter = require('./routes/studentRoute')
const PORT = 4000 || process.env.PORT

const app = express()
config({ path: "./config/config.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', addClassRouter);
app.use('/api/admin', teacherRouter);
app.use('/api/admin', studentRouter);


dbConnection()
app.listen(process.env.PORT,()=>{
    console.log(`server is runnning on port ${process.env.PORT}`)
})