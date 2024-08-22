/**
 * ///////////
 * Sheet.js ~ where most DOM related work happens
 * ///////////
 * hi
 */

import { constants } from "./utils/constants";

/**
 *
 * @param {*} gameScene valid game scene
 *
 * Inits DOM related event listeners
 *
 */
export default function initDocQueries(gameScene) {
  document.getElementById("start").addEventListener("click", (e) => {
    document.querySelector(".menu").style.display = "none";
    document.querySelector(".gameSpace").style.filter = "blur(0px)";
  });

  //FEATURE
  document.getElementById("start").addEventListener("click", (e) => {
    gameScene.resume();
  });
  document.getElementById("pause").addEventListener("click", (e) => {
    if (gameScene.isPaused) {
      gameScene.resume();
      changeTitle("");
    } else {
      gameScene.pause();
      changeTitle("Paused ⏸ ~ ");
    }
  });

  function changeTitle(title) {
    document.title = title + "OPPA STOPPA";
  }

  document.addEventListener("keydown", (e) => {
    // console.log(e.key);
    if (e.key == " ") {
      if (gameScene.isPaused) {
        gameScene.resume();
        changeTitle("");
      } else {
        gameScene.pause();
        changeTitle("Paused ⏸ ~ ");
      }
    }
  });
}

export function updateScoreBoard(speed, score) {
  // definitely goinmg to have to do optimizations here
  document.getElementById("speed").innerHTML = speed;
  document.getElementById("score").innerHTML = score;
}
