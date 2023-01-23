// sketch.js - purpose and description here
// Author: Ethan Wang
// Date: 2/34/2023

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
// Globals
let myInstance;
let canvasContainer;


// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
    // create an instance of the class
    //myInstance = new MyClass(VALUE1, VALUE2);

    var centerHorz = windowWidth / 2;
    var centerVert = windowHeight / 2;
    noStroke();
    var x = random(0,windowWidth);
    var y = windowHeight - 10;
    var d = random(10, 30);
    var speedx = 1;
    var speedy = -10
    bubbles= new Bubble(x, y, d, speedx, speedy);
    
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    //background(0);    
    // call a method on the instance
    //myInstance.myMethod();

    // Put drawings here
    background(0);
    bubbles.run();
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}
class Bubble {
    constructor(_x,_y,_d,_speedx,_speedy){
      this.x = _x;
      this.y = _y;
      this.d = _d;
      this.speedx = _speedx;
      this.speedy = _speedy;
      this.ax = 0;
      this.ay = 0.1;
      this.axmult = 1.3;
    }
    run(){
      this.move();
      this.update();
    }
    move(){
      this.ax = this.axmult * sin(random(0, 180));
      this.x += this.ax;
      if (this.y < windowHeight/3){
        this.speedy += this.ay;
      }
       this.y += this.speedy;
      
    }
    update(){
      background(0);
      circle (this.x,this.y,this.d);
    }
  }

