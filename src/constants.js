export const constants = {
  img: {
    car: 0.5
  },
  playerSpeed: 230, //320, 400, 600
  startAsPaused: true,
  fileStart: "src/assets",
  screenSize: {
    width: 1024, //32px * 32 tiles
    height: 832 // 32px * 26 tiles
  },

  /**
   * Player directions, based on Radians
   */
  playerDir: {
    UP: 0,
    DOWN: -Math.PI,
    LEFT: -Math.PI / 2,
    RIGHT: Math.PI / 2
  }
};
