export const constants = {
  img: {
    car: 0.5
  },
  playerSpeed: 230,
  playerSpeedCaps: {
    normal: 230,
    fast: 320,
    faster: 400,
    muchFaster: 600,
    oneZeroZero: 760, //stuff begins to break here
    speedRacer: 840,
    max: 1024,
    twoFifty: 2000
  },
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
  },
  blocksToMiles: 1 / 2,
  bloatConversion: 2.5
};
