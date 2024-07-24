const express = require('express')
const cors = require('cors')
const {config} = require('dotenv')
const dbConnection  = require('./database/dbConnection')
const addClassRouter = require('./routes/classRoute')
const teacherRouter = require('./routes/teacherRoute')
const studentRouter = require('./routes/studentRoute')
// const PORT = 4000 || process.env.PORT

const app = express()
app.use(cors({
    origin: '*',
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));
config({ path: "./config/config.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection()

app.use('/api/admin', addClassRouter);
app.use('/api/admin', teacherRouter);
app.use('/api/admin', studentRouter);


app.listen(process.env.PORT,()=>{
    console.log(`server is runnning on port ${process.env.PORT}`)
})