require('dotenv').config()
const express= require('express')
const app= express()
const PORT=process.env.PORT || 3000

const ejs=require('ejs')
const expressLayout =require('express-ejs-layouts')
const path=require('path')  //inbuilt-lib
//importing databse connection
const mongoose =require("mongoose")
const session=require('express-session')
const flash=require('express-flash')
const MongoDbStore=require('connect-mongo')
const { options } = require('laravel-mix')
const passport =require('passport')
const Emitter = require('events')

//Database Connection for MongoDB>=6.0v
const connection=mongoose.connection;
const url='mongodb://localhost:27017/pizza';
mongoose.connect(url,{},(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("Database Connected")
        }
    });



//Basicallly Store and config is a way to create a new collection the MongoDB UI Compass
//Session store
let store =new MongoDbStore({
  mongoUrl: url,
  collection: "sessions"
});

//Event Emitter

const eventEmitter = new Emitter()
app.set('eventEmitter',eventEmitter)


//Session Config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store:store,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //cookie life declaration equivalent to 24hrs
   
  })
);

//Passport Config
const passportInit=require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())


//Assets
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))  //Auth krte time 
app.use(express.json()) //to read json in terminal

//Global Middleware
app.use((req,res,next)=>{
 res.locals.session = req.session
 res.locals.user=req.user
 next()
})


//set template engine

//Since the layout is above the "get method" we are getting Naviagtion panel in all the get method :)
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))  //this append the path home.ejs file to resources/views
app.set('view engine','ejs')


require('./routes/web')(app)  // we imported the file from web.js and then added () to call that function 


const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})


//Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
      // Join
      socket.on('join', (orderId) => {
        socket.join(orderId)
      })
})

eventEmitter.on('orderUpdated', (data) => {
  io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced',()=>{
  io.to('adminRoom').emit('orderPlaced',data)
})