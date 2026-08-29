const express = require("express")
const bc = require('bcrypt')
const router = express.Router()
const db = require('../../db')
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_eva} = req.params
        await db.query(`delete from tb_commit where id_eva = ?`,[id_eva])
        const m = req.body
        const v = m.map(p=>[id_eva,p.id_member,'n',p.role])
        const [rows] = await db.query(`insert into tb_commit(id_eva,id_member,status_commit,level_commit) values ?`,[v])
        res.json(rows,{message:"save commit success"})
    } catch (error) {
        console.error("error save commit",error);
        res.status(500).json({message:"save commit failed"})
    }
})

router.delete('/delete/:id_commit',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_commit} = req.params
        
        const [rows] = await db.query(`delete from tb_commit where id_commit = ? `,[id_commit])
        res.json(rows,{message:"delete commit success"})

        
    } catch (error) {
        console.error("error delete commit",error);
        res.status(500).json({message:"delete commit failed"})
    }
})

router.get('/header/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const {id_eva} = req.params
         const [rows] = await db.query(`select * from tb_system s,tb_member m,tb_eva e where e.id_eva = ? and s.id_sys = e.id_sys and m.id_member = e.id_member`,[id_eva])
        res.json(rows[0],{message:"show round success"})
        
    } catch (error) {
        console.error("error show eva",error);
        res.status(500).json({message:"show eva failed"})
    }
})


router.get('/member/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        const {id_eva} = req.params
        const [pick] = await db.query(`select id_member,concat(fname,'',lname)as fullname_commit from tb_member where role = 'กรรมการประเมิน'`)
        const [picked] = await db.query(`select m.id_member,id_commit,fname,lname,level_commit as role from tb_member m , tb_eva e, tb_commit c where c.id_eva = ? and c.id_eva = e.id_eva and c.id_member = m.id_member`,[id_eva])
        res.json({pick,picked})
        
    } catch (error) {
        console.error("error commit member",error);
        res.status(500).json({message:"commit member failed"})
    }
})

module.exports = router