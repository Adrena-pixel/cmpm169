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
var numofbubbles = 30;
var bubbles = [numofbubbles];
var ices = [];
var additionalbubbles = [];
var bgvalue = [[54,1,3],[189, 233, 203],[255,128,22]];
var bubblevalue = [[173, 39, 46,95], [255,255,255,95],[255,209,16,95]]
var colorpicker = 0;
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
    // Put drawings here
    fill(bgvalue[colorpicker][0],bgvalue[colorpicker][1],bgvalue[colorpicker][2]);
    rect(0, 0, windowWidth, windowHeight);
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
function doubleClicked() {
    // code to run when mouse is pressed
    ices.push(new Ice());
}
function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode === 65) {
    if (colorpicker  == 0){
      colorpicker = bgvalue.length - 1;
    }
    else{
      colorpicker--;
    }
  } 
  else if (keyCode === RIGHT_ARROW  || keyCode === 68) {
    if (colorpicker == bgvalue.length - 1){
      colorpicker = 0;
    }
    else{
      colorpicker++;
    }
  }
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
      fill(bubblevalue[colorpicker][0],bubblevalue[colorpicker][1],bubblevalue[colorpicker][2],bubblevalue[colorpicker][3]);
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
      fill(255,248,255, 98);
      square(this.x,this.y,this.size);
    }
  }

