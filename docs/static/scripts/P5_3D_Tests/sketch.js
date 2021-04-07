let points = {};
let lines = [];
let centers = [];

let X = -30;
let Y = -30;
let Z = -150;
let centerX = 0;
let centerY = 0;
let centerZ = 0;

let size = 0.4;
let nbx = 4;
let nby = 4;
let nbz = 4;

let fps;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  for (let y = -50; y < 51; y += 100 / (nby - 1)) {
    for (let x = -50; x < 51; x += 100 / (nbx - 1)) {
      lines.push(new SegmentedLine(x, x, y, y, -50, 50, 0, size, size, nbz));
    }
    for (let z = -50; z < 51; z += 100 / (nbz - 1)) {
      lines.push(new SegmentedLine(-50, 50, y, y, z, z, 0, size, size, nbx));
    }
  }

  for (let x = -50; x < 51; x += 100 / (nbx - 1)) {
    for (let z = -50; z < 51; z += 100 / (nbz - 1)) {
      lines.push(new SegmentedLine(x, x, -50, 50, z, z, 0, size, size, nby));
    }
  }
  frameRate(60);
  pixelDensity(1.5);
  angleMode(RADIANS);

  centers.push(new CenterOfMass(0, 0, 0, 0, 5, 100))
  centers.push(new CenterOfMass(100, 0, 0, 0, 5, 100))
  // centers.push(new CenterOfMass(-100, 0, 0, 0, 5, 100))
}

function draw() {
  background(20);
  camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);
  //orbitControl();
  // strokeWeight(.1);
  // stroke(0);
  // fill('#000000');
  // sphere(5);

  centers.forEach(center => {
    center.show();
  });

  lines.forEach(line => {
    line.show();
  });

  Object.keys(points).forEach(pos => {
    point = points[pos];
    point.show();
    // pointConvergence(point, pos, 0.1);
    if (floor(frameCount / 50) % 2 == 0) {
      pointConvergence(point, pos, 0.1);
    } else {
      explosion(point, pos, 0.08);
    }
    // sphereConvergence(point);
    vortex(point);

    //points[pos].y += 2*cos(0.1*frameCount+ points[pos].z*0.02);
  });
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    Y += 10;
  } else if (keyCode == DOWN_ARROW) {
    Y -= 10;
  } else if (keyCode == LEFT_ARROW) {
    X -= 10;
  } else if (keyCode == RIGHT_ARROW) {
    X += 10;
  } else if (keyCode == 109) { //Numpad Substract
    Z += 10;
  } else if (keyCode == 107) { //Numpad Add
    Z -= 10;
  }
}

function Fps() {
  fps = frameCount * 1000 / millis();
  return fps;
}




function sphereConvergence(point) {
  let dist = sqrt(int(point.x) ** 2 + int(point.y) ** 2 + int(point.z) ** 2);
  let nf = map(dist, 50, 100, 1, 0);
  // point.x *= exp(-nf*0.01);
  // point.y *= exp(-nf*0.01);
  // point.z *= exp(-nf*0.01);

  point.x *= nf;
  point.y *= nf;
  point.z *= nf;
}

function pointConvergence(point, pos, rate) {
  centers.forEach( center => {
    let dist = sqrt(float(point.x - center.x) ** 2 + float(point.y - center.y) ** 2 + float(point.z - center.z) ** 2);
    point.x = (1 - exp(-dist * rate))*(point.x - center.x) + center.x;
    point.y = (1 - exp(-dist * rate))*(point.y - center.y) + center.y;
    point.z = (1 - exp(-dist * rate))*(point.z - center.z) + center.z;
  });



  if (frameCount % 800 == 0) {
    point.x = pos.split(':')[0];
    point.y = pos.split(':')[1];
    point.z = pos.split(':')[2];
  }
}

function explosion(point, pos, rate) {
  centers.forEach( center => {
    let dist = sqrt(float(point.x - center.x) ** 2 + float(point.y - center.y) ** 2 + float(point.z - center.z) ** 2);
    point.x =  (1 + exp(-dist * rate))*(point.x - center.x) + center.x;
    point.y =  (1 + exp(-dist * rate))*(point.y - center.y) + center.y;
    point.z =  (1 + exp(-dist * rate))*(point.z - center.z) + center.z;
  });

  if (frameCount % 800 == 0) {
    point.x = pos.split(':')[0];
    point.y = pos.split(':')[1];
    point.z = pos.split(':')[2];
  }
}

function vortex(point) {
  let theta = 0.1;
  point.x =  point.x * cos(theta) + point.y * sin(theta);
  point.y = -point.x * sin(theta) + point.y * cos(theta);
}
