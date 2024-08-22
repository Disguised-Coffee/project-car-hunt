import { constants as CN } from "./utils/constants";

import { moveMeLater } from "./assets";

import Phaser from "phaser";
import initDocQueries from "./sheet";
import { ScoreBoard } from "./ScoreBoard";
import { Teleporters } from "./Teleporters";
// import js from 'easystarjs';

class GameScene extends Phaser.Scene {
  // teleporterTimer;
  // time;
  constructor() {
    super("scene-game");

    this.player; //adds the variable player to the game obj
    this.scoreBoard = new ScoreBoard(this);
    this.teleporters = new Teleporters(this);
    this.playerSpeed = CN.playerSpeed;

    this.cursor; //obj for keydowns
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
      let number = Math.round(3 * Math.random()); //number between 0 and 3 (4 integers)
      switch (number) {
        case 0:
          this.player.setVelocityX(-this.playerSpeed);
          this.player.setRotation(-Math.PI / 2);
          this.player.setSize(61, 36);
          break;
        case 1:
          this.player.setVelocityX(this.playerSpeed);
          this.player.setRotation(Math.PI / 2);
          this.player.setSize(61, 36);
          break;
        case 2:
          this.player.setVelocityY(-this.playerSpeed);
          this.player.setRotation(0);
          this.player.setSize(36, 61);
          break;
        case 3:
          this.player.setVelocityY(this.playerSpeed);
          this.player.setRotation(Math.PI);
          this.player.setSize(36, 61);
          break;
        default:
          throw new Error();
      }
    };
  }

  // grab assests from web server (ie ur pictures)
  preload() {
    //grab the background image from server
    this.load.image("tiles", moveMeLater.map);
    this.load.tilemapTiledJSON("map", moveMeLater.tileData);

    this.load.image("player", moveMeLater.player);
  }

  // present assets on screen, load assets in client
  create() {
    if (CN.startAsPaused) {
      this.game.pause();
    }
    //funny finder lib c:
    // this.finder = js.js();

    this.map = this.make.tilemap({ key: "map" });

    const tileset = this.map.addTilesetImage("mapy", "tiles"); //add the titleset to the

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    this.layer = this.map.createLayer("floor", tileset, 0, 0);

    this.player = this.physics.add.sprite(100, 100, "player").setScale(0.75);
    this.player.setSize(36, 61);
    this.player.setOrigin(0.5, 0.5);

    this.player.setCollideWorldBounds(true);

    // this.leftRightTP = this.map.filterTiles((tile) => tile.index === 6);
    // this.upDownTP = this.map.filterTiles((tile) => tile.index === 5);

    this.map.setCollision([3, 8, 7, 11, 9]);

    this.centerSpawn = this.map.findObject("SpawnPoints", (obj) => obj.name === "SpawnPointCenter");

    this.leftTP = this.map.findObject("Teleporters", (obj) => obj.name === "TpLEFT");
    this.rightTP = this.map.findObject("Teleporters", (obj) => obj.name === "TpRIGHT");
    this.upTP = this.map.findObject("Teleporters", (obj) => obj.name === "TpUP");
    this.downTP = this.map.findObject("Teleporters", (obj) => obj.name === "TpDOWN");

    //tunnel timer
    // this.teleporterTimer = this.time.addEvent({ delay: 2000 });
    // this.time.addEvent(this.teleporterTimer);

    //obj to hold
    this.cursor = this.input.keyboard.createCursorKeys();

    //do once on play
    this.setRandomDir();
    this.setPlayerToNearestCord(true);
    this.setPlayerToNearestCord(false);

    this.scoreBoard.createSB(this.player);
    this.teleporters.createTP(this.map);
  }

  // update values
  update(time, delta) {
    this.teleporters.updateTP(this.player);
    this.physics.collide(this.player, this.layer);

    // console.log(this.map.worldToTileX(this.player.x));

    //

    // this.scene.
    // this.player.y.

    // for directions

    this.handleMovement();
    this.scoreBoard.updateSB(time, delta);
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
  setPlayerToNearestCord(setXorY) {
    //BREAKDOWN:
    // get player's coords, find the nearest tile with coords, and with
    // that info find the XY of that tile.

    // map.getTileAt --> get tile

    // tile.x --> get X coord.

    // console.log(this.player.x);
    // console.log(this.player.y);

    const coords = this.player.getCenter();

    const tile = this.map.getTileAtWorldXY(coords.x, coords.y); //this.player.x,this.player.y);

    // console.log(tile.getCenterX);
    // console.log(tile);
    try {
      if (setXorY) {
        this.player.setX(tile.getCenterX());
      } else {
        this.player.setY(tile.getCenterY());
      }
    } catch (TypeError) {
      //[] fix this to nearest spawn point
      //ie: car literally out of bounds
      this.player.setX(this.centerSpawn.x);
      this.player.setY(this.centerSpawn.y);
    }

    // this.player.setX(tile.getCenterX()).setY(tile.getCenterY());
  }

  handleMovement() {
    const { left, right, up, down } = this.cursor; // this is the arrow keys

    // AWSD
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
      this.setPlayerToNearestCord(false);
    } else if (right.isDown || this.keyD.isDown) {
      this.player.setVelocityX(this.playerSpeed);
      this.player.setVelocityY(0);
      this.player.setRotation(Math.PI / 2);
      this.player.setSize(61, 36);
      this.setPlayerToNearestCord(false);
    } else if (down.isDown || this.keyS.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(this.playerSpeed);
      this.player.setRotation(Math.PI);
      this.player.setSize(36, 61);
      this.setPlayerToNearestCord(true);
    } else if (up.isDown || this.keyW.isDown) {
      this.player.setVelocityX(0);
      this.player.setVelocityY(-this.playerSpeed);
      this.player.setRotation(0);
      this.player.setSize(36, 61);
      this.setPlayerToNearestCord(true);
    }
  }
}

// Player.js
class Player {
  constructor(scene) {
    this.scene = scene;
    // Initialize player properties (e.g., position, animations)
  }

  create() {
    // Create player sprites, animations, and input handling
  }

  update() {
    // Update player logic (e.g., movement, collisions)
  }

  // Add any other player-specific methods here
}

//we need at least a 5:4 ratio for the coord sys

//settings
const config = {
  type: Phaser.WEBGL,
  width: CN.screenSize.width,
  height: CN.screenSize.height,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 } // GRAVITY.
    }
  },
  scene: [GameScene]
};

var game = new Phaser.Game(config);

initDocQueries(game);
