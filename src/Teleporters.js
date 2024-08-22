// import { updateScores } from "./sheet";
import { constants as CN } from "./utils/constants";

// Player.js
export class Teleporters {
  timedEvent;
  teleportRecInInterval;
  constructor(scene) {
    this.scene = scene;
    this.leftTP;
    this.rightTP;
    this.upTP;
    this.downTP;
    this.time;

    this.teleportRecInInterval = 1;
    // Initialize player properties (e.g., position, animations)
  }

  createTP(map) {
    this.leftRightTP = this.scene.map.filterTiles((tile) => tile.index === 6);
    this.upDownTP = this.scene.map.filterTiles((tile) => tile.index === 5);

    //tunnels
    this.leftTP = map.findObject("Teleporters", (obj) => obj.name === "TpLEFT");
    this.rightTP = map.findObject("Teleporters", (obj) => obj.name === "TpRIGHT");
    this.upTP = map.findObject("Teleporters", (obj) => obj.name === "TpUP");
    this.downTP = map.findObject("Teleporters", (obj) => obj.name === "TpDOWN");

    this.timedEvent = new Phaser.Time.TimerEvent({
      delay: CN.recMilliTPInterval,
      startAt: CN.recMilliTPInterval
    });

    this.time = this.scene.time;

    this.time.addEvent(this.timedEvent);
  }

  updateTP(player) {
    this.scene.physics.world.overlapTiles(
      player,
      this.leftRightTP,
      this.checkForTeleportX,
      null,
      this.scene
    );
    this.scene.physics.world.overlapTiles(
      player,
      this.upDownTP,
      this.checkForTeleportY,
      null,
      this.scene
    );

    if (this.timedEvent.getProgress() == 1) {
      this.teleportRecInInterval = 1;
    }
  }

  checkForTeleportX(player, tile) {
    if (player.rotation == CN.playerDir.LEFT && player.x < 200) {
      player.setX(this.rightTP.x);
    } else if (player.rotation == CN.playerDir.RIGHT && player.x > 200) {
      player.setX(this.leftTP.x);
    }
    this.teleporters.setTPTimes();
  }

  checkForTeleportY(player, tile) {
    if (player.rotation == CN.playerDir.UP && player.y < 200) {
      player.setY(this.downTP.y);
    } else if (player.rotation == CN.playerDir.DOWN && player.y > 200) {
      player.setY(this.upTP.y);
    }

    // because the code is being ran as if it were in GameScene,
    // we have to call as if we were in GameScene
    this.teleporters.setTPTimes();
  }

  setTPTimes() {
    // "activates" the timer
    this.timedEvent.startAt = 0;

    // resets timer if it is full.
    this.time.addEvent(this.timedEvent);
    ++this.teleportRecInInterval;
  }

  getTimeSinceLastTeleport() {
    return this.timedEvent.getProgress() * CN.recMilliTPInterval;
  }

  getNumberOfTPInInterval() {
    return this.teleportRecInInterval;
  }
}
