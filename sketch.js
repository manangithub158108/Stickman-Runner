// creating the variables
var stickman;

// loading the images
function preload(){
  stickmanRunning = loadAnimation("Images/Running1.png", "Images/Running2.png", "Images/Running3.png", 
  "Images/Running4.png", "Images/Running5.png", "Images/Running6.png", "Images/Running7.png", 
  "Images/Running8.png");
  bigStoneImg = loadImage("Images/bigStone.png");
  smallStoneImg = loadImage("Images/smallStone.png");
  coinImg = loadImage("Images/coin.png");
}

function setup() {

  // creating the canvas
  createCanvas(1200,500);

  // creating the elements of the game
  stickman = createSprite(100, 200, 50, 50);
  stickman.addAnimation("Animation", stickmanRunning);
  stickman.velocityY = 15;
  stickman.setCollider("rectangle", 0, 0, 100, 160);

  ground = createSprite(width/2, 475, width, 20);

  // making the gameStates
  gameState = 0;

  // defining the score system
  score = 0;

  // making the groups
  bigStoneGroup = new Group();
  smallStoneGroup = new Group();
  coinGroup = new Group();
}

function draw() {

  // making the sky
  background("lightBlue");  

  // making the stickman to stay on the ground itself
  stickman.collide(ground);

  // making the stickman to jump
  if(keyDown("space")){
    stickman.velocityY = -15;
  }
  stickman.velocityY = stickman.velocityY + 0.8;

   // defining the gameState 0
   if(gameState === 0){

    // writing the important text
    textFont("Georgia");
    textSize(30);
    fill("black");
    text("Welcome to the Stickman Runner Game", 400, 100);

    textFont("Georgia");
    textSize(30);
    fill("black");
    text("Collect as many coins as possible to win the game", 400, 200);

    textFont("Georgia");
    textSize(30);
    fill("black");
    text("Press space so as to make the stickman to jump", 400, 300);

    textFont("Georgia");
    textSize(30);
    fill("black"); 
    text("Press r to start the game", 400, 400);

    // gameState conversion
    if(keyDown("r")){
      gameState = 1;
    }
   }

  // defining the gameState 1
  if(gameState === 1){

    // making the bigstone to appear randomly
    if(frameCount % 100 === 0){
      var bigStone = createSprite(1220, ground.y - 30, 10, 10);
      bigStone.addImage(bigStoneImg);
      bigStone.velocityX = -20;
      bigStone.lifetime = 200;
      bigStone.setCollider("circle", 0, 0, 30);
      bigStoneGroup.add(bigStone);
    }

    // making the smallstone to appear randomly
    if(frameCount % 150 === 0){
      var smallStone = createSprite(1220, random(50, ground.y - 50), 10, 10);
      smallStone.addImage(smallStoneImg);
      smallStone.velocityX = -10;
      smallStone.setCollider("circle", 0, 0, 20);
      smallStone.lifetime = 200;
      smallStoneGroup.add(smallStone);
    }

    // making the coins
    if(frameCount % 100 === 0){
      var coin = createSprite(1220, 120, 10, 10);
      coin.addImage(coinImg);
      coin.scale = 0.7
      coin.velocityX = -25;
      coin.setCollider("circle", 0, 0, 20);
      coin.lifetime = 200;
      coinGroup.add(coin);
    }

    if(stickman.isTouching(smallStoneGroup)){
      stickman.destroy();
      smallStoneGroup.destroyEach();
      gameState = 2;
    }

    if(stickman.isTouching(coinGroup)){
      coinGroup.destroyEach();
      score = score + 1;
    }

    textFont("Ayuthaya");
    textSize(30);
    fill("black"); 
    text("Player Score = " + score, 800, 50);

    if(stickman.isTouching(bigStoneGroup)){
      stickman.destroy();
      bigStoneGroup.destroyEach();
      gameState = 2;
    }

  }
  
  // defining the gameState 2
  if(gameState === 2){

    textFont("Georgia");
    textSize(50);
    fill("black");
    text("! Congratulations !", 400, 100);

    textFont("Georgia");
    textSize(50);
    fill("black");
    text("Your Score = " + score, 440, 200);
  }

  // drawing the sprites
  drawSprites();


 
}