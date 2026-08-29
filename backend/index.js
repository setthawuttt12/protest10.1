require('dotenv').config({path:'.env'})
const fileUp = require('express-fileupload')
const express = require('express')
const path = require('path')
const JWT_SECRET = process.env.JWT_SECRET
const cors = require('cors')
const app = express()

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use(express.json())
app.use(fileUp())
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))

const pf = require('./routes/profile')
app.use('/api/profile',pf)

app.use((req,res)=> res.status(404).json({message:"Route not Found"}))
app.listen(3001,()=>{

    console.log("Server Running on port 3001");
    

})