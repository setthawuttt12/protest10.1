const express = require("express")
const bc = require('bcrypt')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const [rows] = await db.query(`insert into tb_system(day_open,day_out,round_sys,year_sys,status_sys) values(?,?,?,?,?)`,[day_open,day_out,round_sys,year_sys,status_sys])
        res.json(rows,{message:"save system success"})
    } catch (error) {
        console.error("error save system",error);
        res.status(500).json({message:"save system failed"})
    }
})

router.put('/update/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const {id_sys} = req.params
        
        const [rows] = await db.query(`update tb_system set day_open=?,day_out=?,round_sys=?,year_sys=?,status_sys=? where id_sys = ? `,[day_open,day_out,round_sys,year_sys,status_sys,id_sys])
        res.json(rows,{message:"update indicate success"})
        
    } catch (error) {
        console.error("error update indicate",error);
        res.status(500).json({message:"update indicate failed"})
    }
})

router.delete('/delete/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_sys} = req.params
        
        const [rows] = await db.query(`delete from tb_system where id_sys = ? `,[id_sys])
        res.json(rows,{message:"delete round success"})

        
    } catch (error) {
        console.error("error delete round",error);
        res.status(500).json({message:"delete round failed"})
    }
})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        
        const [rows] = await db.query(`select * from tb_system where status_sys != 'n' order by id_sys desc `)
        res.json(rows,{message:"show round success"})
        
    } catch (error) {
        console.error("error show round",error);
        res.status(500).json({message:"show round failed"})
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