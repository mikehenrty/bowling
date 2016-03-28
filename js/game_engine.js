(function() {
  'use strict';

  /**
   * Game Engine
   * Orchestrates input, scoring and game display.
   */

  function GameEngine() {
    this.players = [
      new Player('Player 1'),
      new Player('Player 2')
    ];

    this.frame = 0;
    this.lane = new Lane();
    this.lane.onroll = this.roll.bind(this);

    this.container = document.body;
  }

  GameEngine.prototype.start = function() {
    this.frame = 1;
    this.currentPlayer = 0;
    this.render();
  };

  GameEngine.prototype.roll = function(pins) {
    this.players[this.currentPlayer].addPoints(pins);
    this.currentPlayer++;
    if (this.currentPlayer >= this.players.length) {
      this.currentPlayer = 0;
      this.frame++;
    }
    this.render();
  };

  GameEngine.prototype.render = function() {
    this.container.innerHTML = '';

    var frameDisplay = document.createElement('p');
    frameDisplay.textContent = 'Frame ' + this.frame;
    this.container.appendChild(frameDisplay);

    this.players.forEach(function(player) {
      var el = document.createElement('p');
      el.textContent = player.name + ':: ' + player.score;
      this.container.appendChild(el);
    }.bind(this));

    this.lane.render();
    this.container.appendChild(this.lane.container);

    // Allow the game to be reset at any time.
    var resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.onclick = function() {
      this.onreset && this.onreset();
    }.bind(this);
    this.container.appendChild(resetButton);
  };

  window.GameEngine = GameEngine;
})();
