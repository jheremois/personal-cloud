const express = require('express')
const router = express.Router()

const conection = require('../database/conection')

module.exports = ()=>{
    
    // main:
    router.get('/', (req, res)=>{
        res.render('main')
    })



    class route {
        constructor(file_type, table){
            this.file_type = file_type,
            this.table = table
        }

        work(){
            router.get(`/${this.file_type}`, (req,res)=>{
            
                conection.query(`SELECT * FROM ${this.table}`,(err,result)=>{
                    
                    res.render(this.file_type, {files: result})

                })
            
            })


            router.post(`/${this.file_type}`, async (req,res)=>{

                let file = req.files.file
    
                file.mv(`${process.env.DIREC}/${this.file_type}/${file.name}`,(err)=>{
                    if(err){
                        return res.status(500).send(err);
                    }
    
                    conection.query(`INSERT INTO ${this.table} SET ?`,{
                        filename: file.name
                    },(err,resul)=> {res.redirect(`/${this.file_type}`)})
    
                })
    
            })


        }
        
    }



    // objects
    const image = new route('images', 'images').work()

    const video = new route('video', 'video').work()

    const audio = new route('audio', 'audio').work()

    const document = new route('documents', 'document').work()

    // get

    return router

}