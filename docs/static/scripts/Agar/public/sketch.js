var socket;
var place;
var blob;
var alive = true;
var blobs = [];
var sblobs = [];
var zoom = 1;
var skip = true;

let size = 10000;
let adresse;
let hostId;
var spc = 0;



function setup() {
  pixelDensity(1);
  Hei = windowHeight;
  Wid = windowWidth;
  // Hei = 900;
  // Wid = 900;
  createCanvas(Wid, Hei);
  hostId = document.getElementById('HostId').innerHTML;

  adresse = window.location.href.split('/')[2].split(':');
  ip = adresse[0];
  port = str(int(adresse[1]) + 1);
  console.log(ip, port);
  //Connection au serveur{% url logout_view %}

  socket = io.connect('http://' + ip +':' + port);

  socket.on('connect_error', function(){window.location.replace("{% url agar-home %}")});
  socket.on('disconnect', function(){window.location.replace("{% url agar-home %}")});
  //Création du blob
  blob = new Blob(hostId, random(size)-size/2, random(size)-size/2, 17);

  //Envoie la création du blob au serveur
  var data = {
    hostId: blob.hostId,
    x: blob.pos.x,
    y: blob.pos.y,
    r: blob.r
  };


  console.log(data);
  socket.emit('start', data);
  socket.emit('update', data);

  //Reception des données des blobs
  socket.on('heartbeat',
    function(data) {
      //console.log(data);
      blobs = data;
    }
  );

  //Nourriture du blob (local pour le moment, chacun sa bouffe)
  for (let i = 0; i < 1000; i++) {
    let x = random(-size/2,size/2);
    let y = random(-size/2,size/2);
    sblobs[i] = new NormalBlob(x, y, random(10,30));
  }
    //socket.emit('sblobs', sblobs)

}

function draw() {

  background(200);

  textSize(16);
  var newr = Math.trunc(blob.r);
  text(newr, 30 , 30);

  translate(width / 2, height / 2);
  fill(255, 0 , 0);
  ellipse(0 , 0 , 10);
  if (alive){
    var newzoom = 64 / blob.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);
  }
  else{
    zoom = lerp(zoom, 0.12, 0.1);
    scale(zoom);
    translate(width/2, height/2);
  }
//Split





//Manger


  for (var i = sblobs.length-1; i >=0; i--) {
    sblobs[i].show();
    if (blob.eats(sblobs[i])) {
      var bx = random(-size/2,size/2);
      var by = random(-size/2,size/2);
      sblobs[i] = new NormalBlob(bx, by, random(10,30));
    }
  }

//Manger ou être mangé

  var pos11 = createVector(blob.pos.x, blob.pos.y);

  for(var j = 0; j<blobs.length; j++){
    if(blobs[j].id !== socket.id && blobs[j].hostId == blob.hostId){
      var pos21 = createVector(blobs[j].x, blobs[j].y);
      var d1 = p5.Vector.dist(pos11, pos21);

      if (d1 < blob.r && blob.r > blobs[j].r) {
        var sum1 = PI * blob.r * blob.r + PI * blobs[j].r * blobs[j].r;
        blob.r = sqrt(sum1 / PI);
      //  blobs.splice(j, 1);
        blobs[j].r = 0;
      }

      if (d1 < blobs[j].r && blob.r < blobs[j].r) {
        blob.r = 0;
        alive = false;
      }
    }
  }


 // for (var i = sblobs.length-1; i >=0; i--) {if (blob.eats(blobs[i])) {blobs.splice(i, 1); }}
//Dessine les autres blobs
  for (var i = blobs.length - 1; i >= 0; i--) {
    //var id = blobs[i].id;
    if (blobs[i].id !== socket.id && blobs[i].hostId == blob.hostId) {
      fill(0, 0, 255, 100);
      ellipse(blobs[i].x, blobs[i].y, blobs[i].r * 2, blobs[i].r * 2);

      fill(0);
      textAlign(CENTER);
      textSize(4);
      text(blobs[i].id, blobs[i].x, blobs[i].y + blobs[i].r);

    }
     //blobs[i].show();
     //if (blob.eats(blobs[i])) {
     //  blobs.splice(i, 1);
     //}
  }

  //Affiche le blob
  blob.show();

  //Accelerer
  if (mouseIsPressed) {
    //console.log(blob.pos.x, blob.pos.y);
    blob.vel.x = blob.vel.x +  (mouseX - width / 2)/100;
    blob.vel.y = blob.vel.y +  (mouseY - height / 2)/100;
  }

  //Mettre localement le blob à jour
  blob.update();
  blob.constrain();

  //Mettre à jour les données de ce blob au serveur
  var data = {
    x: blob.pos.x,
    y: blob.pos.y,
    r: blob.r
  };

  socket.emit('update', data);

  if (skip == true){
    for (var i = 0; i > blobs.length; i++) {
      if (blobs[i].id === socket.id) {
        place = i;
        console.log(place);
        skip = false;
      }
    }
  }

}


function keyPressed(){
  if(keyCode = ENTER){
    for(let i = 0; i < sblobs.length; i++){
      sblobs[i].update();
    }
  }
  if (keyCode === TAB) {
    spc = 1;
  } else {
    spc = 0;}
}
