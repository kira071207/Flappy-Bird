let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

// dino variables

let dinoImg;
let dinoWidth = 68;
let dinoHeight = 74;
let dinoY = boardHeight - dinoHeight;
let dinoX = 50;

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}

//cactus
let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 98;

let cactusHeight = 70;

let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;


// physics
let birdVelocityX = -4;
let velocityX = -8;
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function (){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d")

    // filltyle

    //context.fillStyle = "green";
    //context.fillRect(dino.x, dino.y, dino.width, dino.height);

    dinoImg = new Image();
    dinoImg.src = "./Images/dino.png"
    dinoImg.onload = function(){
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)
    }

    cactus1Img = new Image();
    cactus1Img.src = "./Images/cactus1.png"

    cactus2Img = new Image();
    cactus2Img.src = "./Images/cactus2.png"

    cactus3Img = new Image();
    cactus3Img.src = "./Images/cactus3.png"

}

requestAnimationFrame(update);
setInterval(placeCactus, 1000);
setInterval(abird, 6000)
document.addEventListener("keydown", moveDino)

function update(){
requestAnimationFrame(update);
if(gameOver){
    return;
}


context.clearRect(0,0,board.width,board.height);

velocityY += gravity;
dino.y = Math.min(dino.y + velocityY, dinoY)
context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

//dino
context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height)
//cactus loop

for(let i = 0; i < cactusArray.length; i++){
    let cactus = cactusArray[i];
    cactus.x += velocityX

 context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height)


 for(let i = 0; i < birdArray.length; i++){
    let bird = birdArray[i]
    bird.x += birdVelocityX

let currentBirdImg = (birdFrameToggle === 0) ? bird1Img : bird2Img;
context.drawImage(currentBirdImg, bird.x, bird.y, bird.width, bird.height)
}

if (detectCollision(dino, cactus)){
    gameOver = true;

    dinoImg.src = "./Images/dino-dead.png"
    dinoImg.onload = function(){
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    }
}

}
context.fillStyle = "black"
context.font = "20px courier"
score++;
context.fillText(score, 5, 20);
}

function moveDino(e){
    if(gameOver){
        return;
    }

    if((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY){
        velocityY = -9;
    }
     }


function placeCactus (){
    if (gameOver){
        return;
     }

  let cactus = {
    img : null,
    x : cactusX,
    y : cactusY,
    width : null,
    height : cactusHeight
  }

 let PlaceCactusChance = Math.random();

 if(PlaceCactusChance > .90){

    cactus.img = cactus1Img;
    cactus.width = cactus1Width;
    cactusArray.push(cactus)
 }
 else if(PlaceCactusChance > .70){
    cactus.img = cactus2Img;
    cactus.width = cactus2Width;
    cactusArray.push(cactus)
 }
 else if(PlaceCactusChance > .50){
    cactus.img = cactus3Img;
    cactus.width = cactus3Width;
    cactusArray.push(cactus)
 }


 if (cactusArray.length > 5){
    cactusArray.shift()
 }

}


  // a top left corner doesnt reach bs top right corner
 // a top right corner doesnt pass bs top left corner // 
 // a top left corner doesnt reach bs bottom left corner   
 //  // a bottom left corner passes bs top left corner


function detectCollision(hitbox1, hitbox2) {
    return hitbox1.x < hitbox2.x + hitbox2.width &&
           hitbox1.x + hitbox1.width > hitbox2.x &&
           hitbox1.y < hitbox2.y + hitbox2.height &&
           hitbox1.y + hitbox1.height > hitbox2.y;
}

let birdArray = [];
let birdFrameToggle = 0;
setInterval(() => {
  birdFrameToggle = birdFrameToggle  === 0 ? 1 : 0;
}, 200);
bird1Img = new Image();
bird1Img.src = "./Images/bird1.png"

bird2Img = new Image();
bird2Img.src = "./Images/bird2.png"


let birdWidth1 = 67;
let birdHeight1 = 48;
let birdX = 700;



function abird(){
if (gameOver){
    return;
}

let bird = {
    img : bird1Img,
    x : birdX,
    y : Math.random() * (boardHeight - 150) + 25,
    width : birdWidth1,
    height : birdHeight1
}
birdArray.push(bird);

if(birdArray.length > 1){
    birdArray.shift()
}



}













