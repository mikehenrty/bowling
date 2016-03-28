/**
 * Globals
 */
const MAX_FRAMES = 10;

(function() {
  'use strict';

  /**
   * main.js
   * Responsible for starting and resetting game.
   */

  function startAttract() {
    var startButton = document.createElement('button');
    startButton.textContent = 'Start Game!';
    startButton.onclick = function() {
      startButton.remove();
      startGame();
    };
    document.body.appendChild(startButton);
  }

  function startGame() {
    var game = new GameEngine();
    game.start();

    // When game is reset, start attract mode.
    game.onreset = function() {
      document.body.innerHTML = '';
      startAttract();
    };
  }

  document.addEventListener('DOMContentLoaded', startAttract);
})();
