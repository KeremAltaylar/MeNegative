let brush1;
let brush2;
let brush3;
let brush4;
let brush5;
let amp;
let osc;
let osc2;
let env1;
let env2;
let osc3;
let osc4;
let env3;
let env4;
let osc5;
let env5;
let osc6;
let env6;
let reverb;
let root = 33;
let rootint = 33;
let root2 = 33;
let rootint2 = 33;
let root3 = 33;
let rootint3 = 33;
let ind1 = 0;
let comp;
let master;
let tab1 = false;





function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  // button = createButton('play'); 
  // button.mousePressed(toggle);
  

  amp = 0.5;
  reverb = new p5.Reverb();
  comp = new p5.Compressor();
  osc = new p5.Oscillator('sine');
  osc2 = new p5.Oscillator('saw');
  osc3 = new p5.Oscillator('sine');
  osc4 = new p5.Oscillator('saw');
  osc5 = new p5.Oscillator('square');
  
  osc6 = new p5.Oscillator('sine');
  env1 = new p5.Envelope(0.01, 2, 0.5, 0.0001);
  env1.setRange(0.01* amp, 0);
  env2 = new p5.Envelope(0.01, 2, 0.1, 0.0001);
  env2.setRange(0.03 * amp, 0);
  env3 = new p5.Envelope(0.01, 2, 0.1, 0.0001);
  env3.setRange(0.03* amp, 0);
  env4 = new p5.Envelope(0.01, 2, 0.1, 0.0001);
  env4.setRange(0.1* amp, 0);
  env5 = new p5.Envelope(0.01, 2, 0.1,  0.0001);
  env5.setRange(0.003 * amp, 0);
  env6 = new p5.Envelope(0.01, 2, 0.5, 0.0001);
  env6.setRange(0.10 * amp, 0);

  
  //env6.setADSR(0.001, 0.1,0.3,0.1);
  // osc.setType('sine');
  osc.freq(0);
  osc2.freq(0 * 1.333);
  osc3.freq(0 * 2);
  osc4.freq(0 * 2);
  osc5.freq(0);
  osc6.freq(0);

  reverb.process(osc,1,1);
  reverb.process(osc2,1,1);
  reverb.process(osc4,1,1);
  reverb.process(osc3,1,1);
  reverb.process(osc5,1,1);
  reverb.process(osc6,3,3);
  comp.process(reverb);
  comp.threshold(-14);
  comp.knee(100);
  comp.attack(0.1);
  comp.release(0.1);
  comp.ratio(100);
  //comp.process(osc6);
  //env1.play(osc);

  
  
  
  
  brush1 = new Brush(201, 80, 20, 60, 10, 11, 1.2, 50, 70, 50, osc6, 1100,root, env6);
  brush2 = new Brush(62, 100, 32, 43, 17, 18, 1.2, 30, 32,43, osc2,7700, root* 3, env2);
  brush3 = new Brush(603, 400, 20, 21, 21, 14, 1.2, 30, 20, 20,osc3, 8800,root * 7,env3);
  brush4 = new Brush(84, 657, 30, 50, 7, 14, 1.2, 70, 30,50 , osc4, 11000,root * 11,env4);
  brush5 = new Brush(105, 300, 20, 67, 11, 13, 1.2, 30, 20,67 ,osc5,6600, root * 127,env5); 
}

function draw() {
  noStroke();
  smooth();
  colorMode(HSB, 100, 1000, 85);
  fill(random(0, 25), random(75, 125), random(0, 113), random(250));
  brush1.moves();
  brush1.bounces();
  brush1.accelerationLimit();
  brush1.randomSize();
  brush1.displaysEl();
  fill(random(50), random(50), random(125), random(1000));
   brush2.moves();
   brush2.bounces();
   brush2.accelerationLimit();
   brush2.randomSize();
   brush2.displaysRect();
   fill(random(255), random(25), random(255) ); 
   brush3.moves();
   brush3.bounces();
   brush3.accelerationLimit();
   brush3.randomSize();
   brush3.displaysEl();
   fill(random(255), random(78), random(120));
   brush4.moves();
   brush4.bounces();
   brush4.accelerationLimit();
   brush4.randomSize();
   brush4.displaysEl();
   fill(random(255), random(99), random(255));
   brush5.moves();
   brush5.bounces();
   brush5.accelerationLimit();
   brush5.randomSize();
   brush5.displaysEl();
   if ( getMasterVolume() > 1) {
    masterVolume(0, 1);
  } 
}

