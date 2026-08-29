const express = require("express")
const bc = require('bcrypt')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {fname,lname,email,username,password,role} = req.body
        const hash = await bc.hash(password,10)
        const [rows] = await db.query(`insert into tb_member(fname,lname,email,username,password,role) values(?,?,?,?,?,?)`,[fname,lname,email,username,hash,role])
        res.json(rows,{message:"save member success"})
    } catch (error) {
        console.error("error save member",error);
        res.status(500).json({message:"save member failed"})
    }
})

router.put('/update/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {fname,lname,email,username,password,role} = req.body
        const {id_member} = req.params
        if(password && password.trim()){
            const hash = await bc.hash(password,10)
            const [rows] = await db.query(`update tb_member set fname=?,lname=?,email=?,username=?,password=?,role=? where id_member = ? `,[fname,lname,email,username,hash,role,id_member])
            res.json(rows,{message:"update member success"})
        }else{
            const [rows] = await db.query(`update tb_member set fname=?,lname=?,email=?,username=?,role=? where id_member = ? `,[fname,lname,email,username,role,id_member])
            res.json(rows,{message:"update member success"})
        }
        
    } catch (error) {
        console.error("error update member",error);
        res.status(500).json({message:"update member failed"})
    }
})

router.delete('/delete/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_member} = req.params
        
        const [rows] = await db.query(`delete from tb_member where id_member = ? `,[id_member])
        res.json(rows,{message:"delete member success"})

        
    } catch (error) {
        console.error("error delete member",error);
        res.status(500).json({message:"delete member failed"})
    }
})

router.get('/showE',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        
        const [rows] = await db.query(`select * from tb_member where role = 'ผู้รับการประเมินผล' order by id_member desc `)
        res.json(rows,{message:"showE member success"})
        
    } catch (error) {
        console.error("error showE member",error);
        res.status(500).json({message:"showE member failed"})
    }
})


router.get('/showC',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const [rows] = await db.query(`select * from tb_member where role = 'กรรมการประเมิน' order by id_member desc `)
        res.json(rows,{message:"showC member success"})
        
    } catch (error) {
        console.error("error showC member",error);
        res.status(500).json({message:"showC member failed"})
    }
})

module.exports = router