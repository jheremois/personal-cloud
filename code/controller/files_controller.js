const conection = require('../database/conection')

exports.file_route = class file_route {
    constructor(router,file_type, table){
        this.router = router,
        this.file_type = file_type,
        this.table = table
    }

    on(){
        this.router.get(`/${this.file_type}`, (req,res)=>{
        
            conection.query(`SELECT * FROM ${this.table}`,(err,result)=>{
                
                res.render(this.file_type, {files: result})

            })
        
        })


        this.router.post(`/${this.file_type}`, async (req,res)=>{

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