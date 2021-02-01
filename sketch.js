var balloon, balloonAnimation;
var bg, bgImg ;
var database,position;


function preload() {

balloonAnimation = loadAnimation("ball1.png", "ball2.png", "ball3.png");
bgImg=loadImage("back.png");
}

function setup() {
  createCanvas(1200,600);
  database=firebase.database();
  balloon = createSprite(250, 650, 50, 50);
  balloon.addAnimation("balloon",balloonAnimation )
  balloon.scale=0.5;

  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readPosition);

}

function draw(){

  background(bgImg);
  textSize(20);
  stroke("red");
  fill("green");
  text("Use arrow keys to move the balloon",100,50);

  if(keyDown(LEFT_ARROW)){
  //balloon.x=balloon.x-8;
  updatePosition(-10,0);
  }
else if(keyDown(RIGHT_ARROW)){
  //balloon.x=balloon.x+8;
  updatePosition(10,0)

}
else if(keyDown(UP_ARROW)){
  //balloon.y=balloon.y-8;
  balloon.scale=balloon.scale-0.01;
  updatePosition(0,-10);

}
else if(keyDown(DOWN_ARROW)){
  //balloon.y=balloon.y+8;
  balloon.scale=balloon.scale+0.01;
  updatePosition(0,10);

}


  drawSprites();
}
function readPosition(data){
  position=data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function updatePosition(x,y){
  database.ref('balloon/position').set({
    'x':position.x+x,
    'y':position.y+y
  })
}



