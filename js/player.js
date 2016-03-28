(function() {
  'use strict';

  /**
   * Player
   * Keeps track of player state like score.
   */

  function Player(name) {
    this.name = name;
    this.score = 0;
  }

  Player.prototype.addPoints = function(points) {
    this.score += points;
  };

  window.Player = Player;
})();
