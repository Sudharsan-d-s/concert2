const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app) ;

const io = require('socket.io')(
    httpServer, 
    {
        cors:{
            methods: ["GET" , "POST"],
            origin: "http://localhost:3000",
        }
    }
);

io.on('connection' , (socket)=>{
    console.log(socket.id);
})

app.get('/' , (req , res)=>{
    res.send('vanakam');
})


httpServer.listen(4000 , ()=>console.log('server listening to port: 4000'));