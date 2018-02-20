let red = 255;
let green = 255;
let blue = 255;
var param = 10;
let cirkus = 0;
var speed = 0.1;

function setup() {
   console.log('hej');
   createCanvas(800, 800);
   angleMode(DEGREES);
}

function draw() {

   background(0);
   translate(400, 400);
   rotate(0);
 //  let hr = hour();
 //  let mn = minute();
 //  let ms = seconds();
   strokeWeight(8);
   noFill();
   cirkus += speed; 
  //stroke(150, 255, 100);
   //arc(0, 0, 260, 260, 0, hourAngle);
   //stroke(150, 255, 100);
   //line(0, 0, 50, 0);
   for(let i = 0; i < 40; i++){
     blue = map(sin(cirkus + i*(360/20)), -1, 1, 0, 255);
     if(i > param*40){
       stroke(red, green, blue);
     }else{
       stroke(red, 0, blue);
     }
     point(0, i*10 - 200);
   }
}
