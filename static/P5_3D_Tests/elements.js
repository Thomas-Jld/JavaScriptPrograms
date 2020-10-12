class Point {
  constructor(x, y, z, t, r) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.t = t;

    this.r = r; //For display only, no physical purpose
  }

  show() {
    push();
    noStroke();
    fill(255, 90);
    translate(this.x, this.y, this.z);
    //pointLight(255,255,255,0,0,0, this.r/2);
    sphere(this.r);
    //translate(-this.x, -this.y, -this.z);
    pop();
  }
}

class SegmentedLine {
  constructor(x1, x2, y1, y2, z1, z2, t, thickness, r, n) {
    this.t = t;
    this.thickness = thickness; //Thickness of the line itself/the lines themselves
    this.r = r; //Radius of its points
    this.n = n; //Number of points
    this.points = []

    let dx = (x2 - x1) / (n - 1);
    let dy = (y2 - y1) / (n - 1);
    let dz = (z2 - z1) / (n - 1);

    for (let i = 0; i < n; i++) {
      if (points[str(x1 + dx * i) + ':' + str(y1 + dy * i) + ':' + str(z1 + dz * i)] == undefined) {
        let newPoint = new Point(x1 + dx * i, y1 + dy * i, z1 + dz * i, this.t, this.r);
        points[str(x1 + dx * i) + ':' + str(y1 + dy * i) + ':' + str(z1 + dz * i)] = newPoint;
        this.points.push(newPoint);
      } else {
        this.points.push(points[str(x1 + dx * i) + ':' + str(y1 + dy * i) + ':' + str(z1 + dz * i)]);
      }
    }
  }

  show() {
    // let x0,y0,z0;
    // let x1,y1,z1;
    // let x2,y2,z2;
    stroke(240, 240, 255, 50);
    strokeWeight(this.thickness);
    for (let i = 0; i < this.points.length; i++) {
      //this.points[i].show();
      if (i < this.points.length - 1) {
        // push();
        // x1,y1,z1 = this.points[i].x, this.points[i].y, this.points[i].z;
        // x2,y2,z2 = this.points[i+1].x, this.points[i+1].y, this.points[i+1].z;
        // x0,y0,z0 = (x1 + x2)/2, (y1 + y2)/2, (z1 + z2)/2;
        // translate(x0,y0,z0);
        // rotateX(atan((z2 - z0)/(y2 - y0)));
        // rotateY(atan((x2 - x0)/(z2 - z0)));
        // rotateZ(atan((x2 - x0)/(y2 - y0)));
        // noStroke();
        // fill(0,255,0,90);
        // cylinder(this.thickness, sqrt((x2 - x1)**2 + (y2 - y1)**2 + (z2 - z1)**2));
        // pop();
        line(this.points[i].x, this.points[i].y, this.points[i].z, this.points[i + 1].x, this.points[i + 1].y, this.points[i + 1].z);
      }
    }
  }
}

class CenterOfMass{
  constructor(x, y, z, t, r, m){
    this.x = x;
    this.y = y;
    this.z = z;
    this.t = t;
    this.m = m;
    this.r = r;
  }

  show() {
    push();
    stroke(.1);
    fill('#000000');
    translate(this.x, this.y, this.z);
    //pointLight(255,255,255,0,0,0, this.r/2);
    sphere(this.r);
    //translate(-this.x, -this.y, -this.z);
    pop();
  }
}
