
var actions = { preload: preload, create: create, update: update };
var game = new Phaser.Game(790, 400, Phaser.AUTO, "game", actions);
var score = 0;

var labelScore;
var player;
var pipes = [];
var pipeInterval = 2;
var gapSize = 100;
var blockHeight = 50;
var gapMargin = 50;
var height = 400;
var width = 790;
var pipeGap = 100;
var gameSpeed = 250;
var ghost;
var ghosts = [];
var shots = [];
var lasers = [];
var backgroundImages;
var currBack = 0;
var background;
var backgroundObjs = [];

function preload() {
game.load.image("playerImg","../assets/flappy-cropped.png");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipe","../assets/pipe.jpg");
game.load.image("background","../assets/background.jpg");
game.load.image("pipeBottom","../assets/firebottom.png");
game.load.image("pipeTop","../assets/firetop.png");
game.load.image("laser","../assets/laser.png");
game.load.image("ghost","../assets/ghost.png");
game.load.image("bg2","../assets/zelda.png");


}

function create() {
    backgroundImages = [];
    backgroundImages.push("bg2");
    game.stage.setBackgroundColor("#808080");
    background = game.add.image(0, 0, "background");
    background.width = 790;
    background.height = 500;



    //bg2.width = 790;
    //bg2.height = 500;
    game.add.text(20, 20, "Welcome to my game",
    {font: "30px Arial", fill: "#808080"});
    labelScore = game.add.text(20, 60, "0",
    {font: "30px Arial", fill: "#FFFFFF"});
    player = game.add.sprite(80, 200, "playerImg");
    player.anchor.setTo(0.5, 0.5);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 440;
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
    game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(laserFunc);



    game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);
    game.time.events.loop(6* Phaser.Timer.SECOND, addGhost);

    game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(pauseGame);

    game.time.events.loop(2*Phaser.Timer.SECOND, sceneChange);

}

function update() {





    game.physics.arcade.overlap(player, pipes, gameOver);

    if(player.body.y < 0) {
      gameOver();
    }
    if(player.body.y > 400){
      gameOver();
    } //

    player.rotation = Math.atan(player.body.velocity.y / 200);
    game.physics.arcade.overlap(player, ghosts, gameOver);
    game.physics.arcade.overlap(lasers, ghosts, ghostOver);
}

function addPipeBlock(x, y) {
var block = game.add.sprite(x,y,"pipe");
pipes.push(block);
game.physics.arcade.enable(block);
block.body.velocity.x = -250;
}
function generatePipe() {
 var gapStart = game.rnd.integerInRange(50, height - 50 - pipeGap);
 addpipeTop(width-5,gapStart - 25);
 for(y=gapStart - 75; y>-50; y -= 50){
 addPipeBlock(width,y);
 }
 addpipeBottom(width-5,gapStart+pipeGap);
 for(var y=gapStart + pipeGap + 25; y<height; y += 50){
 addPipeBlock(width,y);
 }
 changeScore();
}

function addGhost() {
ghost = game.add.sprite(790, getRandomArbitrary(50,350), "ghost");
game.physics.arcade.enable(ghost);
ghost.body.velocity.x = -100;
ghosts.push(ghost);


}





function addpipeTop(x, y) {
 var block = game.add.sprite(x + 5, y, "pipeTop");
 pipes.push(block);
 game.physics.arcade.enable(block);
 block.body.velocity.x = -gameSpeed;
}

function addpipeBottom(x, y) {
 var block = game.add.sprite(x + 5, y, "pipeBottom");
 pipes.push(block);
 game.physics.arcade.enable(block);
 block.body.velocity.x = -gameSpeed;
}


function playerJump() {
player.body.velocity.y = -230;

}
function changeScore() {
score++;
labelScore.setText(score.toString());
}
function gameOver() {
location.reload();}

function pauseGame() {
this.game.paused = true;

game.input.keyboard
          .addKey(Phaser.Keyboard.R)
          .onDown
          .add(startGame);
        }

    function laserFunc() {

    //  console.log("in laser func");
      var laser = game.add.sprite(player.x, player.y,"laser");
      game.physics.arcade.enable(laser);
      laser.body.velocity.x = 800;
      lasers.push(laser);
      //console.log(lasers);
 }

function ghostOver() {
  //alert("YOU HIT ME!");
  ghost.destroy();


 changeScore();

}



function startGame() {
this.game.paused = false;

game.input.keyboard
          .addKey(Phaser.Keyboard.ESC)
          .onDown
          .add(pauseGame);
        }



function getRandomArbitrary(min, max) {
          return Math.random() * (max - min) + min;
        }

function sceneChange(){
  //if (currBack == 1) {
    back = game.add.sprite(1500, 0, backgroundImages[currBack]);
    back.scale.setTo(0.5, 0.5);
    game.physics.arcade.enable(back);
    back.body.velocity.x = -200;
    game.world.sendToBack(back);
    game.world.sendToBack(background);
    backgroundObjs.push(back);
    console.log(backgroundObjs);
//  }
  currBack++;
}
