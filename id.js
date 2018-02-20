let red = 0;
let green = 0;
let blue = 0;
var ofset = 1;
let height = 0;
let angle = 0;
var param = 0.3;
var speed = 10;
function setup() {
   console.log('hej');
   createCanvas(400, 400);
   angleMode(DEGREES);
}

function draw() {

   background(0);
   translate(200, 200);
   //rotate(-90);
   rectMode(CENTER);
   let hr = hour();
   let mn = minute();
   //let sc = seconds();

   //strokeWeight(8);

   //stroke(150, 255, 100);
   //red = map(60, 0, 60, 0, 255/20);
   //arc(0, 0, 260, 260, 0, hourAngle);
   //stroke(150, 255, 100);
   //line(0, 0, 50, 0);
   angle += speed;
   for(let i = 0; i < 40; i++){
     let h = map(sin(angle + i*ofset), -1, 1, 0, 100);
     let c = map(sin(angle + i*ofset), -1, 1, 0, 100);
     if(c%10 < param * 10){
       fill(255, 255, 0);
     }else{
       fill(255, 0, 0);
     }   
     rect(-i*10 +200, 0, 10, h);
   }
}
