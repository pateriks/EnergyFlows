let fullred = 255;
let fullgreen = 255;
let fullblue = 255;

let cirkus = 0;

var color = 0;
var param = 10;
var speed = 0.1;
var batteri = 0; //av eller på

funtion redgreen(){
    if (i < param * 40) {
        stroke(blue, green, blue);
    } else {
        stroke(red, blue, blue);
    }
}

function setup() {
   console.log('hej');
   createCanvas(1600, 1600);
   angleMode(DEGREES);
}

function draw() {

   background(0);
   translate(800, 800);
   rotate(0);
 //  let hr = hour();
 //  let mn = minute();
 //  let ms = seconds();
   strokeWeight(16);
   noFill();
   cirkus += speed;
   //arc(0, 0, 260, 260, 0, hourAngle);

   if(color == redgreen) {
       for (let i = 0; i < 40; i++) {
           blue = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);

           point(0, i * 17 - 400);
       }
   }else if(color == redellow){
       for (let i = 0; i < 40; i++) {
           blue = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
           if (i < param * 40) {
               stroke(blue, green, blue);
           } else {
               stroke(red, blue, blue);
           }
           point(0, i * 17 - 400);
       }
   }
}
