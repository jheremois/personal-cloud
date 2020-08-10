exports.route = class route {
    constructor(router, route,view){
        this.router = router,
        this.route = route,
        this.view = view
    }

    on(){
        
        this.router.get(this.route, (req,res)=>{
            
        res.render(this.view)
    
        })
    }
}