class Brush {
  constructor(xposi, yposi, xsiz, ysiz, xdire, ydire, spd, lmt, xsrand, ysrand, osctype, freqY, freqX, envN) {
    this.xpos = xposi;
    this.ypos = yposi;
    this.xsize = xsiz;
    this.ysize = ysiz;
    this.xdir = xdire;
    this.ydir = ydire;
    this.speed = spd
    this.intxdir = xdire;
    this.intydir = ydire;
    this.limit = lmt;
    this.xs = xsrand;
    this.ys = ysrand;
    this.oscT = osctype;
    this.freqy = freqY;
    this.freqX = freqX;
    this.envNumb = envN;
    /*this.array1 = ['env',this.envC];
    this.envMesg = join(this.array1,'');
    console.log(this.envMesg);*/

  }
  moves() {
    this.xpos = this.xpos + this.xdir;
    this.ypos = this.ypos + this.ydir;
  }
  randomSize() {
    this.xsize = random(0, this.xs);
    this.ysize = random(0, this.ys);
  }
  bounces() {
    if (this.xpos > windowWidth || this.xpos < 0) {
      this.xdir *= -(this.speed);
      this.oscT.freq(this.freqX);
      this.envNumb.play(this.oscT);
    }
    if (this.ypos > windowHeight || this.ypos < 0) {
      this.ydir *= -(this.speed);
      this.oscT.freq(this.freqY);
      this.envNumb.play(this.oscT);
    }
    if (tab1) {
      this.ypos = windowHeight / 2;
      this.xpos = windowWidth / 2;
     // this.oscT.freq(this.freqY);
     // this.envNumb.play(this.oscT);
    }
  }
  displaysEl() {
    ellipse(this.xpos, this.ypos, this.xsize, this.ysize);
  }
  displaysRect() {
    rect(this.xpos, this.ypos, this.xsize, this.ysize);
  }
  accelerationLimit() {
    if (this.xdir > this.limit || this.ydir > this.limit) {
      this.xdir = this.intxdir;
      this.ydir = this.intydir;
    }
    if (this.xdir < -(this.limit) || this.ydir < -(this.limit)) {
      this.xdir = -1 * (this.intxdir);
      this.ydir = -1 * (this.intydir);
    }
  }
}

function mousePressed() {
  background(0);
//osc.start();
  if(root >400){
    root = rootint;
  }
    root = root * 1.406;
    //osc6.amp(0);
    osc.freq(root*5);
    osc.amp(0.0003);
    env1.play(osc);
  ind1 = ind1 +1;
  console.log(ind1);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if(root3 >800){
      root3 = rootint3;
    }

      root3 = root3 * 2;
    
    osc.freq(root3*7);
    env1.play();
  
  } else if (keyCode === RIGHT_ARROW) {
    if(root2 >200){
      root2 = rootint2;
    }
  
      root2 = root2 * 1.406;
    
    osc.freq(root2*2);
    env1.play();
  } else if (keyCode === UP_ARROW) {
    if(root2 >400){
      root2 = rootint2;
    }
    osc.freq(root*13);
    env1.play();
  }else if (keyCode === DOWN_ARROW) {
    if(root2 >400){
      root2 = rootint2;
    }  
    osc.freq(root*17);
    env1.play();
  }else if (keyCode === SHIFT) {
    tab1 = !tab1;
  }else if (keyCode === CONTROL) {
    osc.start();
    osc2.start();
    osc3.start();
    osc4.start();
    osc5.start();
    osc6.start();
  }
} 


function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}