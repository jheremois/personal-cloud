const express = require('express')

const router = express.Router()

module.exports = ()=>{
    
    // main:
    router.get('/', (req, res)=>{
        res.render('main')
    })


    const route = (file_type)=>{
        // render
        router.get(`/${file_type}`, (req,res)=>{
            res.render(file_type)
        })
    
        // Save:
        router.post(`/${file_type}`, async (req,res)=>{
        
            let file = req.files.file

            file.mv(`${process.env.DIREC}/${file_type}/${file.name}`,(err)=>{
                if(err){
                    return res.status(500).send(err);
                }
                res.redirect(`/${file_type}`)
            })
        })
    }
    

    route('images')

    route('video')

    route('audio')

    route('documents')


    return router
}