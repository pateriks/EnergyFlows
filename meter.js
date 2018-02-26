let full = 255;

let red = 255;
let green = 255;
let blue = 255;

let cirkus = 0;

var puls = 0;
var color = 0;
var param = 10;
var speed = 0.1;
var batteri = 0; //av eller på

function Fgreen(){

    green = full;
    if(!puls) {
        blue = 0;
        red = 0;
    }
}

function Fred(){
    red = full;
    if(!puls) {
        green = 0;
        blue = 0;
    }
}

function Fyellow(){
    red = full;
    green = full;
    if(!puls) {
        blue = 0;
    }
}

function redgreen(i){
    if (i < param * 40) {
        Fred();
    } else {
        Fgreen();
    }
}

function redyellow(i){
    if (i < param * 40) {
        Fred();
    } else {
        Fyellow();
    }
}

function setup() {
   color = 0;
   param = 0.5;
   console.log('Welcome');
   createCanvas(1600, 1600);
   angleMode(DEGREES);

}

function draw() {

   background(0);
   translate(800, 800);
   rotate(0);

   imageMode(CENTER);
   image(this.img, 0, 0, this.r, this.r);

 //  let hr = hour();
 //  let mn = minute();
 //  let ms = seconds();
   strokeWeight(16);
   noFill();
   cirkus += speed;

   //arc(0, 0, 260, 260, 0, hourAngle);
    for (let w = 0; w < 1000; w+= 200) {
        if (color < 1) {
            for (let i = 0; i < 40; i++) {
                red = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
                green = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
                blue = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
                redgreen(i);
                stroke(red, green, blue);
                point(w-400, i * 15 - 400);
            }
        } else {
            for (let i = 0; i < 40; i++) {
                red = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
                green = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
                blue = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
                redyellow(i);
                stroke(red, green, blue);
                point(w-400, i * 17 - 400);
            }
        }
    }
}
