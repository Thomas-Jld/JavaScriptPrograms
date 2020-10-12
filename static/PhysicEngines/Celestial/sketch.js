let celestials = [];

let G = 6.674e-11;

let scale;
let scaleScaler;
let dt = 1/60;
let tx;
let ty;

let sun;
let earth;
let mars;



function setup() {
  createCanvas(700, 700,10);
  tx = width/2;
  ty = height/2;
  angleMode(RADIANS);
  frameRate(5);

  scaleScaler = createSlider(1,8,6,1)
  scale = createSlider(1,10,10,1);

  sun = new Celestial(0, 0, 0, 0, 1.989e30, 696340, [200,0 ,0]);
  celestials.push(sun);
  earth = new Celestial(150e9, 0, 0, 30e3, 5.972e24, 6371, [0,0,200]);
  celestials.push(earth);
}

function draw() {
  background(0);
  celestials.forEach(celestial => {
    celestial.update();
    translate(tx, ty);
    celestial.show();
    translate(-tx,-ty);
  });
}

function Scale(){
  return scale.value()*10**scaleScaler.value();
}

function mousePressed(){
  //celestials.push(new Celestial(mouseX*scale.value(), mouseY*scale.value(), 0, 0, random(1e20,1e25), random(5e4), [random(255), random(255), random(255)]));
}

function keyPressed(){
  if(key == 'r'){
    console.log(celestials[0].position)
  }
  if(key == 'c'){
    celestials = [];
  }
  if(key =='e'){
    tx = -earth.position.x/Scale() + width/2;
    ty = -earth.position.y/Scale() + height/2;
  }
  if(key =='s'){
    tx = -sun.position.x/Scale() + width/2;
    ty = -sun.position.y/Scale() + height/2;
  }
  if(key == 'n'){
    tx = width/2;
    ty = height/2;
  }
}

class Celestial{
  constructor(x,y,vx,vy,m,r,col){
    this.position = new createVector(x,y);
    this.velocity = new createVector(vx,vy);
    this.acceleration = new createVector(0,0);
    this.mass = m;
    this.radius = r;
    this.color = col;
  }

  show(){
    fill(this.color[0], this.color[1], this.color[2]);
    noStroke();
    ellipse(this.position.x/Scale(), this.position.y/Scale(), this.radius/Scale());
  }

  update(){
    let gravitationnalForces = this.attractions();
    //this.acceleration = gravitationnalForces;
    this.velocity.add(this.acceleration.copy().mult(dt));
    this.position.add(this.velocity.copy().mult(dt));
  }

  attractions(){
    let forcesSum = new createVector(0,0);
    celestials.forEach(celestial => {
      if(celestial != this){
        let force = G * (this.mass * celestial.mass) / p5.Vector.dist(this.position, celestial.position)**2  ;
        forcesSum.x += force*cos(p5.Vector.sub(celestial.position, this.position).div(1e6).heading());
        forcesSum.y += force*sin(p5.Vector.sub(celestial.position, this.position).div(1e6).heading());
      }
    });
    return forcesSum;
  }
}
