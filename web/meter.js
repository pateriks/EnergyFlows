let full = 255;

let red = 255;
let green = 255;
let blue = 255;
let sec = 0;
let cirkus = 0;
let gp = 0; //counting variable
let flip = 0;
let numLeds = 25;
let inc = 1;

let set = 0;

var glows = [];
var greens = [];
var reds = [];

var redy;

var puls = 0;
var color = 0;
var param = 0.5;
var param2 = 0.5;
var speed = 0.5;
var charging = 0; //av eller på
var batteri = 0; //av eller på
var speed2 = 0;
var offset = 0;
var size = 0;
var bg;


function preload() {

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
            if(redy.red == bg) {
                redy.set(full, bg, bg);
            }
        }else if(a1 && !batteri){
            Fblack(pulseActive);
            if(redy.red != bg) {
                redy.set(bg, bg, bg);
            }
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
            if(redy.red != bg) {
                redy.set(full, bg, bg);
            }
        }else if(a1 && !batteri){
            Fblack(pulseActive);
            if(redy.red != bg) {
                redy.set(bg, bg, bg);
            }
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
        if (i > ((numLeds*(param2)))) {
            Fgreen();
            green = map(sin(abs(i + ((gp%(numLeds*(1-param2)))))*(360/(numLeds*(1-param2)))), -1, 1, 0 , 255);

        } else {
            Fwhite();
        }
    }

}

function setup() {
    bg = map(hour(), 0, 24, 100, 0);

    for(let i = 0; i < 100; i++){
        greens.push(new Sun(347, 230, bg, bg, bg, random(12)));
        reds.push(new Sun(347, 525, bg, bg, bg, random(12)));
    }

    redy = new Sun(200, 200, 0, 0, 0, 40, reds);
   
    for(let i = 0; i < numLeds; i++){
        glows.push(new Sun(400, 400, 255, 255, 255, 5));
    }
    
    puls = 1;
    speed = 10;
    speed2 = 10;

    color = 0;
    param = 0.5;
    param2 = 0.1;
    offset = -80;
    var cnv = createCanvas(600, 600);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);

    size = 30;
    console.log('Welcome Canvas: ' + height + ' ' +  width + ' Hour: ' + hour());
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
    sec = second();

    if(charging) {
        cirkus += speed;
        param2 = map(minute()%20, 0, 20, 0, 1);
    }else{
        param2 = map(minute()%20, 0, 20, 0, 1);
        cirkus -= speed;
    }

    if(batteri && !set){
        redy.set(bg, bg, bg);
        set = 1;
    }else if(!batteri && set){
        set = 0;
        redy.set(full, bg, bg);
    }

    if(numLeds > (height/16)){
        numLeds = (height/16)
    }

    offset = (map(numLeds, 0, (height/16), 0, width/2));

    strokeWeight(width/size);

    noFill();

    flip += 1;
    inc = 1;
    if ((flip%speed2) == 1) {
        if(gp > 100000 || gp < -100000){
            gp = 0;
        }
        gp = gp + inc;
    }
    
    //redy.drawAll();
    

    push();

    translate(width/2, height/2)
    for (let w = 0; w < width; w+= width/8) {

        for (let i = 0; i < numLeds; i++) {

            red = map(sin(cirkus + i * (360 / numLeds)), -1, 1, 0, 255);
            green = map(sin(cirkus + i * (360 / numLeds)), -1, 1, 0, 255);
            blue = map(sin(cirkus + i * (360 / numLeds)), -1, 1, 0, 255);

            if(w < 1) {
                redgreen(i, null, true);
                stroke(red, green, blue);
                rect(-275, i * width/size - offset, 30, width/size);
            }

            if(w == width/8) {
                //Sets colors
                battery(i)

                stroke(red, green, blue);
                /*
                if(glows[i].parts.length<numLeds) {
                    glows[i].add(new Sun(-(w - offset) + 90, i * width/size - offset, red, green, blue, 3));
                }else{
                    glows[i].set(red, green, blue);
                    glows[i].drawAll();
                }
                */
                point(-(w - offset)+width/4, i * width/size - offset);
            }

            if(w == width/4) {
                redgreen(i, true);
                //stroke(red, green, blue);

                //point(-(w - offset ) + 5, i * width/size - offset);
                if(i==0){
                    //rect(-108, -offset + 70, 4* width/size, 4*width/size);
                }
                if(i==numLeds-1){
                    //rect(-108, i * width/size - offset - 250, 4* width/size, 4*width/size);
                }
            }
        }
    }
    pop();

}
