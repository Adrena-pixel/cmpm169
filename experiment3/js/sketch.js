// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// Globals
let canvasContainer;



// setup() function is called once when the program starts
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
    //made degree angle
    angleMode(DEGREES);
    DrawingTree();
    
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    //background(100);    
    // call a method on the instance
    //set the 0,0 as the center of the canvas
    
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
    DrawingTree();
}

function branch(len){
    push();
    if (len > 10){
        //control the thickness of the branch
        strokeWeight(map(len,10,100,1,15));
        line(0,0,0,-len);
        //translate reset the position of 0,0
        translate(0,-len);
        //rotate the canvas by degree
        rotate(random(20, 30));
        branch(len * random(0.7,0.9));
        rotate(random(-50, -60));
        branch(len * random(0.7,0.9));
    }
    pop();
}

function DrawingTree(){
    background(100);  
    translate(width/2, height/2 + 200);
    branch(100);
}
