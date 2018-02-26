let full = 255;

let red = 255;
let green = 255;
let blue = 255;
let sec = 0;
let cirkus = 0;
let gp = 0;
let flip = 0;

var puls = 0;
var color = 0;
var param = 0.5;
var param2 = 0.5;
var speed = 0.1;
var charging = 0;
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

function Fwhite(){
    if(!puls) {
        red = full;
        green = full;
        blue = full;
    }

}

function Fblack(){
    if(!puls) {
        red = 0;
        green = 0;
        blue = 0;
    }

}

function redgreen(i, a1){
    if (i < param * 40) {
        if(blink() && !batteri) {
            Fred();
        }else if(a1 && !batteri){
            Fblack();
        }else{
            Fred();
        }
    } else {
        if(blink() && batteri) {
            Fgreen();
        }else if(a1 && batteri){
            Fblack();
        }else{
            Fgreen();
        }
    }
}

function redyellow(i, a2){
    if (i < param * 40) {
        Fred();
    } else {
        Fyellow();
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

    if(i > param2*40){
        Fwhite();
    }else{
        if(!charging) {
            //if(i == param2*40 - 1) {
            if (blink()) {
                Fgreen();
            } else {
                Fwhite();
            }
            //}else{
            //  Fgreen();
            //}
        }else{
            if(i < gp%(param2*40)) {
                Fgreen();
            }else{
                Fwhite();
            }
        }
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
    sec = second();
    if (blink()) {
        if(flip < 1) {
            flip++;
            gp = gp + 1;
        }
    }else{
        flip = 0;
    }
   background(0);
   translate(800, 800);
   rotate(200);

   //imageMode(CENTER);
   //image(this.img, 0, 0, this.r, this.r);

 //  let hr = hour();
 //  let mn = minute();
 //  let ms = seconds();
   strokeWeight(16);
   noFill();
   cirkus += speed;

   //arc(0, 0, 260, 260, 0, hourAngle);
    for (let w = 0; w < 1000; w+= 250) {
        if (color < 1) {
            for (let i = 0; i < 40; i++) {
                red = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
                green = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
                blue = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);

                if(w < 1) {
                    redgreen(i);
                    stroke(red, green, blue);
                    point(w - 400, i * 15 - 400);
                }

                if(w == 250) {
                    battery(i)
                    stroke(red, green, blue);
                    point(w - 400, i * 15 - 400);
                }

                if(w == 500) {
                    redgreen(i, true);
                    stroke(red, green, blue);
                    point(w - 400, i * 15 - 400);
                }

            }
        } else {
            for (let i = 0; i < 40; i++) {
                red = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
                green = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);
                blue = map(sin(cirkus + i * (360 / 20)), -1, 1, 0, 255);

                if(w < 1) {
                    redyellow(i)
                    stroke(red, green, blue);
                    point(w - 400, i * 15 - 400);
                }

                if(w == 250) {
                    battery()
                    stroke(red, green, blue);
                    point(w - 400, i * 15 - 400);
                }

                if(w == 500) {
                    redyellow(i, true)
                    stroke(red, green, blue);
                    point(w - 400, i * 15 - 400);
                }

            }
        }
    }
}
