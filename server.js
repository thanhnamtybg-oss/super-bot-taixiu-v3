
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function genResult(){
    const d1 = Math.ceil(Math.random()*6);
    const d2 = Math.ceil(Math.random()*6);
    const d3 = Math.ceil(Math.random()*6);
    const total = d1 + d2 + d3;
    const isBao = (d1===d2 && d2===d3);
    const result = isBao ? "BÃO" : (total>=11 ? "TÀI" : "XỈU");

    return {
        dice:[d1,d2,d3],
        total,
        result,
        round: Math.floor(Math.random()*999999),
        time: Date.now()
    };
}

// REST API
app.get("/api/latest", (req,res)=> res.json(genResult()));

// Websocket realtime push
io.on("connection", sock=>{
    console.log("Client connected");
});

// Push every 1.5 seconds
setInterval(()=>{
    io.emit("update", genResult());
},1500);

// Pages
app.get("/",(req,res)=> res.sendFile(path.join(__dirname,'public/index.html')));
app.get("/go88",(req,res)=> res.sendFile(path.join(__dirname,'public/go88.html')));
app.get("/dashboard",(req,res)=> res.sendFile(path.join(__dirname,'public/dashboard.html')));
app.get("/ai",(req,res)=> res.sendFile(path.join(__dirname,'public/ai.html')));
app.get("/pattern",(req,res)=> res.sendFile(path.join(__dirname,'public/pattern.html')));

server.listen(3000,()=> console.log("Server running on port 3000"));
