const cookieParser = require('cookie-parser');
const express = require('express');
require('./src/infrastructure/socket.js');
require('dotenv').config();

const app = express();
const http = require("http");
const {Server}= require("socket.io");
const cors = require("cors");
//regular middleware
const corsOptions = {
    origin: 'http://localhost:3000',
  };

app.use(express.json());
app.use(cors(corsOptions));

// app.use(express.urlencoded({extended: true}));
//cookie middleware

app.use(cookieParser());

const userRouter = require('./src/routes/userRoutes');
const postRouter = require('./src/routes/postRoutes');

app.use('/api', userRouter);
app.use('/api',postRouter);

// app.get('/',(req, res)=>{
//     res.send("Hi from youtube live");
// })

// app.post('/api/login',(req,res)=>{
//     res.status(200).json({message:"bienvenu"});
// })

const server = http.createServer(app);

const io = require('./src/infrastructure/socket.js').init(Server, server);
io.on("connection", (socket)=>{
    console.log(`User Connected : ${socket.id}`);

    socket.on("send_message", (data)=>{
        console.log('data',data);
        socket.broadcast.emit("receive_message",data);
    })
})

server.listen(8080, ()=>{
    console.log("SERVER IS RUNNING ON ")
})