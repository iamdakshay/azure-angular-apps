const express = require("express");
const path = require("path");
const ejs = require("ejs");

// get express object
const appServer = express();
appServer.engine("html", ejs.renderFile );
appServer.set("views", path.join(__dirname, "ng-app/dist"));
appServer.use(express.static(path.join(__dirname, 'assets')));
appServer.use(express.static(path.join(__dirname, 'ng-app/dist')));

appServer.get("*", (request, response)=>{
    response.render("index.html");
});

// define port and start express server
const serverPort = process.env.port || 9696;
appServer.listen(serverPort, ()=>{
    console.log("Server is started and listening on port "+ serverPort);
});

const socketsPort = 9697
const sockets = require("socket.io").listen(socketsPort).sockets;
sockets.on("connection", (socket)=>{
    console.log(socket.client.id + " is connected.");
    socket.emit("connected", {clientId: socket.client.id});
    socket.on("send_message", (message)=>{
        console.log(socket.client.id + ":)"+ message);
        sockets.emit("new_message", {from: socket.client.id, text: message});
    });
});