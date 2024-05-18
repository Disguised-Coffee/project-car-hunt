// "bable"

import './style.css'

import { SCREENSIZES } from './constants'; // Pulling some data out of a constants folder 
import Phaser, { Core } from 'phaser';
import js from 'easystarjs'

let input = document.querySelector("input");


// move this to constants
let playerSpeed = 230;

class GameScene extends Phaser.Scene {

  teleporterTimer;
  constructor() {
    super("scene-game");
    this.player; //adds the variable player to the game obj
    this.playerSpeed = playerSpeed;

    // this.cursor; //obj for keydowns
    this.dir = 0;

    this.isPaused = false;

    this.playerCanTeleport = false;
    

    // this.finder = new js();

    this.keyA;
    this.keyW;
    this.keyS;
    this.keyD;


    /**
     * if the player 
     */
    this.setRandomDir = () => {
      let number = Math.round(3 * Math.random());  //number between 0 and 3 (4 integers)
      switch (number) {
        case 0:
          this.player.setVelocityX(-this.playerSpeed);
          this.player.setRotation(-Math.PI / 2);
          this.player.setSize(61, 36)
          break;
        case 1:
          this.player.setVelocityX(this.playerSpeed);
          this.player.setRotation(Math.PI / 2);
          this.player.setSize(61, 36)
          break;
        case 2:
          this.player.setVelocityY(-this.playerSpeed);
          this.player.setRotation(0);
          this.player.setSize(36, 61);
          break;
        case 3:
          this.player.setVelocityY(this.playerSpeed);
          this.player.setRotation(Math.PI);
          this.player.setSize(36, 61)
          break;
        default:
          console.log("BRUH? HOW????")
          break;
      }


    }

  }


  // grab assests from web server (ie ur pictures)
  preload() {
    //grab the background image from server
    this.load.image("tiles", "../assets/terrain.png");
    this.load.tilemapTiledJSON("map", "../tiledAssets/mapTest3/map.json");

    this.load.multiatlas('player', '../assets/atlas/blah.json', '../assets/atlas');
  }

  // present assets on screen, load assets in client
  create() {

    //funny finder lib c:
    this.finder = js.js();
    
    this.map = this.make.tilemap({ key: "map" });

    const tileset = this.map.addTilesetImage("mapy", "tiles"); //add the titleset to the 

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    this.layer = this.map.createLayer("floor", tileset, 0, 0);

    this.player = this.physics.add.sprite(100, 100, 'player', 'blah.png');

    this.player.setScale(0.75);

    this.player.setCollideWorldBounds(true);


    this.leftRightTP = this.map.filterTiles(tile => tile.index === 6);
    this.upDownTP = this.map.filterTiles(tile => tile.index === 5);

    this.map.setCollision([3,8,7,11,9]);


    //tunnels
    this.leftSpawn = this.map.findObject("Objects", obj => obj.name === "SpawnPointRight");
    this.rightSpawn = this.map.findObject("Objects", obj => obj.name === "SpawnPointLeft");
    this.upSpawn = this.map.findObject("Objects", obj => obj.name === "SpawnPointUp");
    this.bottomSpawn = this.map.findObject("Objects", obj => obj.name === "SpawnPointBottom");

    //tunnel timer
    this.teleporterTimer = this.time.addEvent({delay: 2000});
    this.time.addEvent(this.teleporterTimer);

    //obj to hold 
    this.cursor = this.input.keyboard.createCursorKeys();

    //do once on play
    this.setRandomDir();
  }



  checkForTeleportX(player, tile){
    //if the player has teelported already, don't let them tp again until they're fully off
    console.log(this.teleporterTimer.getProgress());
    if(this.teleporterTimer.getProgress() == 1){
      this.time.addEvent(this.teleporterTimer);
      if(player.x < 200){
        player.setX(this.leftSpawn.x);
      }
      else if(player.x > 200){
        player.setX(this.rightSpawn.x)
      }

    }
    
  }

  checkForTeleportY(player, tile){
    //if the player has teelported already, don't let them tp again until they're fully off
    console.log(this.teleporterTimer.getProgress());
    if(this.teleporterTimer.getProgress() == 1){
      this.time.addEvent(this.teleporterTimer);
      if(player.y > 200){
        player.setY(this.upSpawn.y);
      }
      else if(player.y < 200){
        player.setY(this.bottomSpawn.y);
      }

    }
    
  }

  // update values
  update() {

    // check for teleport
    this.physics.world.overlapTiles(this.player,this.leftRightTP,this.checkForTeleportX,null,this);
    this.physics.world.overlapTiles(this.player,this.upDownTP,this.checkForTeleportY,null,this);


    this.physics.collide(this.player, this.layer)
    //PAUSING... CUT BY MVP
    // if(catchPause == true) this.isPaused = !this.isPaused;

    // if(this.isPaused){
    //   this.scene.pause();
    //   return;
    // }

    // console.log(this.map.worldToTileX(this.player.x));

    // 

    // this.scene.
    // this.player.y.

    // for directions
    

    this.handleMovement();
  }
  
  teleportPlayer(){
    console.log("SUCCESS!");
  }
  
  /**
   * 
   * @param {boolean} setXorY - true --> X | false --> Y
   * 
   * X is for when you go L or R from straight
   * Y is for when you go up from L or R
   * 
   * meant to fix bug with staying at a single position for too long.
   */
  setPlayerToNearestCord(setXorY){
    //BREAKDOWN:
    // get player's coords, find the nearest tile with coords, and with 
    // that info find the XY of that tile.

    // map.getTileAt --> get tile

    // tile.x --> get X coord.
    
    // console.log(this.player.x);
    // console.log(this.player.y);

    const coords = this.player.getCenter()

    const tile = this.map.getTileAtWorldXY(coords.x,coords.y);//this.player.x,this.player.y);


    // console.log(tile.getCenterX);
    // console.log(tile);
    if(setXorY){
      this.player.setX(tile.getCenterX());
    }
    else{
      this.player.setY(tile.getCenterY())
    }
    // this.player.setX(tile.getCenterX()).setY(tile.getCenterY());
  }

  handleMovement(){
    const { left, right, up, down } = this.cursor;

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    
    if (left.isDown || this.keyA.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
      this.player.setVelocityY(0);
      this.player.setRotation(-Math.PI / 2);
      this.player.setSize(61, 36);
      //make sure to adjust the size of the thing!
      this.setPlayerToNearestCord(false );
    }
    else if (right.isDown || this.keyD.isDown) {
      this.player.setVelocityX(this.playerSpeed);
      this.player.setVelocityY(0);
      this.player.setRotation(Math.PI / 2);
      this.player.setSize(61, 36);
      this.setPlayerToNearestCord(false);
    }
    else if (down.isDown || this.keyS.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(this.playerSpeed);
      this.player.setRotation(Math.PI);
      this.player.setSize(36, 61)
      this.setPlayerToNearestCord(true);
    }
    else if (up.isDown || this.keyW.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(-this.playerSpeed);
      this.player.setRotation(0);
      this.player.setSize(36, 61);
      this.setPlayerToNearestCord(true);
    }
  }
}

let isPaused = false;

//FEATURE
document.querySelector("button").addEventListener("click",(e)=>{
  console.log("hi");
  if(isPaused) game.resume();
  else game.pause();

  isPaused = !isPaused;
});

//we need at least a 5:4 ratio for the coord sys

//settings
const config = {
  type: Phaser.WEBGL,
  width: SCREENSIZES.img.width,
  height: SCREENSIZES.img.height,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 } // GRAVITY.
    }
  },
  scene: [GameScene],
}


var game = new Phaser.Game(config); 



