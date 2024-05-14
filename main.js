// "bable"

import './style.css'

import { SCREENSIZES } from './constants'; // Pulling some data out of a constants folder 
import Phaser from 'phaser';
import js from 'easystarjs'

let input = document.querySelector("input");


// move this to constants
let playerSpeed = 230;

class GameScene extends Phaser.Scene {

  constructor() {
    super("scene-game");
    this.player; //adds the variable player to the game obj
    this.playerSpeed = playerSpeed;

    // this.cursor; //obj for keydowns
    this.dir = 0;

    this.isPaused = false;

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
    this.load.tilemapTiledJSON("map", "../assets/map2.json");

    this.load.multiatlas('player', '../assets/atlas/blah.json', '../assets/atlas');
  }

  // present assets on screen, load assets in client
  create() {
    this.finder = js.js();
    
    this.map = this.make.tilemap({ key: "map" });

    const tileset = this.map.addTilesetImage("mapy", "tiles"); //add the titleset to the 

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = this.map.createLayer("floor", tileset, 0, 0);
    const tunnels = this.map.createLayer("tunnels", tileset, 0, 0);
    const worldLayer = this.map.createLayer("structures", tileset, 0, 0);
    const islandLayer = this.map.createLayer("islands", tileset, 0, 0);

    this.player = this.physics.add.sprite(100, 100, 'player', 'blah.png');

    this.player.setScale(0.75);

    worldLayer.setCollisionByProperty({ collides: true });
    islandLayer.setCollisionByProperty({ collides: true });

    this.player.setCollideWorldBounds(true);

    this.map.filterTiles(tiles => console.log(tiles))

    this.physics.add.collider(this.player, worldLayer);

    this.physics.add.collider(this.player, islandLayer);


    //tunnels


    //obj to hold 
    this.cursor = this.input.keyboard.createCursorKeys();

    //do once on play
    this.setRandomDir();
  }

  // update values
  update() {

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
    const { left, right, up, down } = this.cursor;

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  
    if (left.isDown || this.keyA.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
      this.player.setVelocityY(0);
      this.player.setRotation(-Math.PI / 2);
      this.player.setSize(61, 36)
      //make sure to adjust the size of the thing!
    }
    else if (right.isDown || this.keyD.isDown) {
      this.player.setVelocityX(this.playerSpeed);
      this.player.setVelocityY(0);
      this.player.setRotation(Math.PI / 2);
      this.player.setSize(61, 36)
    }
    else if (down.isDown || this.keyS.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(this.playerSpeed);
      this.player.setRotation(Math.PI);
      this.player.setSize(36, 61)
    }
    else if (up.isDown || this.keyW.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(-this.playerSpeed);
      this.player.setRotation(0);
      this.player.setSize(36, 61);
    }

  }

  teleportPlayer(){
    console.log("SUCCESS!");
  }
}

let catchPause = false;

//FEATURE
document.querySelector("button").addEventListener("click",(e)=>{
  catchPause = !catchPause;
  
  if(catchPause){
    game.pause();
  }
  else{
    game.resume();
  }
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



