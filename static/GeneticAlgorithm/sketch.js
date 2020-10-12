// Idea from Daniel Shiffman

var population;
var lifespan = 1000;
//var lifeP;
var count = 0;
var target;
var maxforce = 0.2;
var trialcounter = 0;

let Lastcompleted = 0;
var completedd = 0;
var maxcompletedd = 0;

var bact;
var maxfit = 0;
var lifeSlider;

var widthh = 1200;
var heightt = 800;
var mprec = 10000;
var lprec = 1000;

var mousecX = widthh/2;
var mousecY = 50;

var mx = widthh-300;
var my = 0;
var mw = widthh;
var mh = heightt;

//var cel;
var mutSlider;
var rx = 500;
var ry = 150;
var rw = 700;
var rh = 160;

function keyPressed() {
  if (keyCode === ENTER) {
  mousecX = mouseX;
  mousecY = mouseY;
  }
  console.log(keyCode);
    if (keyCode === 98) {
  rh = mouseY;
  }
    if (keyCode === 100) {
  rx = mouseX
  }
    if (keyCode === 102) {
  rw = mouseX
  }
    if (keyCode === 104) {
  ry = mouseY;
  }
    if (keyCode === 82) {
  count = lifeSlider.value() - 10;
  }
}

function setup() {
  createCanvas(widthh, heightt);

//  lifeP = createP();
  target = createVector(width/2, 80);
  //bact = loadImage("libraries/bact.png");
//  cel = loadImage("Images/Host.png");
  mutSlider = createSlider(0, mprec, 1);
  mutSlider.position(width-185, 90);
  lifeSlider = createSlider(0, lprec,500);
  lifeSlider.position(width-185, 130);

  population = new Population();
}

var MutationRisk = 0;

function draw() {
    target = createVector(mousecX, mousecY);
  background(200);
  population.run();
  //lifeP.html(count);
  MutationRisk = (mutSlider.value())/mprec;
  count++;
  if (count > lifeSlider.value()) {
    for (var i = 0; i < population.rockets.length; i++){
   if( population.rockets[i].end()){
       completedd++;

   }
    }if (completedd > maxcompletedd){
        maxcompletedd = completedd;
    }

    population.evaluate();
    population.selection();
    //population = new Population();
    trialcounter++;
    count = 0;
    Lastcompleted =  completedd;
    completedd = 0;
  }
  fill(0);
  textAlign(CENTER);
  textSize(50);
  text("Menu", width-150, 40);
  textSize(30);
  text("Informations:", width-150, 200);
  textSize(15);

  text( "Taux de mutation : ", width-150, 70);
  text((((MutationRisk*100)).toFixed(2)) + " %", width - 30, 100);
   text( "Temps de vie : ", width-150, 120);
  text(floor(lifeSlider.value())  , width - 30, 140);
  text("Generation" + " " + trialcounter, width-150, 220);
  // text( completedd, 10, 45);
  text( "Nb de reussites max: " + maxcompletedd, width-150, 260);
  if (maxfit == 12000){
      maxfit = maxfit/10;
  }
  text("Meilleur Performance :" + " " + floor(maxfit), width-150, 240);
  text("Nombre de reussite de la", width-150, 280);
  text("serie precedente : " + Lastcompleted, width-150, 295);
  textSize(29);
  text("Compteur : " + count, width-150, 400);
  fill(150);
  rect(rx, ry, rw-rx, rh-ry);
  fill(0,255,0);
  ellipse(target.x, target.y, 16, 16);
  fill(100,50);
  rect(mx, my, mw-mx, mh-my);
  fill(255);
}
