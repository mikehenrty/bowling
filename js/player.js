(function() {
  'use strict';

  function Player(name) {
    this.name = name;
    this.score = 0;
  }

  Player.prototype.addPoints = function(points) {
    this.score += points;
  };

  window.Player = Player;
})();
