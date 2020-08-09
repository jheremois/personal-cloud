const express = require('express')
const fs = require('fs')
const router = express.Router()

const conection = require('../database/conection')

module.exports = ()=>{
    
    // main:
    router.get('/', (req, res)=>{
        res.render('main')
    })


    const route = (file_type, table)=>{

        // render
        router.get(`/${file_type}`, (req,res)=>{
            
            conection.query(`SELECT * FROM ${table}`,(err,result)=>{
                
                res.render(file_type, {files: result})

            })
            
        })




        // Save:
        router.post(`/${file_type}`, async (req,res)=>{

            let file = req.files.file

            file.mv(`${process.env.DIREC}/${file_type}/${file.name}`,(err)=>{
                if(err){
                    return res.status(500).send(err);
                }

                conection.query(`INSERT INTO ${table} SET ?`,{
                    filename: file.name
                },(err,resul)=> {res.redirect(`/${file_type}`)})
                
            })

        })

    }


    route('images', 'images')

    route('video', 'video')

    route('audio', 'audio')

    route('documents', 'document')


    return router
}