let angle = 0;
let w = 24;
let ma;
let maxD;
var speed = 0.01;
var param = 0.1;



function setup() {
    createCanvas(400, 400, WEBGL);//, WEBGL);
    ma = atan(cos(QUARTER_PI));
    maxD = 200;
}

function draw() {

    background(100);
    ortho(-400, 400, 400, -400, 0, 1000);
    rotateX(-ma);
    ma -= speed;
    //rotateY(-PI/4);﻿

  for (let z = 0; z < height; z += w) {
      //for (let x = 0; x < width; x += w) {
          push();
          let d = abs(z - (height / 2));
          let offset = map(d, maxD, height, -PI, PI);
          let a = angle + offset;
          let h = floor(map(sin(a), -1, 1, 100, 300));
          translate(z - width / 2, 0, z - height / 2); //x                                                                                                                                                                                    
          //normalMaterial();
          if(angle%1 == 0) {
              if ((h - 100) % 10 < param * 10) {
                  fill(255, 255, 0);
              } else {
                  fill(255, 0, 0);
              }
          }
          box(w, h, w);
      //fill(255, 255, 255);
          //rect(z - width / 2 + w / 2, 0, w - 2, a);
          pop();
     // }
  }
  angle += 0.1;
}
