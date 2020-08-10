// Dependencies
const express = require('express')
const path = require('path')
const http = require('http')
const fileUpload = require('express-fileupload')
const morgan = require('morgan')



const app = express()



// Config
app.use(express.static(path.join(__dirname,'./public')))

app.set('view engine', 'pug')

app.set('views', path.join(__dirname, 'views'))



// Middlewares
app.use(morgan('dev'))

app.use(fileUpload())

const env = require('node-env-file')

env('./.env')

app.use(express.urlencoded({extended: true}))
  


// Port
app.set('port', process.env.PORT || 5000)

const port = app.get('port')



// Routes
const routes = require('./routes/router')
const { urlencoded } = require('body-parser')

app.use('/', routes())



// Server
const server = http.createServer(app)

server.listen(port, ()=>{
    console.log(`hots: ${port}`)
})
