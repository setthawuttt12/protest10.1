const express = require("express")
const bc = require('bcrypt')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {name_topic} = req.body
        const [rows] = await db.query(`insert into tb_topic(name_topic) values(?)`,[name_topic])
        res.json(rows,{message:"save topic success"})
    } catch (error) {
        console.error("error save topic",error);
        res.status(500).json({message:"save topic failed"})
    }
})

router.put('/update/:id_topic',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {name_topic} = req.body
        const {id_topic} = req.params
        
        const [rows] = await db.query(`update tb_topic set name_topic=? where id_topic = ? `,[name_topic,id_topic])
        res.json({message:"update topic success"})
        
    } catch (error) {
        console.error("error update topic",error);
        res.status(500).json({message:"update topic failed"})
    }
})

router.delete('/delete/:id_topic',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_topic} = req.params
        
        const [rows] = await db.query(`delete from tb_topic where id_topic = ? `,[id_topic])
        res.json(rows,{message:"delete member success"})

        
    } catch (error) {
        console.error("error delete member",error);
        res.status(500).json({message:"delete member failed"})
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        
        const [rows] = await db.query(`select * from tb_topic order by id_topic desc `)
        res.json(rows,{message:"show topic success"})
        
    } catch (error) {
        console.error("error show topic",error);
        res.status(500).json({message:"show topic failed"})
    }
})


// router.get('/showC',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
//     try {
        
//         const [rows] = await db.query(`select * from tb_member where role = 'กรรมการประเมิน' order by id_member desc `)
//         res.json(rows,{message:"showC member success"})
        
//     } catch (error) {
//         console.error("error showC member",error);
//         res.status(500).json(rows,{message:"showC member failed"})
//     }
// })

module.exports = router