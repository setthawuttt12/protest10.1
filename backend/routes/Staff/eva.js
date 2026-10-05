const express = require("express")
const bc = require('bcrypt')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_member,id_sys,day_eva} = req.body
        const [rows] = await db.query(`insert into tb_eva(id_member,id_sys,day_eva,status_eva) values(?,?,?,?)`,[id_member,id_sys,day_eva,1])
        res.json(rows,{message:"save eva success"})
    } catch (error) {
        console.error("error save eva",error);
        res.status(500).json({message:"save eva failed"})
    }
})

router.put('/update/id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_member,id_sys,day_eva} = req.body
        const {id_eva} = req.params
        
        const [rows] = await db.query(`update tb_eva set id_member=?,id_sys=?,day_eva=? where id_eva = ? `,[id_member,id_sys,day_eva,id_eva])
        res.json(rows,{message:"update eva success"})
        
    } catch (error) {
        console.error("error update eva",error);
        res.status(500).json({message:"update eva failed"})
    }
})

router.delete('/delete/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_eva} = req.params
        
        const [rows] = await db.query(`delete from tb_eva where id_eva = ? `,[id_eva])
        res.json(rows,{message:"delete eva success"})

        
    } catch (error) {
        console.error("error delete eva",error);
        res.status(500).json({message:"delete eva failed"})
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        
        const [rows] = await db.query(`select * from tb_system s,tb_member m,tb_eva e where s.id_sys = e.id_sys and m.id_member = e.id_member order by id_eva desc `)
        res.json(rows,{message:"show round success"})
        
    } catch (error) {
        console.error("error show eva",error);
        res.status(500).json({message:"show eva failed"})
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