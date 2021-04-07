
let l0 = 100;

let fr = 60;
let dt = 1/fr;
let i = 0;
let g;
let focus = false;

let G = 0.1;
let m = 100000;//Masse de la souris

let C1 = .03;

let muC = 20; //Coefficient de frotement cinetique

let f1 = true;
let f2 = true;
let f3 = true;
let f4 = true;//Bords
let f5 = true;
let f6 = true;

let ressorts = [];
let aimants = [];

p5.disableFriendlyErrors = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let ressort1 = new Ressort(width/2,height/2 - 100, 200);
  ressorts.push(ressort1);

  let ressort2 = new Ressort(width/2,height/2 + 100, 0);
  ressorts.push(ressort2);

  ressorts.push(new Ressort(width/4 + 10,height/4 + 100, 100));

  aimants.push(new Aimant(400,400, 5, 10000));
  //aimants.push(new Aimant(400,200, 5, 10000));

  angleMode(RADIANS);
  g = new createVector(0,98.1);
  frameRate(30);
  setInterval(updateEntities, dt)
}


function updateEntities(){
  ressorts.forEach(r => r.update());
}


function draw() {
  background(0, 50);
  ressorts.forEach(r => r.show());
  aimants.forEach(a => a.show());
  //ressort.p1.y += 10*cos(i/10);


  let fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);
}

function mousePressed(){
  background(0);
  focus = !focus;
}

function keyPressed(){
  if(key == 'r'){
    f1 = !f1;
  }
  if(key == 'a'){
    f2 = !f2;
  }
  if(key == 'g'){
    f3 = !f3;
  }
  if(key == 'b'){
    f4 = !f4;
  }
  if(key == 'f'){
    f5 = !f5;
  }
  if(key =='m'){
    f6 = !f6;
  }
}

class Aimant{
  constructor(x0,y0, r, B){
    this.pos = new createVector(x0,y0);
    this.r = r;
    this.B = B;
  }
  show(){
    stroke(255);
    strokeWeight(3);
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}

class Ressort{
  constructor(x0,y0, l0){
    this.p1 = new createVector(width/2,height/2);
    this.p2 = new createVector(x0 ,y0);
    this.vit1 = new createVector();
    this.vit2 = new createVector();
    this.acc1 = new createVector();
    this.acc2 = new createVector();
    this.m1 = 10;
    this.m2 = 20;
    this.l0 = l0;
  }

  update(){

    this.p1.limit(10e99)
    this.p2.limit(10e99)
    this.acc2 = new createVector();
    this.acc1 = new createVector();

    let forceRappel = 1 * (Math.sqrt((this.p1.x - this.p2.x)**2 + (this.p1.y - this.p2.y)**2)- this.l0);

    let resistanceAir1 = Ressort.determinerAccel(C1*p5.Vector.mag(p5.Vector.mult(this.vit1,this.vit1)), new createVector(0,0), this.vit1 ); //p5.Vector.mult(this.vit1,this.vit1)
    let resistanceAir2 = Ressort.determinerAccel(C1*p5.Vector.mag(p5.Vector.mult(this.vit2,this.vit2)), new createVector(0,0), this.vit2 ); //p5.Vector.mult(this.vit2,this.vit2)

    let aimantation1 = new createVector();
    let aimantation2 = new createVector();

    aimants.forEach(a => {
      aimantation1.add(Ressort.determinerAccel(a.B/p5.Vector.dist(this.p1, a.pos), a.pos, this. p1));
      aimantation2.add(Ressort.determinerAccel(a.B/p5.Vector.dist(this.p2, a.pos), a.pos, this. p2));
    });
    aimantation1.limit(100);
    aimantation2.limit(100);

    stroke(0,255,0);
    strokeWeight(5);
    line(this.p2.x, this.p2.y, this.p2.x + resistanceAir2.x, this.p2.y + resistanceAir2.y);
    line(this.p1.x, this.p1.y, this.p1.x + resistanceAir1.x, this.p1.y + resistanceAir1.y);


    if(f1){
      this.acc2.add(Ressort.determinerAccel(forceRappel, this.p1, this.p2));
      this.acc1.add(this.acc2.copy().mult(-1));
    }

    if(f2){
      this.acc2.add(resistanceAir2);
      this.acc1.add(resistanceAir1);
    }

    if(f3){
      this.acc2.add(g);
      this.acc1.add(g);
    }

    if(f4){this.border();}
    // if(focus){
    //   let forceAttraction = G * (m + this.m1)/((this.p1.x - mouseX)**2 + (this.p1.y - mouseY)**2);
    //   this.acc1.add(Ressort.determinerAccel(forceAttraction, new createVector(mouseX,mouseY), this.p1));
    // }

    if(f6){
      this.acc2.add(aimantation2);
      this.acc1.add(aimantation1);
    }

    let dvit2 = this.acc2.copy().mult(dt);
    this.vit2.add(dvit2);

    let dvit1 = this.acc1.copy().mult(dt);
    this.vit1.add(dvit1);

    let dpos2 = this.vit2.copy().mult(dt);
    this.p2.add(dpos2);
    let dpos1 = this.vit1.copy().mult(dt);

    this.p1.add(dpos1);

    if(focus){
      this.p1.x = mouseX;
      this.p1.y = mouseY;
      this.vit1.x = 0;
      this.vit1.y = 0;
      this.acc1.x = 0;
      this.acc1.y = 0;
    }

  }

  static determinerAccel(force, pA, pB){
    return new createVector(force*Math.cos(pA.copy().sub(pB).heading()), force*Math.sin(pA.copy().sub(pB).heading()));
  }

  border(){
    let absorbtion = .95;
    if(this.p1.y > height){
      this.p1.y = height - 5;
      this.vit1.y *= -absorbtion;
      if(f5 && this.vit1.x != 0){this.acc1.add(-1*muC*g.y*this.vit1.x/abs(this.vit1.x),0)}
    }

    if(this.p2.y > height){
      this.p2.y = height - 5;
      this.vit2.y *= -absorbtion;
      if(f5 && this.vit2.x != 0){this.acc2.add(-1*muC*g.y*this.vit2.x/abs(this.vit2.x),0)}
    }

    if(this.p1.y < 0){
      this.p1.y = 5;
      this.vit1.y *= -absorbtion;
    }

    if(this.p2.y < 0){
      this.p2.y = 5;
      this.vit2.y *= -absorbtion;
    }

    if(this.p1.x > width){
      this.p1.x = width - 5;
      this.vit1.x *= -absorbtion;
    }

    if(this.p2.x > width){
      this.p2.x = width - 5;
      this.vit2.x *= -absorbtion;
    }

    if(this.p1.x < 0){
      this.p1.x = 5;
      this.vit1.x *= -absorbtion;
    }

    if(this.p2.x < 0){
      this.p2.x = 5;
      this.vit2.x *= -absorbtion;
    }
  }

  show(){
    if(this.p1.dist(this.p2) > this.l0){
      stroke(100,0,0);}
    else{stroke(0,0,100);}
    //stroke(100,0,0);
    strokeWeight(10);
    point(this.p1.x,this.p1.y);
    point(this.p2.x,this.p2.y);
    line(this.p1.x,this.p1.y,this.p2.x,this.p2.y);
    // stroke(255);
    // textSize(30)
    // text(Math.round(this.vit1.mag()),20,30);
    // text(Math.round(this.vit2.mag()),20,70);

  }
}
