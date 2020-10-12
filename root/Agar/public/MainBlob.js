function Blob(x, y, r) {
  
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0, 0);

  this.update = function() {
    var newvel = createVector(mouseX - width / 2, mouseY - height / 2);
    newvel.div(50);
    //newvel.setMag(3);
    newvel.limit(10);
    this.vel.lerp(newvel, 0.2);
    this.pos.add(this.vel.copy().div(1+ Math.log10(this.r)));
  }


  this.eats = function(other) {
    var d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r && this.r > other.r) {
      var sum = PI * this.r * this.r + PI * other.r * other.r;
      this.r = sqrt(sum / PI);
      //console.log(sum);
      //this.r += other.r;
      return true;

    } else {
      return false;
    }
  }

  this.constrain = function() {
    blob.pos.x = constrain(blob.pos.x, -size/2, size/2);
    blob.pos.y = constrain(blob.pos.y, -size/2, size/2);
  }

  this.show = function() {
    if(spc === 0 ){
      fill(255);
      ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
    else {
      fill(255);
      ellipse(this.pos.x-this.r/3, this.pos.y-this.r/3, this.r, this.r);
      ellipse(this.pos.x+this.r/3, this.pos.y+this.r/3, this.r, this.r);
    }
  }
}
