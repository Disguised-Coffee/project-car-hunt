import './style.css'

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
const SCREENSIZES = {
  "BnL":{
    width:900,
    height:720,
  },
  "smol":{
    width:800,
    height:640,
  },
  "smoler":{
    width:700,
    height:560,
  },
  "img":{
    width:938,
    height:750,
  },
  
}

const config ={
  type:Phaser.WEBGL,
  width:SCREENSIZES.img.width,
  height:SCREENSIZES.img.height,
  canvas:gameCanvas,
  scene:[GameScene]
}

var game = new Phaser.Game(config); 