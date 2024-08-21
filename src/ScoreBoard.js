import { updateScores } from "./sheet";
import { constants as CN } from "./constants";

// Player.js
export class ScoreBoard {
  constructor(scene, player) {
    this.scene = scene;
    // Initialize player properties (e.g., position, animations)
    this.lastCord;
    this.currSpeed;
    this.player = player;
    this.score;
    this.runStart;
  }

  create(player) {
    // Create player sprites, animations, and input handling
    this.player = player;
    this.lastCord = this.player.getCenter();
  }

  update(time, delta) {
    // Update player logic (e.g., movement, collisions)
    //get velocity
    this.currSpeed = this.getPlayerVelocity(delta);
    updateScores(this);

    // use time for time based score.
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
  resetScore() {
    this.score = 0;
  }
}
