// Idea from Daniel Shiffman

function Rocket(dna) {
  this.pos = createVector(width / 2 , height - 50);
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;
  this.crashed = false;

  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.calcFitness = function() {
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);

    this.fitness = map(d, 0, width, width, 0);
    if (this.completed) {
      this.fitness *= (10+(1/count)*lifeSlider.value());
    }
    if (this.crashed) {
      this.fitness /= 10;
    }

  }
  this.end = function() {

    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 10) {
      return true;
    }}
  
  this.update = function() {

    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 10) {
      this.completed = true;
      this.pos = target.copy();
    }

    if (this.pos.x > rx && this.pos.x < rw && this.pos.y > ry && this.pos.y < rh) {
      this.crashed = true;
    }
    if (this.pos.x > mx && this.pos.x < mw && this.pos.y > my && this.pos.y < mh) {
      this.crashed = true;
    }

    if (this.pos.x > width || this.pos.x < 0) {
      this.crashed = true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.crashed = true;
    }



    this.applyForce(this.dna.genes[count]);
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }

  this.show = function() {
  push();
    noStroke();
    fill(200, 0,0,150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }

}
