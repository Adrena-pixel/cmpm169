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
var numofbubbles = 20;
var bubbles = [numofbubbles];
var ices = [];
var additionalbubbles = [];
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
    for (let i = 0; i < numofbubbles; i++) {
        bubbles[i] = new Bubble();
    }
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    //background(0);    
    // call a method on the instance
    //myInstance.myMethod();

    // Put drawings here
    background(0);
    for (let i = 0; i < bubbles.length; i++){
        bubbles[i].run();
    }
    for (let i = 0; i < ices.length; i++){
        ices[i].run();
    }
    for (let i = 0; i < additionalbubbles.length; i++){
      additionalbubbles[i].runonce();
  }
}
function mouseDragged(){
  additionalbubbles.push(new Bubble());
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
    ices.push(new Ice());
}

//define my classes
class Bubble {
    constructor(){
      this.x = random(5,windowWidth-5);
      this.y = windowHeight - 10;
      this.d = random(10, 50);
      this.speedx = 1;
      this.speedy = random(-8, -10);
      this.ax = 0;
      this.ay = 0.08;
      this.axmult = random(1,2);
    }
    run(){
      this.move();
      this.edgecheck();
      this.update();
    }
    runonce(){
      this.move();
      this.edgecheckonce();
      this.update();
    }
    move(){
      this.ax = this.axmult * sin(random(0, 180));
      this.x += this.ax;
      if (this.y < windowHeight/2){
        this.speedy += this.ay;
      }
       this.y += this.speedy;
    }
    edgecheck(){
        if (this.y < -5){
          this.x = random(0 + 5,windowWidth + 5);
          this.y = windowHeight - 5;
          this.d = random(10, 50);
          this.speedy = random(-8, -10);
        }
      }
    edgecheckonce(){
      if (this.y <= -10){
        //this.x = random(0 + 5,windowWidth + 5);
        this.y = -50;
        //this.d = random(10, 50);
        this.speedy = 0;
      }
    }
    update(){
      circle (this.x,this.y,this.d);
    }
  }
  class Ice {
    constructor (){
        this.size = random(60,100);
        this.x = random(windowWidth/2-50,windowWidth/2+50);
        this.y = 0 - 5;
        this.speeedy = 7;
        this.ay = -0.1;
        this.speedx = random(-5,5);
    }
    run(){
      this.move();
      this.update();
    }

    move(){
      if (this.y < 0 - 120){
        this.y = 0 - 120;
      }
      else{
        this.speeedy += this.ay;
        this.y += this.speeedy;
        if (this.x < 0 || this.x > windowWidth - 140){
          this.x += 0;
        }
        else{
          this.x += this.speedx;
        }
      }
    }
    update(){
      square(this.x,this.y,this.size);
    }
  }

