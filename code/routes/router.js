const express = require('express')
const router = express.Router()

const {route} = require('../controller/routes_controller')
const {file_route} = require('../controller/files_controller')



module.exports = ()=>{
    
    new route(router,'/','home').on()

    new file_route(router,'/images','images').on()

    new file_route(router,'/video','video').on()

    new file_route(router,'/audio','audio').on()

    new file_route(router,'/document','document').on()


    return router


}