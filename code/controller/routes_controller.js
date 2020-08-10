exports.route = class route {
    constructor(router, direction,view){
        this.router = router,
        this.direction = direction,
        this.view = view
    }

    on(){
        
        this.router.get(this.direction, (req,res)=>{
            
        res.render(this.view)
    
        })
    }
}