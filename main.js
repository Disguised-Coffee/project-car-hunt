// "bable"

import './style.css'

import { SCREENSIZES } from './constants'; // Pulling some data out of a constants folder 
import Phaser from 'phaser'

let input = document.querySelector("input");


// move this to constants
let playerSpeed = 100;

class GameScene extends Phaser.Scene {

  constructor() {
    super("scene-game");
    this.player; //adds the variable player to the game obj
    this.playerSpeed = playerSpeed;

    // this.cursor; //obj for keydowns
    this.dir = 0;
  }


  // grab assests from web server (ie ur pictures)
  preload() {
    //grab the background image from server
    this.load.image("tiles", "../assets/terrain.png");
    this.load.tilemapTiledJSON("map", "../assets/map.json");

    this.load.image("player", "/public/you.png");



  }

  // present assets on screen, load assets in client
  create() {
    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("mapy", "tiles"); //add the titleset to the 

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createLayer("floor", tileset, 0, 0);
    const worldLayer = map.createLayer("structures", tileset, 0, 0);
    const islandLayer = map.createLayer("islands", tileset, 0, 0);
    const tunnels = map.createLayer("tunnels", tileset, 0, 0); // redo this layer b/c structure on wrong layer

    
    worldLayer.setCollisionBetween(2, 10);

    worldLayer.setCollisionByProperty({ collides: true });

    // //load that image.
    this.add.image(0, 0, "bg").setOrigin(0, 0); //load sprite 'bg' at set it to max window sizes with origin of 0,0.
    this.player = this.physics.add.image(0, SCREENSIZES.img.height - 400, "player").setOrigin(0, 0).setScale(0.1);
    // this.player.setImmovable(true);

    this.cursor = this.input.keyboard.createCursorKeys();

    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, worldLayer);
  }

  // update values
  update() {
    const { left, right, up, down } = this.cursor;



    if (left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
      this.player.setVelocityY(0);
      console.log(input.value);
    }
    else if (right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
      this.player.setVelocityY(0);
    }
    else if (down.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(this.playerSpeed);
    }
    else if (up.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(-this.playerSpeed);
    }

  }
}


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