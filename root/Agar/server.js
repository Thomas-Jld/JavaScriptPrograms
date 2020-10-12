// Idea From Daniel Shiffman

let blobs = [];


function Blob(id, x, y, r) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.r = r;
}


let localIp = process.argv[2];
let savedPort = process.argv[3];
// let localIpV4Address = require("local-ipv4-address");

// const editJsonFile = require('edit-json-file');
// let file = editJsonFile('public/infos.json');

// localIpV4Address().then(getIP);

// function getIP(ipAddress){
//   localIp = ipAddress;
//   file.data = [];
//   file.data[0].ip = localIp;
//   file.data[0].port = savedPort;
//   file.save();
// }


console.log("My address is " + localIp + ":" + savedPort);

// Using express: http://expressjs.com/
let express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || savedPort, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  //console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));


// WebSocket Portion
// WebSockets work with the HTTP server
let io = require('socket.io')(server);

setInterval(heartbeat, 33);

function heartbeat() {
  io.sockets.emit('heartbeat', blobs);
}



// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function(socket) {

    console.log("We have a new client: " + socket.id);


    socket.on('start',
      function(data) {
        console.log(socket.id + " x: " + data.x + " y: " + data.y + " r: " + data.r);
        var blob = new Blob(socket.id, data.x, data.y, data.r);
        blobs.push(blob);
      }

    );

    socket.on('update',
      function(data) {
        //console.log(socket.id + " " + data.x + " " + data.y + " " + data.r);
        var blob;
        for (var i = 0; i < blobs.length; i++) {
          if (socket.id == blobs[i].id) {
            blob = blobs[i];
          }
        }
        blob.x = data.x;
        blob.y = data.y;
        blob.r = data.r;
      }
    );



    socket.on('disconnect', function() {
      console.log("Client has disconnected");
        //ships = blobs
      console.log("Client" + socket.id + "has disconnected," + blobs[0].id);
        for (i = 0; i < blobs.length; i++) {
            if (blobs[i].id == socket.id) {
                blobs.splice(i, 1);
            }
        }

    });
  }
);
