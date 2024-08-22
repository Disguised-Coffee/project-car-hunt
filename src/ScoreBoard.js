import { updateScoreBoard } from "./sheet";
import { constants as CN } from "./utils/constants";

// Player.js
export class ScoreBoard {
  constructor(scene, player) {
    this.scene = scene;
    // Initialize player properties (e.g., position, animations)
    this.lastCord;
    this.currSpeed;
    this.player = player;

    this.runStart;
  }

  createSB(player) {
    // Create player sprites, animations, and input handling
    this.player = player;
    this.lastCord = this.player.getCenter();
    this.score = 0;
  }

  updateSB(time, delta) {
    //get velocity
    this.currSpeed = this.getPlayerVelocity(delta);
    updateScoreBoard(this.getFancySpeed(), this.getScore());

    // use time for time based score.
    this.updateScore(time);
  }

  // Add any other player-specific methods here
  /**
   * Velocity of the player,
   *
   *
   * @returns
   */
  getPlayerVelocity(delta) {
    //D / delta
    const coords = this.player.getCenter();

    // console.log(coords.x);
    const toR =
      this.player.rotation == CN.playerDir.LEFT || this.player.rotation == CN.playerDir.RIGHT
        ? Math.abs(this.lastCord.x - coords.x) / delta
        : Math.abs(this.lastCord.y - coords.y) / delta;
    this.lastCord = this.player.getCenter();
    return toR;
  }

  getFancySpeed() {
    return Math.floor(this.currSpeed * 100 * CN.blocksToMiles * CN.bloatConversion);

    // * (1 / this.scene.teleporters.getNumberOfTPInInterval())
  }

  updateScore(time) {
    // console.log("invervals: ", this.scene.teleporters.getNumberOfTPInInterval());
    // console.log("inverse: ", 1 / this.scene.teleporters.getNumberOfTPInInterval());
    console.log("New speed score", this.getFancySpeed() * 0.09);
    console.log("speed score", this.getFancySpeed() * 0.25);
    // console.log(this.scene.teleporters.getTimeSinceLastTeleport());
    this.score +=
      this.scene.teleporters.getTimeSinceLastTeleport() == CN.recMilliTPInterval
        ? Math.floor(this.getFancySpeed() * 0.049)
        : Math.floor(1 / this.scene.teleporters.getNumberOfTPInInterval());
  }

  getScore() {
    // console.log(this.score);
    return this.score;
  }

  resetScore() {
    this.score = 0;
  }
}
