let li = 100;
let ang;
let ainit = 0;
let slidera;
let sliderb;
let sliderc;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  colorMode(HSB);
  angleMode(RADIANS);
  ang = PI/4;
  slidera = createSlider(0,TWO_PI,PI/4,.01).position(30, 30);
  sliderb = createSlider(0,13,5,1).position(width/2 + 103, 30);
  sliderc = createSlider(0.2,1,0.67,0.01).position(width - 30 - 207, 30);
}

function draw() {
  background(0);
  ang = slidera.value();
  //ang+=0.01;
  let nb = sliderb.value();
  Branche([width/2, height], li, ang,  ainit, nb);

}

function Branche(coord, lon, astp, a, n) {
  if (n < 0) {
    return;
  }
  let x = coord[0] - lon * sin(a-PI);
  let y = coord[1] + lon * cos(a-PI);
  stroke(36*n % 361,255,255);
  line(coord[0], coord[1], x, y);
  Branche([x, y], lon*sliderc.value(),astp,a + astp, n - 1);
  Branche([x, y], lon*sliderc.value(),astp,a - astp, n - 1);
  //Branche([x, y], lon*sliderc.value(),astp,a       , n - 1);
}
