let r = 275;
let ec = 10;

let eh, emin, esec, emilli;
let h,min, sec, milli;
let prevsec;

function setup() {
    createCanvas(windowWidth,windowHeight);
    angleMode(DEGREES);
}

function draw() {
    background(100);
    translate(width/2,height/2);
    rotate(-90);
    h = hour();
    min = minute();
    sec = second();
    milli = millis();

    strokeWeight(3);
    eh = map(h % 12, 0 , 12, 0, 360);
    noFill();
    stroke(76, 0, 153);
    arc(0,0,r,r,0,eh);

    push();
    rotate(eh);
    stroke(76, 0, 153);
    line(0,0,50,0);
    pop();

    emin = map(min, 0 , 60, 0, 360);
    noFill();
    stroke(200, 200, 0);
    arc(0,0,r+ec,r+ec,0,emin);

    push();
    rotate(emin);
    stroke(200, 200, 0);
    line(0,0,100,0);
    pop();

    esec = map(sec, 0 , 60, 0, 360);
    noFill();
    stroke(50,150,255);
    arc(0,0,r+2*ec,r+2*ec,0,esec);

    push();
    rotate(esec);
    stroke(50,150,255);
    line(0,0,110,0);
    pop();

    emilli = map(milli, 0 , 1000, 0, 360);
    noFill();
    stroke(100, 255, 200);
    arc(0,0,r+3*ec,r+3*ec,0,emilli);

    push();
    rotate(emilli);
    stroke(100, 255, 200);
    line(0,0,120,0);
    pop();
}
