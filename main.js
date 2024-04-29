import './style.css'

import Phaser from 'phaser'



const config ={
  type:Phaser.WEBGL,
  width:1000,
  height:600,
  canvas:gameCanvas
}

var game = new Phaser.Game(config); 