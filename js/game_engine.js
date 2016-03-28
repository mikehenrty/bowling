(function() {
  'use strict';

  function GameEngine() {
    this.players = [
      new Player('Player 1')
    ];
  }

  GameEngine.prototype.start = function() {
    this.render();
  };

  GameEngine.prototype.render = function() {
    document.body.innerHTML = '';
    this.players.forEach(function(player) {
      var el = document.createElement('p');
      el.textContent = player.name;
      document.body.appendChild(el);
    });
  };

  window.GameEngine = GameEngine;
})();
