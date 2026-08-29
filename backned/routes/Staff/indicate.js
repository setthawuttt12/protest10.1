const express = require("express")
const bc = require('bcrypt')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const [rows] = await db.query(`insert into tb_indicate(id_topic,name_indicate,detail_indicate,point_indicate,check_indicate) values(?,?,?,?,?)`,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate])
        res.json(rows,{message:"save indicate success"})
    } catch (error) {
        console.error("error save indicate",error);
        res.status(500).json({message:"save indicate failed"})
    }
})

router.put('/update/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const {id_indicate} = req.params
        
        const [rows] = await db.query(`update tb_indicate set id_topic=?,name_indicate=?,detail_indicate=?,point_indicate=?,check_indicate=? where id_indicate = ? `,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate,id_indicate])
        res.json(rows,{message:"update indicate success"})
        
    } catch (error) {
        console.error("error update indicate",error);
        res.status(500).json({message:"update indicate failed"})
    }
})

router.delete('/delete/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_indicate} = req.params
        
        const [rows] = await db.query(`delete from tb_indicate where id_indicate = ? `,[id_indicate])
        res.json(rows,{message:"delete member success"})

        
    } catch (error) {
        console.error("error delete indicate",error);
        res.status(500).json({message:"delete indicate failed"})
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        
        const [rows] = await db.query(`select * from tb_topic,tb_indicate where tb_topic.id_topic = tb_indicate.id_topic order by id_indicate desc `)
        res.json(rows,{message:"show indicate success"})
        
    } catch (error) {
        console.error("error show indicate",error);
        res.status(500).json({message:"show indicate failed"})
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