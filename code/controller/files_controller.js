const conection = require('../database/conection')

exports.file_route = class file_route {
    constructor(router,get_and_post,view_and_table){
        this.router = router,
        this.get_and_post = get_and_post,
        this.view_and_table = view_and_table
    }

    on(){
        this.router.get(this.get_and_post, (req,res)=>{
        
            conection.query(`SELECT * FROM ${this.view_and_table}`,(err,result)=>{
                
                res.render(this.view_and_table, {files: result})

            })
        
        })


        this.router.post(this.get_and_post, async (req,res)=>{

            let file = req.files.file

            file.mv(`${process.env.DIREC}/${this.view_and_table}/${file.name}`,(err)=>{
                if(err){
                    return res.status(500).send(err);
                }

                conection.query(`INSERT INTO ${this.view_and_table} SET ?`,{
                    filename: file.name
                },(err,resul)=> {res.redirect(this.get_and_post)})

            })

        })

    }
    
}