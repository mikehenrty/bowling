(function() {
  'use strict';

  /**
   * Game Engine
   * Orchestrates input, scoring and game display.
   */

  function GameEngine() {
    this.players = [
      new Player('Player 1')
    ];

    this.container = document.body;
  }

  GameEngine.prototype.start = function() {
    this.render();
  };

  GameEngine.prototype.onreset = function(cb) {
    this.resetCb = cb;
  };

  GameEngine.prototype.render = function() {
    this.container.innerHTML = '';
    this.players.forEach(function(player) {
      var el = document.createElement('p');
      el.textContent = player.name + ':: ' + player.score;
      this.container.appendChild(el);
    }.bind(this));

    // Allow the game to be reset at any time.
    var resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.onclick = function() {
      this.resetCb && this.resetCb();
    }.bind(this);
    this.container.appendChild(resetButton);
  };

  window.GameEngine = GameEngine;
})();
