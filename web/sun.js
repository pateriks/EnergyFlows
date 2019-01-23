function Sun(xs, ys, r, g, b, speed, def) {
    this.x = xs || random(800);
    this.y = ys || random(800);
    this.red = r || random(255);
    this.green = g || random(255);
    this.blue = b || random(255);
    this.speed = speed || random(10);
    this.dirX = random(-1, 1);
    this.dirY = random(-0.25, 0.25);
    this.dir = createVector(this.dirX, this.dirY);
    this.weight = 1;
    this.hue = 255;
    this.parms = createVector(this.weight, this.hue);
    this.pos = createVector(this.x, this.y);
    this.parts = def || [];
    this.live = 1000;

    this.drawAll = function(){
        for(var i = 0; i < this.parts.length; i++){
            if(!this.parts[i].done()) {
                this.parts[i].draw();
            }
        }
    };

    this.draw = function(){
        push();
        this.pos.add(this.dir.x*this.speed, this.dir.y*this.speed);
        this.parms.x += 0.5;
        this.parms.y -= 10;
        strokeWeight(this.parms.x);
        stroke(this.red, this.green, this.blue, this.parms.y);
        point(this.pos.x, this.pos.y);
        pop();
    };

    this.done = function(){
        if(this.live < 0){
            this.reset();
            return true;
        }else{
            this.live -= 200;
            return false;
        }
    };

    this.add = function(planet) {
        if(this.parts.length < 100) {
            this.parts.push(planet);
        }else{

        }
    };

    this.reset = function () {
        this.pos.x = this.x;
        this.pos.y = this.y;
        this.parms.x = this.weight;
        this.parms.y = this.hue;
        this.dir.x = random(-1, 1);
        this.dir.y = random(-0.5, 0.5);
        this.live = 1000;
    };

    this.set = function (r, g, b){
        for(let i = 0; i < this.parts.length; i++) {
            this.red = r;
            this.green = g;
            this.blue = b;
            this.parts[i].red = r;
            this.parts[i].green = g;
            this.parts[i].blue = b;
        }
    };
}