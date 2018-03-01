let full = 255;

let red = 255;
let green = 255;
let blue = 255;
let sec = 0;
let cirkus = 0;
let gp = 0;
let flip = 0;
let numLeds = 24;

var puls = 0;
var color = 0;
var param = 0.5;
var param2 = 0.5;
var speed = 0.1;
var charging = 0; //av eller på
var batteri = 0; //av eller på
var speed2 = 0;
var offset = 0;
var size = 0;
var img;
var bg;

function preload() {
    img = loadImage('Building.png');
    img2 = loadImage('EV2.png');
}

function Fgreen(pulsate){
    let pulsActive = pulsate || false;
    green = full;
    if(!puls || !pulsActive) {
        blue = 0;
        red = 0;
    }
}

function Fred(pulsate){
    let pulsActive = pulsate || false;
    red = full;
    if(!puls || !pulsActive) {
        green = 0;
        blue = 0;
    }
}

function Fyellow(pulsate){
    let pulsActive = pulsate || false;
    red = full;
    green = full;
    if(!puls || !pulsActive) {
        blue = 0;
    }
}

function Fwhite(pulsate){
    let pulsActive = pulsate || false;
    if(!puls || !pulsActive) {
        red = full;
        green = full;
        blue = full;
    }

}

function Fblack(pulsate){
    let pulsActive = pulsate || false;
    if(!puls || !pulsActive) {
        red = bg;
        green = bg;
        blue = bg;
    }
}

function redgreen(i, a1, pulseActive){
    if (i > param * numLeds) {
        if(blink() && !batteri) {
            Fred(pulseActive);
        }else if(a1 && !batteri){
            Fblack(pulseActive);
        }else{
            Fred(pulseActive);
        }
    } else {
        if(blink() && batteri) {
            Fgreen(pulseActive);
        }else if(a1 && batteri){
            Fblack(pulseActive);
        }else{
            Fgreen(pulseActive);
        }
    }
}

function redyellow(i, a1, pulseActive){
    if (i > param * numLeds) {
        if(blink() && !batteri) {
            Fred(pulseActive);
        }else if(a1 && !batteri){
            Fblack(pulseActive);
        }else{
            Fred(pulseActive);
        }
    } else {
        if(blink() && batteri) {
            Fyellow(pulseActive);
        }else if(a1 && batteri){
            Fblack(pulseActive);
        }else{
            Fyellow(pulseActive);
        }
    }
}

function blink() {
    if (sec % 2 == 0) {
        return true;
    }else{
        return false;
    }
}

function battery(i) {

    if(i < param2*numLeds){
        Fwhite();
    }else{
        if(!charging) {
            if (blink()) {
                Fgreen();
            } else {
                Fwhite();
            }
        }else{
            if(i > (gp%(param2*numLeds))) {
                Fgreen();
                green = map(sin(abs(i - ((gp%(param2*numLeds))/2))*100), -1, 1, 0 , 255);
            }else{
                Fwhite();
            }
        }
    }

}

function setup() {
    bg = 200;
   color = 0;
   param = 0.5;
   param2 = 0.6;
   offset = -100;
   createCanvas(800, 800);
   size = 30;
   console.log('Welcome' + height + width);
   angleMode(DEGREES);

}

function pulsate(i) {
    red = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
    green = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
    blue = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
}

function draw() {
    rotate(0);

    background(bg);
    //image(img, 0, 0);
    //image (img, 0, 0, 200, 800, 50, 0, 300, 800);
    sec = second();
    bg = map(hour(), 0, 24, 0, 255);

   if(numLeds > (height/16)){
       numLeds = (height/16)
   }

   offset = (map(numLeds, 0, (height/16), 0, width/2) + 100);


   strokeWeight(width/size);
   noFill();
   cirkus += speed;
   flip += 1;
    if ((flip%speed2) == 1) {
        console.log(width);
        gp = gp + 1;
    }
     translate(0,0)
        image (img2, 210, 0, 320, 800, 70, 0, 400, 800);
    push();
    translate(width/2, height/2);
    for (let w = 0; w < width; w+= width/8) {
        if (color < 1) {

            for (let i = 0; i < numLeds; i++) {

                red = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
                green = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
                blue = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);

                if(w < 1) {
                    redgreen(i, null, true);
                    stroke(red, green, blue);
                    point(-275, i * width/size - offset);
                }

                if(w == width/8) {
                    battery(i)
                    stroke(red, green, blue);
                    point(-(w - offset), i * width/size - offset);
                }

                if(w == width/4) {
                    redgreen(i, true);
                    stroke(red, green, blue);
                    point(-(w - offset), i * width/size - offset);
                }

            }
        } else {

            for (let i = 0; i < numLeds; i++) {

                red = map(sin(cirkus + i * (360 / numLeds)), -1, 1, 0, 255);
                green = map(sin(cirkus + i * (360 / numLeds)), -1, 1, 0, 255);
                blue = map(sin(cirkus + i * (360 / numLeds)), -1, 1, 0, 255);

                if(w < 1) {
                    redyellow(i, null, true)
                    stroke(red, green, blue);
                    point(-275, i * width/size - offset);
                }

                if(w == width/8) {
                    battery()
                    stroke(red, green, blue);
                    point(-(w - offset), i * width/size - offset);
                }

                if(w == width/4) {
                    redyellow(i, true)
                    stroke(red, green, blue);
                    point(-(w - offset), i * width/size - offset);
                }

            }
        }

    }
    pop();
    image (img, 0, 0, 200, 800, 49, 0, 300, 800);


}
