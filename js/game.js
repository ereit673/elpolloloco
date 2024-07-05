let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let timer;
let mute = false;
let fullscreenMode = false;
let btnMute = document.getElementById('btnMute');
let btnFullscreen = document.getElementById('btnFullscreen');
let wonGame_sound = new Audio('./audio/victory.mp3');

/**
* Initializes the game by setting up the canvas and creating a new World instance.
* Also binds button press events.
*/
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    bindBtsPressEvents();
}

/**
 * Starts the game by initializing the level, hiding start screens, displaying the game HUD,
 * showing the canvas, and starting the timer.
 */
function startGame() {
    initLevel();
    document.getElementById('wonGameScreen').classList.add('d-none');
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('startScreenContainer').classList.add('d-none');
    document.getElementById('hud').classList.remove('d-none');
    document.getElementById('canvas').style.display = "block";
    startTimer();
    init();
}

/**
 * Starts the timer.
 */
function startTimer() {
    timer = 30;
    setStoppableInterval(() => {
        timer--;
        if (timer == 0) {
            gameOver();
        }
    }, 1000);
}

/**
 * Mutes all sounds.
 */
function toggleMute() {
    if (mute == false) {
        mute = true;
        btnMute.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg>';
    } else {
        mute = false;
        btnMute.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>'
    }
    btnMute.blur();
}

/**
 * Toggles fullscreen.
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    if (!fullscreenMode) {
        enterFullscreen(fullscreen);
    } else {
        exitFullscreen();
    }
}

/**
 * Enters fullscreen mode.
 * @param {HTMLElement} element - The element to enter fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }

    fullscreenMode = true;
    document.getElementById('canvas').classList.toggle('canvasFullscreen');
    document.getElementById('gameOverScreen').classList.toggle('gameOverScreenFullscreen');
    document.getElementById('wonGameScreen').classList.toggle('youWonScreenFullscreen');
    btnFullscreen.blur();
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {        // for IE11 (remove June 15, 2022)
            document.msExitFullscreen();
        } else if (document.webkitExitFullscreen) {    // iOS Safari
            document.webkitExitFullscreen();
        }
    }

    fullscreenMode = false;
    document.getElementById('canvas').classList.toggle('canvasFullscreen');
    document.getElementById('gameOverScreen').classList.toggle('gameOverScreenFullscreen');
    document.getElementById('wonGameScreen').classList.toggle('youWonScreenFullscreen');
    btnFullscreen.blur();
}

/**
 * Displays a message based on the orientation of the screen.
 */
window.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("turnPhoneMessage");
    const displayOrientation = () => {
        const screenOrientation = screen.orientation.type;
        output.innerHTML = `The orientation of the screen is: ${screenOrientation}`;
        if (screenOrientation === "landscape-primary") {
            document.getElementById('turnPhoneMessage').style.display = 'none';
        } else if (screenOrientation === "landscape-secondary") {
            document.getElementById('turnPhoneMessage').style.display = 'flex';
            output.innerHTML = "Mmmh... the screen is upside down!";
        } else if (screenOrientation === "portrait-secondary" || screenOrientation === "portrait-primary") {
            document.getElementById('turnPhoneMessage').style.display = 'flex';
            output.innerHTML = "Rotate your device to play!";
        } else if (screenOrientation === undefined) {
            document.getElementById('turnPhoneMessage').style.display = 'flex';
            console.log("The orientation API isn't supported in this browser :(");
        }
    };

    if (screen && screen.orientation !== null) {
        try {
            window.screen.orientation.onchange = displayOrientation;
            displayOrientation();
        }
        catch (e) { output.innerHTML = e.message; }
    }
});

/**
 * Displays the game over screen and stops the game. Plays the character's death sound if sound is enabled.
 */
function gameOver() {
    document.getElementById('gameOverScreen').classList.remove('d-none');
    timer = 0;
    if (mute == false) {
        world.character.dead_sound.play();
    }
    clearIntervals();
}

/**
 * Displays the "You won" screen and stops the game. Plays the "You won" sound if sound is enabled.
 */
function wonGame() {
    clearIntervals();
    if (mute == false) {
        wonGame_sound.play();
    }
    setTimeout(() => {
        document.getElementById('wonGameScreen').classList.remove('d-none');
    }, 1500);
}

/**
 * Clears all intervals stored in the intervalIds array.
 */
function clearIntervals() {
    intervalIds.forEach(clearInterval);
}

/**
 * Sets a stoppable interval that calls the provided function repeatedly with a specified time interval.
 * @param {Function} fn - The function to call.
 * @param {number} time - The time interval in ms.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Event listener for handling keydown events.
 * @param {KeyboardEvent} e - The keyboard event object.
 */
document.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 88) {
        keyboard.X = true;
    }
    if (e.keyCode == 27) {
        if (fullscreenMode) {
            exitFullscreen();
        }
    }
});

/**
 * Event listener for handling keyup events.
 * @param {KeyboardEvent} e - The keyboard event object.
 */
document.addEventListener('keyup', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 88) {
        keyboard.X = false;
    }
    if (e.keyCode == 27) {
        if (fullscreenMode) {
            exitFullscreen();
        }
    }
});

/**
 * Binds touch events to the corresponding buttons for controlling the game.
 */
function bindBtsPressEvents() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.X = true;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.X = false;
    });
};