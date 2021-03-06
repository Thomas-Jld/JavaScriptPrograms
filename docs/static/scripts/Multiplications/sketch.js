let tbl = 6;
let mdl = 6;
let r;
let S1;
let S2;
let a = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = 2 * height / 3;
  angleMode(RADIANS);
  colorMode(HSB);
  S1 = createSlider(0, 1000,96);
  S2 = createSlider(0, 30, 1, 0.1);
  S1.position(10,10);
  S2.position(200,10);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  noFill();
  stroke(255);
  strokeWeight(2);
  // rotate(a);
  // a-=0.01;
  //ellipse(0,0,r);
  for (let i = mdl; i >= 1; i--) {
    let num = (i * tbl) % mdl;
    stroke((i / mdl) * 360, 255, 255);
    line(r / 2 * sin(TWO_PI * i / mdl), r / 2 * cos(TWO_PI * i / mdl), r / 2 * sin(TWO_PI * num / mdl), r / 2 * cos(TWO_PI * num / mdl));
  }
  // tbl += 0.01;
  tbl = S2.value();
  mdl = S1.value();
}
