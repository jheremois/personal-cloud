const express = require('express')
const router = express.Router()
const conection = require('../database/conection')



// Routes creator class:
class route {
    constructor(file_type, table){
        this.file_type = file_type,
        this.table = table
    }

    on_line(){
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



// Routes:
module.exports = ()=>{
    
    router.get('/', (req, res)=>{
        res.render('main')
    })

    const image = new route('images', 'images').on_line()

    const video = new route('video', 'video').on_line()

    const audio = new route('audio', 'audio').on_line()

    const document = new route('documents', 'document').on_line()


    return router

}