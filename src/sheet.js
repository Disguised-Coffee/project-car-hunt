/**
 * 
 */


export default function initDocQueries(gameScene) {
    document.getElementById("start").addEventListener("click", (e) => {
        var menu = document.querySelector(".menu");
        var main = document.querySelector("main");

        menu.style.display = "none";
        main.style.filter = "blur(0px)";
    })

    //FEATURE
    document.getElementById("start").addEventListener("click", (e) => {
        if (gameScene.isPaused) gameScene.resume();
        else gameScene.pause();

        isPaused = !isPaused;
    });
    document.getElementById("pause").addEventListener("click", (e) => {
        if (gameScene.isPaused) gameScene.resume();
        else gameScene.pause();

        isPaused = !isPaused;
    });
}
