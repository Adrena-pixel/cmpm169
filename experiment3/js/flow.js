// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// Globals
let canvasContainer;
var flows = [];
var numofflows = 5000;
var noiseScale = 300;
var noiseStrength = 5;
var bgAlpha = 10;
var flowAlpha = 90;

function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        //console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });

    var centerHorz = windowWidth / 2;
    var centerVert = windowHeight / 2;
    for (var i = 0; i < numofflows; i++){
        flows[i] = new flow();
    }
    
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    fill(255, bgAlpha);
    noStroke();
    rect(0,0, windowWidth, windowHeight);
    
    
    for (var i = 0; i < flows.length; i++) {
        stroke(0, flowAlpha);
        //flows[i].flowdraw(noiseScale, noiseStrength); 
       flows[i].flowdraw(noiseScale, noiseStrength);  
    }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed

}

class flow {
    constructor() {
        this.vector = createVector(random(0,windowWidth), random(0,windowHeight));
        this.vectorold = this.vector.copy;
        this.randomness = random(1,5);
        this.angle;
        this.strokeWeight = random(1,3);
    }

    flowdraw(noiseScale, noiseStrength){
        this.updateangle(noiseScale, noiseStrength);
        this.update();
        
    }

   update() {
        this.vector.x += sin(this.angle) * this.randomness;
        this.vector.y += cos(this.angle) * this.randomness;
        //check if the vector is out of screen
        if (this.vector.x < 0 || this.vector.x > windowWidth || this.vector.y < 0 || this.vector.y > windowHeight){
            //if it is out, reset it in screen
            this.vector.set(random(0,windowWidth), random(0,windowHeight));
            this.vectorold = this.vector.copy();
        }
        strokeWeight(this.strokeWeight * this.randomness);
        line(this.vectorold.x, this.vectorold.y, this.vector.x, this.vector.y);
        this.vectorold = this.vector.copy();
    }

    updateangle(noiseScale, noiseStrength){
        this.angle = noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * noiseStrength;
    }
}