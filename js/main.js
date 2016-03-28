/**
 * Globals
 */
const MAX_PLAYERS = 4;
const MAX_FRAMES = 10;
const MAX_PINS = 10;

(function() {
  'use strict';

  /**
   * main.js
   * Responsible for starting and resetting game.
   */

  function startAttract() {
    document.body.innerHTML = '';
    var choosePlayersText = document.createElement('p');
    choosePlayersText.textContent = 'How many players?';
    document.body.appendChild(choosePlayersText);

    for (var i = 1; i <= MAX_PLAYERS; i++) {
      var b = document.createElement('button');
      b.textContent = i;
      document.body.appendChild(b);
      b.onclick = function(evt) {
        startGame(parseInt(evt.target.textContent, 10));
      };
    }
  }

  function startGame(playerCount) {
    var game = new GameEngine(playerCount);
    game.start();

    // When game is reset, start attract mode.
    game.onreset = function() {
      startAttract();
    };
  }

  document.addEventListener('DOMContentLoaded', startAttract);
})();
