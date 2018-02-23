
function getRandomSize() {
    let r = pow(random(0, 1), 3);
    return constrain(r * 32, 2, 32);
}

class Sun{

    constructor(sx, sy){
        let x = sx || random(width);
        let y = sy || random(-100, -10);
    }
}