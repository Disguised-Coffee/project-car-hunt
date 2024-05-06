import './style.css'

import { SCREENSIZES } from './constants'; // Pulling some data out of a constants folder 
import Phaser, { Game, Physics } from 'phaser'

class GameScene extends Phaser.Scene{
  constructor(){
    super("scene-game");
  }

  preload(){
    this.load.image("bg", "/public/bg.png");
  }

  create(){
    this.add.image(469,375,"bg");
  }

  update(){
    
  }
}

//we need at least a 5:4 ratio for the coord sys

const config ={
  type:Phaser.WEBGL,
  width:SCREENSIZES.img.width,
  height:SCREENSIZES.img.height,
  canvas:gameCanvas,
  scene:[GameScene]
}

var game = new Phaser.Game(config); 